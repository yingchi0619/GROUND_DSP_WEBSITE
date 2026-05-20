from http import cookies
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import hashlib
import hmac
import json
import os
import secrets
import sqlite3
import time
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parent
DB_PATH = Path(os.environ.get("DB_PATH", ROOT / "data" / "dsp_applications.db"))
SESSION_COOKIE = "dsp_admin_session"
SESSION_TTL_SECONDS = 60 * 60 * 12
PBKDF2_ROUNDS = 260_000
RESEND_API_URL = "https://api.resend.com/emails"


def send_application_notification(application):
    api_key = os.environ.get("RESEND_API_KEY", "").strip()
    notify_email = os.environ.get("NOTIFY_EMAIL", "").strip()
    from_email = os.environ.get("FROM_EMAIL", "onboarding@resend.dev").strip()

    if not api_key or not notify_email:
        print("Email notifications disabled: missing RESEND_API_KEY or NOTIFY_EMAIL")
        return

    text_body = "\n".join(
        [
            "New DSP application received.",
            "",
            f"Company: {application['company']}",
            f"Contact: {application['contact']}",
            f"Phone: {application['phone']}",
            f"Email: {application['email']}",
            f"Region: {application['region']}",
            f"Language: {application['language']}",
            f"Notes: {application['notes'] or '-'}",
            f"Submitted: {application['created_at']}",
        ]
    )
    payload = {
        "from": from_email,
        "to": [notify_email],
        "subject": f"New DSP application: {application['company']}",
        "text": text_body,
    }
    request = Request(
        RESEND_API_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urlopen(request, timeout=8) as response:
            response.read()
        print(f"Email notification sent for application {application['id']}")
    except Exception as error:
        print(f"Notification email failed: {error}")


def hash_password(password, salt=None):
    password_salt = salt or secrets.token_hex(16)
    password_hash = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        password_salt.encode("utf-8"),
        PBKDF2_ROUNDS,
    ).hex()
    return password_salt, password_hash


def verify_password(password, salt, expected_hash):
    _, password_hash = hash_password(password, salt)
    return hmac.compare_digest(password_hash, expected_hash)


def get_connection():
    DB_PATH.parent.mkdir(exist_ok=True)
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company TEXT NOT NULL,
            contact TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT NOT NULL,
            region TEXT NOT NULL,
            notes TEXT DEFAULT '',
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    application_columns = {
        row["name"]
        for row in connection.execute("PRAGMA table_info(applications)").fetchall()
    }
    if "language" not in application_columns:
        connection.execute("ALTER TABLE applications ADD COLUMN language TEXT NOT NULL DEFAULT 'en'")

    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS admin_users (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            username TEXT NOT NULL UNIQUE,
            password_salt TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS admin_sessions (
            token TEXT PRIMARY KEY,
            admin_id INTEGER NOT NULL,
            expires_at INTEGER NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE CASCADE
        )
        """
    )
    return connection


def configure_admin_account():
    username = os.environ.get("ADMIN_USERNAME", "admin").strip()
    password = os.environ.get("ADMIN_PASSWORD", "").strip()

    if not password:
        return

    salt, password_hash = hash_password(password)
    with get_connection() as connection:
        connection.execute("DELETE FROM admin_sessions")
        connection.execute("DELETE FROM admin_users")
        connection.execute(
            """
            INSERT INTO admin_users (id, username, password_salt, password_hash)
            VALUES (1, ?, ?, ?)
            """,
            (username, salt, password_hash),
        )


class DSPHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_json(self, status, payload, extra_headers=None):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        for name, value in (extra_headers or {}).items():
            self.send_header(name, value)
        self.end_headers()
        self.wfile.write(body)

    def redirect(self, location):
        self.send_response(302)
        self.send_header("Location", location)
        self.end_headers()

    def read_json_body(self):
        length = int(self.headers.get("Content-Length", "0"))
        return json.loads(self.rfile.read(length) or b"{}")

    def cookie_value(self, name):
        header = self.headers.get("Cookie", "")
        jar = cookies.SimpleCookie()
        jar.load(header)
        if name not in jar:
            return ""
        return jar[name].value

    def session_cookie_header(self, token):
        morsel = cookies.SimpleCookie()
        morsel[SESSION_COOKIE] = token
        morsel[SESSION_COOKIE]["path"] = "/"
        morsel[SESSION_COOKIE]["httponly"] = True
        morsel[SESSION_COOKIE]["samesite"] = "Lax"
        morsel[SESSION_COOKIE]["max-age"] = str(SESSION_TTL_SECONDS)
        if self.headers.get("X-Forwarded-Proto") == "https":
            morsel[SESSION_COOKIE]["secure"] = True
        return morsel.output(header="").strip()

    def clear_session_cookie_header(self):
        morsel = cookies.SimpleCookie()
        morsel[SESSION_COOKIE] = ""
        morsel[SESSION_COOKIE]["path"] = "/"
        morsel[SESSION_COOKIE]["httponly"] = True
        morsel[SESSION_COOKIE]["samesite"] = "Lax"
        morsel[SESSION_COOKIE]["max-age"] = "0"
        return morsel.output(header="").strip()

    def current_admin(self):
        token = self.cookie_value(SESSION_COOKIE)
        if not token:
            return None

        now = int(time.time())
        with get_connection() as connection:
            connection.execute("DELETE FROM admin_sessions WHERE expires_at <= ?", (now,))
            row = connection.execute(
                """
                SELECT admin_users.id, admin_users.username
                FROM admin_sessions
                JOIN admin_users ON admin_users.id = admin_sessions.admin_id
                WHERE admin_sessions.token = ? AND admin_sessions.expires_at > ?
                """,
                (token, now),
            ).fetchone()

        return dict(row) if row else None

    def require_admin_json(self):
        admin = self.current_admin()
        if admin:
            return admin
        self.send_json(401, {"error": "Authentication required"})
        return None

    def do_GET(self):
        path = urlparse(self.path).path

        if path == "/crm.html" and not self.current_admin():
            self.redirect("/login.html")
            return

        if path == "/api/session":
            admin = self.current_admin()
            self.send_json(200, {"authenticated": bool(admin), "username": admin["username"] if admin else ""})
            return

        if path == "/api/applications":
            if not self.require_admin_json():
                return
            with get_connection() as connection:
                rows = connection.execute(
                    """
                    SELECT id, company, contact, phone, email, region, language, notes, created_at
                    FROM applications
                    ORDER BY datetime(created_at) DESC, id DESC
                    """
                ).fetchall()
            self.send_json(200, [dict(row) for row in rows])
            return

        super().do_GET()

    def do_POST(self):
        path = urlparse(self.path).path

        if path == "/api/login":
            self.handle_login()
            return

        if path == "/api/logout":
            self.handle_logout()
            return

        if path == "/api/applications":
            self.handle_application_submit()
            return

        self.send_error(404)

    def handle_login(self):
        try:
            data = self.read_json_body()
        except json.JSONDecodeError:
            self.send_json(400, {"error": "Invalid JSON"})
            return

        username = str(data.get("username", "")).strip()
        password = str(data.get("password", ""))

        with get_connection() as connection:
            admin_count = connection.execute("SELECT COUNT(*) FROM admin_users").fetchone()[0]
            row = connection.execute(
                """
                SELECT id, username, password_salt, password_hash
                FROM admin_users
                WHERE username = ?
                """,
                (username,),
            ).fetchone()

            if admin_count == 0:
                self.send_json(503, {"error": "Admin account is not configured"})
                return

            if not row or not verify_password(password, row["password_salt"], row["password_hash"]):
                self.send_json(401, {"error": "Invalid username or password"})
                return

            token = secrets.token_urlsafe(32)
            connection.execute(
                """
                INSERT INTO admin_sessions (token, admin_id, expires_at)
                VALUES (?, ?, ?)
                """,
                (token, row["id"], int(time.time()) + SESSION_TTL_SECONDS),
            )

        self.send_json(
            200,
            {"ok": True, "username": row["username"]},
            {"Set-Cookie": self.session_cookie_header(token)},
        )

    def handle_logout(self):
        token = self.cookie_value(SESSION_COOKIE)
        if token:
            with get_connection() as connection:
                connection.execute("DELETE FROM admin_sessions WHERE token = ?", (token,))

        self.send_json(200, {"ok": True}, {"Set-Cookie": self.clear_session_cookie_header()})

    def handle_application_submit(self):
        try:
            data = self.read_json_body()
        except json.JSONDecodeError:
            self.send_json(400, {"error": "Invalid JSON"})
            return

        required = ["company", "contact", "phone", "email", "region"]
        missing = [field for field in required if not str(data.get(field, "")).strip()]
        if missing:
            self.send_json(400, {"error": "Missing required fields", "fields": missing})
            return

        values = {
            "company": data["company"].strip(),
            "contact": data["contact"].strip(),
            "phone": data["phone"].strip(),
            "email": data["email"].strip(),
            "region": data["region"].strip(),
            "language": str(data.get("language", "en")).strip() or "en",
            "notes": str(data.get("notes", "")).strip(),
        }

        with get_connection() as connection:
            cursor = connection.execute(
                """
                INSERT INTO applications (company, contact, phone, email, region, language, notes)
                VALUES (:company, :contact, :phone, :email, :region, :language, :notes)
                """,
                values,
            )
            row = connection.execute(
                """
                SELECT id, company, contact, phone, email, region, language, notes, created_at
                FROM applications
                WHERE id = ?
                """,
                (cursor.lastrowid,),
            ).fetchone()

        application = dict(row)
        send_application_notification(application)
        self.send_json(201, application)


if __name__ == "__main__":
    configure_admin_account()
    get_connection().close()
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", "4173"))
    server = ThreadingHTTPServer((host, port), DSPHandler)
    print(f"Serving DSP app with SQLite database at http://{host}:{port}/")
    print(f"Database: {DB_PATH}")
    server.serve_forever()
