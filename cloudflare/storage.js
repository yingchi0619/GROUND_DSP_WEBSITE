export const SCHEMA = `CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY, company TEXT NOT NULL, contact TEXT NOT NULL,
  phone TEXT NOT NULL, email TEXT NOT NULL, region TEXT NOT NULL,
  language TEXT NOT NULL, notes TEXT NOT NULL, earliestStartDate TEXT NOT NULL,
  hasCargoVan TEXT NOT NULL, cargoVanCount INTEGER NOT NULL,
  created_at TEXT NOT NULL, backup_key TEXT NOT NULL,
  email_status TEXT NOT NULL DEFAULT 'pending', sms_status TEXT NOT NULL DEFAULT 'not_configured'
)`;

export async function saveApplication(data, env) {
  await env.DB.prepare(SCHEMA).run();
  const application = { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString() };
  const key = `applications/${application.created_at.slice(0, 10)}/${application.id}.json`;
  await env.APPLICATION_BACKUPS.put(key, JSON.stringify(application), { httpMetadata: { contentType: "application/json" } });
  await env.DB.prepare(`INSERT INTO applications
    (id, company, contact, phone, email, region, language, notes, earliestStartDate, hasCargoVan, cargoVanCount, created_at, backup_key)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(application.id, application.company, application.contact, application.phone, application.email,
      application.region, application.language || "en", String(application.notes || ""), application.earliestStartDate,
      application.hasCargoVan, application.cargoVanCount, application.created_at, key).run();
  return application;
}

export async function notifyApplication(application, env) {
  if (!env.RESEND_API_KEY || !env.NOTIFY_EMAIL || !env.FROM_EMAIL) return "pending";
  const text = ["New GOFO Ground DSP application", `Application: ${application.id}`, `Company: ${application.company}`,
    `Contact: ${application.contact}`, `Email: ${application.email}`, `Phone: ${application.phone}`,
    `Region: ${application.region}`, `Earliest start date: ${application.earliestStartDate}`,
    `Cargo vans: ${application.hasCargoVan}`, `Cargo van count: ${application.cargoVanCount}`,
    `Notes: ${application.notes || "-"}`, `Submitted: ${application.created_at}`].join("\n");
  let status = "failed";
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `application-${application.id}` },
      body: JSON.stringify({ from: env.FROM_EMAIL, to: [env.NOTIFY_EMAIL], subject: `New DSP application: ${application.company}`, text }),
      signal: AbortSignal.timeout(10000),
    });
    status = response.ok ? "sent" : "failed";
  } catch { /* Keep the application available for a later notification retry. */ }
  await env.DB.prepare("UPDATE applications SET email_status = ? WHERE id = ?").bind(status, application.id).run();
  return status;
}

export async function listApplications(env) {
  await env.DB.prepare(SCHEMA).run();
  return (await env.DB.prepare("SELECT * FROM applications ORDER BY created_at DESC").all()).results;
}
