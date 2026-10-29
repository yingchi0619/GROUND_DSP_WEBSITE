import { validateApplication, fromLegacyApplication } from "./application-fields.js";
import { saveApplication, notifyApplication, listApplications } from "./storage.js";
const STATIC_ORIGIN = "https://yingchi0619.github.io/GROUND_DSP_WEBSITE";
const API_ORIGIN = "https://ground-dsp-website.onrender.com";
const PUBLIC_FILES = new Set(["/", "/index.html", "/styles.css", "/script.js", "/us-map.svg", "/us-map-data.js", "/logo.svg", "/login.html", "/login.js", "/crm.html", "/crm.js"]);
const json = (body, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
async function isAdmin(request) {
  const response = await fetch(new Request(API_ORIGIN + "/api/session", { headers: { Cookie: request.headers.get("Cookie") || "" } }));
  return response.ok && (await response.json()).authenticated === true;
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/applications" && request.method === "POST") {
      let application;
      try { application = validateApplication(await request.json()); }
      catch (error) { return json({ error: error.message }, 400); }
      if (!env.DB || !env.APPLICATION_BACKUPS) return json({ error: "Application storage is unavailable" }, 503);
      try {
        const saved = await saveApplication(application, env);
        try { await notifyApplication(saved, env); } catch { /* Saved applications remain successful if notification fails. */ }
        return json({ ok: true, id: saved.id }, 201);
      } catch { return json({ error: "Unable to save your application. Please try again." }, 503); }
    }
    if (url.pathname === "/api/applications" && request.method === "GET") {
      if (!await isAdmin(request)) return json({ error: "Authentication required" }, 401);
      const current = await listApplications(env);
      // Preserve visibility of applications saved before the Cloudflare migration.
      const legacyResponse = await fetch(new Request(API_ORIGIN + "/api/applications", { headers: { Cookie: request.headers.get("Cookie") || "" } }));
      if (!legacyResponse.ok) return json({ error: "Unable to load historical applications" }, 502);
      const legacy = (await legacyResponse.json()).map(fromLegacyApplication);
      return json([...current, ...legacy].sort((a,b) => new Date(b.created_at) - new Date(a.created_at)));
    }
    if (url.pathname === "/api/notifications/retry" && request.method === "POST") {
      if (!await isAdmin(request)) return json({ error: "Authentication required" }, 401);
      const pending = (await listApplications(env)).filter(a => a.email_status !== "sent");
      const statuses = [];
      for (const application of pending.slice(0, 20)) statuses.push(await notifyApplication(application, env));
      return json({ attempted: statuses.length, sent: statuses.filter(s => s === "sent").length });
    }
    if (url.pathname.startsWith("/api/")) {
      const response = await fetch(new Request(new URL(url.pathname + url.search, API_ORIGIN), request), { redirect: "manual" });
      const headers = new Headers(response.headers); headers.set("Cache-Control", "no-store");
      return new Response(response.body, { status: response.status, headers });
    }
    if (!PUBLIC_FILES.has(url.pathname)) return new Response("Not found", { status: 404 });
    if (!["GET", "HEAD"].includes(request.method)) return new Response("Method not allowed", { status: 405 });
    const path = url.pathname === "/" ? "/index.html" : url.pathname;
    const response = await fetch(STATIC_ORIGIN + path + url.search);
    const headers = new Headers(response.headers); headers.set("Cache-Control", "public, max-age=60");
    return new Response(request.method === "HEAD" ? null : response.body, { status: response.status, headers });
  }
};
