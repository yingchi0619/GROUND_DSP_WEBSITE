from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import sqlite3
from pathlib import Path


ROOT = Path(__file__).resolve().parent
DB_PATH = ROOT / "data" / "dsp_applications.db"


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
    return connection


class DSPHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/api/applications":
            with get_connection() as connection:
                rows = connection.execute(
                    """
                    SELECT id, company, contact, phone, email, region, notes, created_at
                    FROM applications
                    ORDER BY datetime(created_at) DESC, id DESC
                    """
                ).fetchall()
            self.send_json(200, [dict(row) for row in rows])
            return

        super().do_GET()

    def do_POST(self):
        if self.path != "/api/applications":
            self.send_error(404)
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            data = json.loads(self.rfile.read(length) or b"{}")
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
            "notes": str(data.get("notes", "")).strip(),
        }

        with get_connection() as connection:
            cursor = connection.execute(
                """
                INSERT INTO applications (company, contact, phone, email, region, notes)
                VALUES (:company, :contact, :phone, :email, :region, :notes)
                """,
                values,
            )
            row = connection.execute(
                """
                SELECT id, company, contact, phone, email, region, notes, created_at
                FROM applications
                WHERE id = ?
                """,
                (cursor.lastrowid,),
            ).fetchone()

        self.send_json(201, dict(row))


if __name__ == "__main__":
    get_connection().close()
    server = ThreadingHTTPServer(("127.0.0.1", 4173), DSPHandler)
    print(f"Serving DSP app with SQLite database at http://127.0.0.1:4173/")
    print(f"Database: {DB_PATH}")
    server.serve_forever()
