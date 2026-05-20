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
    plannedLabel: "Coming soon",
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
    regionSelectPlaceholder: "Select an active city",
    regionOther: "Other",
    regionOtherLabel: "Interested city",
    regionOtherPlaceholder: "Tell us the city you are interested in",
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
    plannedLabel: "即将开通",
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
    regionSelectPlaceholder: "选择已开通城市",
    regionOther: "其他",
    regionOtherLabel: "感兴趣的城市",
    regionOtherPlaceholder: "请填写你感兴趣的城市",
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
    plannedLabel: "Próximamente",
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
    regionSelectPlaceholder: "Selecciona una ciudad activa",
    regionOther: "Otra",
    regionOtherLabel: "Ciudad de interés",
    regionOtherPlaceholder: "Cuéntanos la ciudad que te interesa",
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
  { station: "IN462", city: { en: "Indianapolis", zh: "印第安纳波利斯", es: "Indianápolis" }, state: "IN" },
  { station: "LA900", city: { en: "Los Angeles", zh: "洛杉矶", es: "Los Ángeles" }, state: "CA" },
  { station: "LV891", city: { en: "Las Vegas", zh: "拉斯维加斯", es: "Las Vegas" }, state: "NV" },
  { station: "ST958", city: { en: "Sacramento", zh: "萨拉门托", es: "Sacramento" }, state: "CA" },
  { station: "PT972", city: { en: "Portland", zh: "波特兰", es: "Portland" }, state: "OR" },
  { station: "SF945", city: { en: "San Francisco", zh: "旧金山", es: "San Francisco" }, state: "CA" },
  { station: "DAL", city: { en: "Dallas", zh: "达拉斯", es: "Dallas" }, state: "TX" },
  { station: "NJ070/EWR.G", city: { en: "New Jersey", zh: "新泽西", es: "Nueva Jersey" }, state: "NJ" },
  { station: "NY118", city: { en: "Long Island", zh: "纽约长岛", es: "Long Island" }, state: "NY" },
  { station: "CC452", city: { en: "Cincinnati", zh: "辛辛那提", es: "Cincinnati" }, state: "OH" },
  { station: "CL432", city: { en: "Columbus", zh: "哥伦布", es: "Columbus" }, state: "OH" },
  { station: "CB080", city: { en: "Philadelphia", zh: "费城", es: "Filadelfia" }, state: "PA" },
  { station: "NY112", city: { en: "Brooklyn", zh: "纽约布鲁克林", es: "Brooklyn" }, state: "NY" },
  { station: "AT303/ATL", city: { en: "Atlanta", zh: "亚特兰大", es: "Atlanta" }, state: "GA" },
  { station: "WI531", city: { en: "Milwaukee", zh: "密尔沃基", es: "Milwaukee" }, state: "WI" },
  { station: "BA210", city: { en: "Baltimore", zh: "巴尔的摩", es: "Baltimore" }, state: "MD" },
  { station: "BO021", city: { en: "Boston", zh: "波士顿", es: "Boston" }, state: "MA" },
  { station: "CV441", city: { en: "Cleveland", zh: "克利夫兰", es: "Cleveland" }, state: "OH" },
  { station: "MI481", city: { en: "Detroit", zh: "底特律", es: "Detroit" }, state: "MI" },
  { station: "PX850", city: { en: "Phoenix", zh: "菲尼克斯", es: "Phoenix" }, state: "AZ" },
  { station: "LA917/CNO.G", city: { en: "Los Angeles", zh: "洛杉矶", es: "Los Ángeles" }, state: "CA" },
  { station: "CH600/ORD.G", city: { en: "Chicago", zh: "芝加哥", es: "Chicago" }, state: "IL" },
  { station: "SE981", city: { en: "Seattle", zh: "西雅图", es: "Seattle" }, state: "WA" },
  { station: "SD921", city: { en: "San Diego", zh: "圣地亚哥", es: "San Diego" }, state: "CA" },
];

const stateNames = {
  AZ: "Arizona",
  CA: "California",
  DC: "District of Columbia",
  FL: "Florida",
  GA: "Georgia",
  IL: "Illinois",
  IN: "Indiana",
  MA: "Massachusetts",
  MD: "Maryland",
  MI: "Michigan",
  NJ: "New Jersey",
  NC: "North Carolina",
  NV: "Nevada",
  NY: "New York",
  OH: "Ohio",
  OR: "Oregon",
  PA: "Pennsylvania",
  TN: "Tennessee",
  TX: "Texas",
  WA: "Washington",
  WI: "Wisconsin",
};

const coverageCityData = [
  {
    station: "BA210",
    city: { en: "Washington DC", zh: "华盛顿 DC", es: "Washington DC" },
    state: "DC",
  },
];

const plannedCityData = [
  { city: { en: "Nashville", zh: "纳什维尔", es: "Nashville" }, state: "TN" },
  { city: { en: "Charlotte", zh: "夏洛特", es: "Charlotte" }, state: "NC" },
  { city: { en: "Raleigh RDU", zh: "罗莉 RDU", es: "Raleigh RDU" }, state: "NC" },
  { city: { en: "Miami", zh: "迈阿密", es: "Miami" }, state: "FL" },
  { city: { en: "Orlando", zh: "奥兰多", es: "Orlando" }, state: "FL" },
  { city: { en: "Tampa", zh: "坦帕", es: "Tampa" }, state: "FL" },
  { city: { en: "Houston", zh: "休斯顿", es: "Houston" }, state: "TX" },
  { city: { en: "Dallas", zh: "达拉斯", es: "Dallas" }, state: "TX" },
  { city: { en: "Austin", zh: "奥斯汀", es: "Austin" }, state: "TX" },
];

const stationsByState = stationData.reduce((states, item) => {
  if (!states[item.state]) {
    states[item.state] = [];
  }

  states[item.state].push(item);
  return states;
}, {});

const coverageByState = coverageCityData.reduce((states, item) => {
  if (!states[item.state]) {
    states[item.state] = [];
  }

  states[item.state].push(item);
  return states;
}, {});

const plannedCitiesByState = plannedCityData.reduce((states, item) => {
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
const regionSelect = document.querySelector("#regionSelect");
const regionOtherField = document.querySelector("#regionOtherField");
const regionOtherInput = document.querySelector("#regionOtherInput");
const languageButtons = document.querySelectorAll(".language-button");
const mapContainer = document.querySelector("#usMap");
const mapTooltip = document.querySelector("#mapTooltip");
const mapFrame = document.querySelector(".map-frame");
const mapZoomIn = document.querySelector("#mapZoomIn");
const mapZoomOut = document.querySelector("#mapZoomOut");
const mapZoomReset = document.querySelector("#mapZoomReset");
let currentLanguage = "en";
let messageKey = "success";
let mapScale = 1;
let mapPanX = 0;
let mapPanY = 0;
let isMapDragging = false;
let mapDragStartX = 0;
let mapDragStartY = 0;
let mapDragOriginX = 0;
let mapDragOriginY = 0;

function setStatusMessage(key) {
  messageKey = key;
  successMessage.textContent = copy[currentLanguage][key] || copy.en[key];
}

function localizedCity(city) {
  if (typeof city === "string") {
    return city;
  }

  return city[currentLanguage] || city.en || city.zh;
}

function populateRegionOptions() {
  const selectedValue = regionSelect.value;
  const activeCities = [...new Set([...stationData, ...coverageCityData].map((item) => localizedCity(item.city)))];

  regionSelect.innerHTML = `
    <option value="" data-i18n="regionSelectPlaceholder">${copy[currentLanguage].regionSelectPlaceholder}</option>
    ${activeCities.map((city) => `<option value="${city}">${city}</option>`).join("")}
    <option value="Other" data-i18n="regionOther">${copy[currentLanguage].regionOther}</option>
  `;

  if ([...regionSelect.options].some((option) => option.value === selectedValue)) {
    regionSelect.value = selectedValue;
  }
}

function updateOtherRegionField() {
  const usesOther = regionSelect.value === "Other";
  regionOtherField.hidden = !usesOther;
  regionOtherField.classList.toggle("is-hidden", !usesOther);
  regionOtherInput.required = usesOther;
  if (!usesOther) {
    regionOtherInput.value = "";
  }
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
    element.placeholder = dictionary[key];
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === language;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  populateRegionOptions();
  updateOtherRegionField();
  if (mapContainer.querySelector("svg")) {
    loadStationMap();
  }
  setStatusMessage(messageKey);
}

function tooltipMarkup(state, stations = [], plannedCities = []) {
  const openCities = [...new Set(stations.map((item) => localizedCity(item.city)))].join(", ");
  const planned = [...new Set(plannedCities.map((item) => localizedCity(item.city)))].join(", ");
  const titleText = stations.length
    ? `${stateNames[state] || state} · ${stations.length} ${copy[currentLanguage].stationsLabel}`
    : `${stateNames[state] || state} · ${copy[currentLanguage].plannedLabel}`;

  return `
    <span class="tooltip-title">${titleText}</span>
    ${openCities ? `<span class="tooltip-cities">${copy[currentLanguage].citiesLabel}: ${openCities}</span>` : ""}
    ${planned ? `<span class="tooltip-cities">${copy[currentLanguage].plannedLabel}: ${planned}</span>` : ""}
  `;
}

function moveTooltip(event) {
  const frameRect = mapFrame.getBoundingClientRect();
  const x = Math.min(Math.max(event.clientX - frameRect.left, 140), frameRect.width - 140);
  const y = Math.max(event.clientY - frameRect.top, 58);

  mapTooltip.style.left = `${x}px`;
  mapTooltip.style.top = `${y}px`;
}

function showTooltip(state, stations, plannedCities, event) {
  mapTooltip.innerHTML = tooltipMarkup(state, stations, plannedCities);
  moveTooltip(event);
  mapTooltip.classList.add("visible");
}

function hideTooltip() {
  mapTooltip.classList.remove("visible");
}

function applyMapZoom() {
  const svg = mapContainer.querySelector("svg");
  if (!svg) {
    return;
  }

  svg.style.transform = `translate(${mapPanX}px, ${mapPanY}px) scale(${mapScale})`;
  mapZoomReset.textContent = `${mapScale.toFixed(1).replace(".0", "")}×`;
  mapZoomOut.disabled = mapScale <= 1;
  mapZoomIn.disabled = mapScale >= 2.8;
  mapContainer.classList.toggle("is-zoomed", mapScale > 1);
}

function setMapZoom(nextScale) {
  const previousScale = mapScale;
  mapScale = Math.min(Math.max(nextScale, 1), 2.8);
  if (mapScale === 1 || previousScale === 1 && mapScale === 1) {
    mapPanX = 0;
    mapPanY = 0;
  }
  applyMapZoom();
}

function setMapZoomFromPoint(nextScale, clientX, clientY) {
  const next = Math.min(Math.max(nextScale, 1), 2.8);
  if (next === mapScale) {
    return;
  }

  const rect = mapContainer.getBoundingClientRect();
  const originX = clientX - rect.left - rect.width / 2;
  const originY = clientY - rect.top - rect.height / 2;
  const ratio = next / mapScale;
  mapPanX = originX - (originX - mapPanX) * ratio;
  mapPanY = originY - (originY - mapPanY) * ratio;
  mapScale = next;

  if (mapScale === 1) {
    mapPanX = 0;
    mapPanY = 0;
  }

  applyMapZoom();
}

function startMapDrag(event) {
  if (mapScale <= 1 || event.button !== 0) {
    return;
  }

  isMapDragging = true;
  mapDragStartX = event.clientX;
  mapDragStartY = event.clientY;
  mapDragOriginX = mapPanX;
  mapDragOriginY = mapPanY;
  mapContainer.classList.add("is-dragging");
}

function moveMapDrag(event) {
  if (!isMapDragging) {
    return;
  }

  mapPanX = mapDragOriginX + event.clientX - mapDragStartX;
  mapPanY = mapDragOriginY + event.clientY - mapDragStartY;
  applyMapZoom();
}

function endMapDrag() {
  isMapDragging = false;
  mapContainer.classList.remove("is-dragging");
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
    applyMapZoom();

    const stateCodes = [...new Set([...Object.keys(stationsByState), ...Object.keys(coverageByState), ...Object.keys(plannedCitiesByState)])];

    stateCodes.forEach((state) => {
      const stations = [...(stationsByState[state] || []), ...(coverageByState[state] || [])];
      const plannedCities = plannedCitiesByState[state] || [];
      const statePaths = mapContainer.querySelectorAll(`path.${state.toLowerCase()}, circle.${state.toLowerCase()}`);

      if (!statePaths.length) {
        return;
      }

      const openLabel = [...new Set(stations.map((item) => localizedCity(item.city)))].join(", ");
      const plannedLabel = [...new Set(plannedCities.map((item) => localizedCity(item.city)))].join(", ");
      const ariaLabel = [
        openLabel ? `${stateNames[state]}: ${openLabel}` : "",
        plannedLabel ? `${copy[currentLanguage].plannedLabel}: ${plannedLabel}` : "",
      ].filter(Boolean).join("; ");

      statePaths.forEach((statePath) => {
        statePath.classList.toggle("is-open", stations.length > 0);
        statePath.classList.toggle("is-planned", plannedCities.length > 0);
        statePath.setAttribute("tabindex", "0");
        statePath.setAttribute("aria-label", ariaLabel);

        const title = statePath.querySelector("title");
        if (title) {
          title.textContent = ariaLabel;
        }

        statePath.addEventListener("mousemove", (event) => showTooltip(state, stations, plannedCities, event));
        statePath.addEventListener("mouseleave", hideTooltip);
        statePath.addEventListener("blur", hideTooltip);
        statePath.addEventListener("focus", (event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          showTooltip(state, stations, plannedCities, {
            clientX: rect.left + rect.width / 2,
            clientY: rect.top,
          });
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

regionSelect.addEventListener("change", updateOtherRegionField);
mapZoomIn.addEventListener("click", () => setMapZoom(mapScale + 0.2));
mapZoomOut.addEventListener("click", () => setMapZoom(mapScale - 0.2));
mapZoomReset.addEventListener("click", () => {
  mapPanX = 0;
  mapPanY = 0;
  setMapZoom(1);
});
mapFrame.addEventListener("wheel", (event) => {
  if (!event.ctrlKey && Math.abs(event.deltaY) < 12) {
    return;
  }

  event.preventDefault();
  setMapZoomFromPoint(mapScale + (event.deltaY < 0 ? 0.15 : -0.15), event.clientX, event.clientY);
}, { passive: false });
mapContainer.addEventListener("pointerdown", (event) => {
  startMapDrag(event);
  if (!isMapDragging) {
    return;
  }
  mapContainer.setPointerCapture(event.pointerId);
});
mapContainer.addEventListener("pointermove", moveMapDrag);
mapContainer.addEventListener("pointerup", (event) => {
  if (!isMapDragging) {
    return;
  }

  endMapDrag();
  mapContainer.releasePointerCapture(event.pointerId);
});
mapContainer.addEventListener("pointercancel", endMapDrag);
mapContainer.addEventListener("mousedown", startMapDrag);
window.addEventListener("mousemove", moveMapDrag);
window.addEventListener("mouseup", endMapDrag);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  payload.region = payload.regionChoice === "Other" ? payload.regionOther.trim() : payload.regionChoice;
  payload.language = currentLanguage;
  delete payload.regionChoice;
  delete payload.regionOther;

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
      updateOtherRegionField();
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
