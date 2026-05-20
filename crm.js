const rowsEl = document.querySelector("#crmRows");
const emptyEl = document.querySelector("#crmEmpty");
const searchEl = document.querySelector("#crmSearch");
const totalEl = document.querySelector("#crmTotal");
const regionsEl = document.querySelector("#crmRegions");
const latestEl = document.querySelector("#crmLatest");
const refreshButton = document.querySelector("#refreshCrm");
const logoutButton = document.querySelector("#logoutCrm");
const exportButton = document.querySelector("#exportCrm");

let applications = [];

function formatDate(value) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function languageLabel(value) {
  const labels = {
    en: "English",
    zh: "中文",
    es: "Español",
  };
  return labels[value] || value || "-";
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function exportApplications() {
  const headers = ["id", "company", "contact", "phone", "email", "region", "language", "notes", "created_at"];
  const rows = applications.map((item) => headers.map((key) => csvCell(item[key])).join(","));
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `dsp-applications-${date}.csv`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function renderMetrics(items) {
  totalEl.textContent = applications.length;
  regionsEl.textContent = new Set(applications.map((item) => item.region).filter(Boolean)).size;
  latestEl.textContent = applications[0] ? formatDate(applications[0].created_at).split(",")[0] : "-";
  emptyEl.hidden = items.length > 0;
}

function renderRows() {
  const query = searchEl.value.trim().toLowerCase();
  const filtered = applications.filter((item) => {
    const text = `${item.company} ${item.contact} ${item.phone} ${item.email} ${item.region} ${item.language} ${item.notes}`.toLowerCase();
    return !query || text.includes(query);
  });

  rowsEl.innerHTML = "";
  filtered.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(item.company)}</td>
      <td>${escapeHtml(item.contact)}</td>
      <td>${escapeHtml(item.phone)}</td>
      <td><a href="mailto:${escapeHtml(item.email)}">${escapeHtml(item.email)}</a></td>
      <td>${escapeHtml(item.region)}</td>
      <td>${escapeHtml(languageLabel(item.language))}</td>
      <td>${escapeHtml(item.notes || "-")}</td>
      <td>${formatDate(item.created_at)}</td>
    `;
    rowsEl.append(row);
  });

  renderMetrics(filtered);
}

async function loadApplications() {
  refreshButton.disabled = true;
  try {
    const response = await fetch("/api/applications");
    if (response.status === 401) {
      window.location.href = "/login.html";
      return;
    }

    if (!response.ok) {
      throw new Error("Unable to load applications");
    }

    applications = await response.json();
    exportButton.disabled = applications.length === 0;
    renderRows();
  } catch (error) {
    emptyEl.hidden = false;
    emptyEl.textContent = "Unable to load DSP applications.";
  } finally {
    refreshButton.disabled = false;
  }
}

async function logout() {
  logoutButton.disabled = true;
  await fetch("/api/logout", { method: "POST" });
  window.location.href = "/login.html";
}

searchEl.addEventListener("input", renderRows);
refreshButton.addEventListener("click", loadApplications);
logoutButton.addEventListener("click", logout);
exportButton.addEventListener("click", exportApplications);
exportButton.disabled = true;
loadApplications();
