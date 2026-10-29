const DETAILS_MARKER = "\n\n[GOFO application details]\n";

export function validateApplication(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("Invalid application");
  for (const field of ["company", "contact", "phone", "email", "region", "earliestStartDate"]) {
    if (typeof data[field] !== "string" || !data[field].trim()) throw new Error(`Missing ${field}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.earliestStartDate) ||
      new Date(data.earliestStartDate + "T00:00:00Z").toISOString().slice(0, 10) !== data.earliestStartDate) {
    throw new Error("Invalid earliest start date");
  }
  if (!["yes", "no"].includes(data.hasCargoVan)) throw new Error("Select whether you have cargo vans");
  const count = data.hasCargoVan === "yes" ? Number(data.cargoVanCount) : 0;
  if (data.hasCargoVan === "yes" && (!Number.isInteger(count) || count < 1 || count > 10000)) {
    throw new Error("Cargo van count must be a whole number between 1 and 10000");
  }
  return { ...data, cargoVanCount: count };
}

// Preserve new fields in the existing Render database until a storage migration is selected.
export function toLegacyApplication(data) {
  return { ...data, notes: `${String(data.notes || "")}${DETAILS_MARKER}Earliest start date: ${data.earliestStartDate}\nCargo vans: ${data.hasCargoVan}\nCargo van count: ${data.cargoVanCount}` };
}

export function fromLegacyApplication(data) {
  const notes = String(data.notes || "");
  const start = notes.lastIndexOf(DETAILS_MARKER);
  if (start < 0) return data;
  const details = notes.slice(start + DETAILS_MARKER.length);
  const match = details.match(/^Earliest start date: (\d{4}-\d{2}-\d{2})\nCargo vans: (yes|no)\nCargo van count: (\d+)$/);
  if (!match) return data;
  return { ...data, notes: notes.slice(0, start), earliestStartDate: match[1], hasCargoVan: match[2], cargoVanCount: Number(match[3]) };
}
