export function getStatus(medicine) {
  if (Number(medicine.quantity) === 0) return { label: "Out of stock", tone: "red" };
  if (Number(medicine.quantity) <= 10) return { label: "Low stock", tone: "amber" };
  return { label: "Available", tone: "green" };
}

export function daysUntil(date) {
  return Math.ceil((new Date(date) - new Date()) / 86400000);
}

export function matchMedicines(text, medicines = []) {
  const normalized = text.toLowerCase();
  return medicines
    .map((medicine) => {
      const terms = [medicine.name, medicine.generic, medicine.brand].filter(Boolean);
      const exact = terms.some((term) => normalized.includes(term.toLowerCase()));
      const partial = terms.some((term) => term.length > 4 && normalized.includes(term.toLowerCase().slice(0, Math.max(4, term.length - 2))));
      return exact ? { medicine, confidence: 100, match: "Exact match" } : partial ? { medicine, confidence: 74, match: "Possible match" } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.confidence - a.confidence);
}
