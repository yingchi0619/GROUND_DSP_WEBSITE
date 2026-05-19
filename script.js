const copy = {
  en: {
    documentTitle: "DSP Partner Application",
    brand: "DSP Partner",
    eyebrow: "Delivery Service Partner Application",
    title: "Tell us where you can deliver.",
    subtitle: "Share your company contact details and operating region. Our team will review your information and follow up.",
    mapEyebrow: "Active network",
    mapTitle: "Open stations across the United States",
    mapSubtitle: "Orange states are currently active. Hover an active state to see station cities.",
    legend: "Open station state",
    stationsLabel: "Stations",
    citiesLabel: "Cities",
    companyLabel: "Company name",
    companyPlaceholder: "Northline Logistics",
    contactLabel: "Contact name",
    contactPlaceholder: "Alex Morgan",
    phoneLabel: "Phone number",
    phonePlaceholder: "+1 415 000 2026",
    emailLabel: "Email address",
    emailPlaceholder: "partners@example.com",
    regionLabel: "Responsible region",
    regionPlaceholder: "Bay Area, California",
    notesLabel: "Additional notes",
    notesPlaceholder: "Fleet size, service coverage, available start date",
    privacy: "Your information is used only for DSP partner recruitment.",
    groundNote: "GOFO Ground is focused on large parcel delivery.",
    submit: "Submit application",
    success: "Application received. Thank you.",
    submitError: "Unable to submit right now. Please try again.",
  },
  zh: {
    documentTitle: "DSP 合作伙伴申请",
    brand: "DSP 合作伙伴",
    eyebrow: "配送服务伙伴申请",
    title: "告诉我们你可以负责的区域。",
    subtitle: "请填写公司联系信息与服务区域。我们的团队会审核资料并与你联系。",
    mapEyebrow: "当前网络",
    mapTitle: "美国已开通站点",
    mapSubtitle: "橙色州代表当前已开通站点。鼠标悬停在高亮州上可查看城市。",
    legend: "已开通州",
    stationsLabel: "站点",
    citiesLabel: "城市",
    companyLabel: "公司名称",
    companyPlaceholder: "北线物流服务",
    contactLabel: "联系人",
    contactPlaceholder: "张明",
    phoneLabel: "联系电话",
    phonePlaceholder: "+86 138 0000 2026",
    emailLabel: "邮箱地址",
    emailPlaceholder: "partners@example.com",
    regionLabel: "负责区域",
    regionPlaceholder: "上海及周边城市",
    notesLabel: "补充说明",
    notesPlaceholder: "车辆规模、服务范围、可开始合作时间",
    privacy: "你的信息仅用于 DSP 合作伙伴招募。",
    groundNote: "GOFO Ground 主要面向大件包裹配送。",
    submit: "提交申请",
    success: "申请已收到，谢谢。",
    submitError: "当前无法提交，请稍后再试。",
  },
  es: {
    documentTitle: "Solicitud de Socio DSP",
    brand: "Socio DSP",
    eyebrow: "Solicitud para Delivery Service Partner",
    title: "Cuéntanos dónde puedes entregar.",
    subtitle: "Comparte los datos de contacto de tu empresa y la región operativa. Nuestro equipo revisará la información y te contactará.",
    mapEyebrow: "Red activa",
    mapTitle: "Estaciones abiertas en Estados Unidos",
    mapSubtitle: "Los estados en naranja están activos. Pasa el cursor sobre un estado activo para ver las ciudades.",
    legend: "Estado con estación abierta",
    stationsLabel: "Estaciones",
    citiesLabel: "Ciudades",
    companyLabel: "Nombre de la empresa",
    companyPlaceholder: "Northline Logistics",
    contactLabel: "Nombre de contacto",
    contactPlaceholder: "Alex Morgan",
    phoneLabel: "Número de teléfono",
    phonePlaceholder: "+34 600 000 202",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "partners@example.com",
    regionLabel: "Región responsable",
    regionPlaceholder: "Madrid y alrededores",
    notesLabel: "Notas adicionales",
    notesPlaceholder: "Tamaño de flota, cobertura, fecha disponible de inicio",
    privacy: "Tu información se usa solo para reclutamiento de socios DSP.",
    groundNote: "GOFO Ground se enfoca principalmente en la entrega de paquetes grandes.",
    submit: "Enviar solicitud",
    success: "Solicitud recibida. Gracias.",
    submitError: "No se puede enviar en este momento. Inténtalo de nuevo.",
  },
};

const stationData = [
  { station: "AT303/ATL", city: "Atlanta", state: "GA" },
  { station: "BA210", city: "Hanover", state: "MD" },
  { station: "BO021", city: "Malden", state: "MA" },
  { station: "CB080", city: "Philadelphia", state: "PA" },
  { station: "CC452", city: "Cincinnati", state: "OH" },
  { station: "CH600/ORD.G", city: "Franklin Park", state: "IL" },
  { station: "CL432", city: "Columbus", state: "OH" },
  { station: "CV441", city: "Cleveland", state: "OH" },
  { station: "DAL", city: "Dallas", state: "TX" },
  { station: "FR937", city: "Fresno", state: "CA" },
  { station: "IN462", city: "Indianapolis", state: "IN" },
  { station: "LA900", city: "Santa Fe Springs", state: "CA" },
  { station: "LA917/CNO.G", city: "Chino", state: "CA" },
  { station: "LV891", city: "Las Vegas", state: "NV" },
  { station: "MI481", city: "Livonia", state: "MI" },
  { station: "NJ070/EWR.G", city: "Carteret", state: "NJ" },
  { station: "NY112", city: "Brooklyn", state: "NY" },
  { station: "NY118", city: "Hicksville", state: "NY" },
  { station: "PT972", city: "Portland", state: "OR" },
  { station: "PX850", city: "Tolleson", state: "AZ" },
  { station: "SD921", city: "San Diego", state: "CA" },
  { station: "SE981", city: "Lakewood", state: "WA" },
  { station: "SF945", city: "Hayward", state: "CA" },
  { station: "ST958", city: "Sacramento", state: "CA" },
  { station: "WI531", city: "Franklin Park", state: "IL" },
];

const stateNames = {
  AZ: "Arizona",
  CA: "California",
  GA: "Georgia",
  IL: "Illinois",
  IN: "Indiana",
  MA: "Massachusetts",
  MD: "Maryland",
  MI: "Michigan",
  NJ: "New Jersey",
  NV: "Nevada",
  NY: "New York",
  OH: "Ohio",
  OR: "Oregon",
  PA: "Pennsylvania",
  TX: "Texas",
  WA: "Washington",
};

const stationsByState = stationData.reduce((states, item) => {
  if (!states[item.state]) {
    states[item.state] = [];
  }

  states[item.state].push(item);
  return states;
}, {});

const html = document.documentElement;
const form = document.querySelector("#applicationForm");
const successMessage = document.querySelector("#successMessage");
const submitButton = document.querySelector("#submitButton");
const languageButtons = document.querySelectorAll(".language-button");
const mapContainer = document.querySelector("#usMap");
const mapTooltip = document.querySelector("#mapTooltip");
const mapFrame = document.querySelector(".map-frame");
let currentLanguage = "en";
let messageKey = "success";

function setStatusMessage(key) {
  messageKey = key;
  successMessage.textContent = copy[currentLanguage][key] || copy.en[key];
}

function setLanguage(language) {
  const dictionary = copy[language] || copy.en;
  currentLanguage = language;
  html.lang = language === "zh" ? "zh-CN" : language;
  document.title = dictionary.documentTitle;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = dictionary[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.placeholder = copy.en[key];
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === language;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  setStatusMessage(messageKey);
}

function tooltipMarkup(state, stations) {
  const cities = [...new Set(stations.map((item) => item.city))].join(", ");

  return `
    <span class="tooltip-title">${stateNames[state] || state} · ${stations.length} ${copy[currentLanguage].stationsLabel}</span>
    <span class="tooltip-cities">${copy[currentLanguage].citiesLabel}: ${cities}</span>
  `;
}

function moveTooltip(event) {
  const frameRect = mapFrame.getBoundingClientRect();
  const x = Math.min(Math.max(event.clientX - frameRect.left, 140), frameRect.width - 140);
  const y = Math.max(event.clientY - frameRect.top, 58);

  mapTooltip.style.left = `${x}px`;
  mapTooltip.style.top = `${y}px`;
}

function showTooltip(state, stations, event) {
  mapTooltip.innerHTML = tooltipMarkup(state, stations);
  moveTooltip(event);
  mapTooltip.classList.add("visible");
}

function hideTooltip() {
  mapTooltip.classList.remove("visible");
}

async function loadStationMap() {
  try {
    let svgText = window.US_MAP_SVG;

    if (!svgText) {
      const response = await fetch("us-map.svg");
      svgText = await response.text();
    }

    mapContainer.innerHTML = svgText;

    const svg = mapContainer.querySelector("svg");
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.setAttribute("viewBox", "0 0 959 593");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "United States map with active DSP station states");

    Object.entries(stationsByState).forEach(([state, stations]) => {
      const statePath = mapContainer.querySelector(`path.${state.toLowerCase()}`);

      if (!statePath) {
        return;
      }

      statePath.classList.add("is-open");
      statePath.setAttribute("tabindex", "0");
      statePath.setAttribute("aria-label", `${stateNames[state]}: ${[...new Set(stations.map((item) => item.city))].join(", ")}`);

      const title = statePath.querySelector("title");
      if (title) {
        title.textContent = `${stateNames[state]}: ${[...new Set(stations.map((item) => item.city))].join(", ")}`;
      }

      statePath.addEventListener("mousemove", (event) => showTooltip(state, stations, event));
      statePath.addEventListener("mouseleave", hideTooltip);
      statePath.addEventListener("blur", hideTooltip);
      statePath.addEventListener("focus", (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        showTooltip(state, stations, {
          clientX: rect.left + rect.width / 2,
          clientY: rect.top,
        });
      });
    });
  } catch (error) {
    mapContainer.innerHTML = '<p class="map-error">Map failed to load.</p>';
  }
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  submitButton.disabled = true;
  successMessage.hidden = true;
  setStatusMessage("success");

  fetch("/api/applications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to submit application");
      }

      return response.json();
    })
    .then(() => {
      setStatusMessage("success");
      successMessage.hidden = false;
      form.reset();
    })
    .catch(() => {
      setStatusMessage("submitError");
      successMessage.hidden = false;
    })
    .finally(() => {
      submitButton.disabled = false;
    });
});

setLanguage("en");
loadStationMap();
