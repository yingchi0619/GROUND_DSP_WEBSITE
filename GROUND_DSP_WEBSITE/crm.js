const rowsEl = document.querySelector("#crmRows");
const emptyEl = document.querySelector("#crmEmpty");
const searchEl = document.querySelector("#crmSearch");
const totalEl = document.querySelector("#crmTotal");
const regionsEl = document.querySelector("#crmRegions");
const latestEl = document.querySelector("#crmLatest");
const refreshButton = document.querySelector("#refreshCrm");

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

function renderMetrics(items) {
  totalEl.textContent = applications.length;
  regionsEl.textContent = new Set(applications.map((item) => item.region).filter(Boolean)).size;
  latestEl.textContent = applications[0] ? formatDate(applications[0].created_at).split(",")[0] : "-";
  emptyEl.hidden = items.length > 0;
}

function renderRows() {
  const query = searchEl.value.trim().toLowerCase();
  const filtered = applications.filter((item) => {
    const text = `${item.company} ${item.contact} ${item.phone} ${item.email} ${item.region} ${item.notes}`.toLowerCase();
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
    if (!response.ok) {
      throw new Error("Unable to load applications");
    }

    applications = await response.json();
    renderRows();
  } catch (error) {
    emptyEl.hidden = false;
    emptyEl.textContent = "Unable to load DSP applications.";
  } finally {
    refreshButton.disabled = false;
  }
}

searchEl.addEventListener("input", renderRows);
refreshButton.addEventListener("click", loadApplications);
loadApplications();
