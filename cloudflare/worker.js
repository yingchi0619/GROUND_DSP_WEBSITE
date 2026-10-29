// Serve the published GitHub frontend while preserving the existing Render API.
const STATIC_ORIGIN = "https://yingchi0619.github.io/GROUND_DSP_WEBSITE";
const API_ORIGIN = "https://ground-dsp-website.onrender.com";
const PUBLIC_FILES = new Set(["/", "/index.html", "/styles.css", "/script.js", "/us-map.svg", "/us-map-data.js", "/logo.svg", "/login.html", "/login.js", "/crm.html", "/crm.js"]);
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      const target = new URL(url.pathname + url.search, API_ORIGIN);
      const response = await fetch(new Request(target, request), { redirect: "manual" });
      const headers = new Headers(response.headers);
      headers.set("Cache-Control", "no-store");
      return new Response(response.body, { status: response.status, headers });
    }
    if (!PUBLIC_FILES.has(url.pathname)) return new Response("Not found", { status: 404 });
    if (!["GET", "HEAD"].includes(request.method)) return new Response("Method not allowed", { status: 405 });
    const path = url.pathname === "/" ? "/index.html" : url.pathname;
    const response = await fetch(STATIC_ORIGIN + path + url.search);
    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "public, max-age=60");
    return new Response(request.method === "HEAD" ? null : response.body, { status: response.status, headers });
  }
};
