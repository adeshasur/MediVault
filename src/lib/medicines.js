export const seedMedicines = [
  { id: "MED-001", name: "Panadol", generic: "Paracetamol", brand: "Panadol", category: "Pain Relief", strength: "500mg", form: "Tablet", price: 12, quantity: 250, expiry: "2027-03-10", manufacturer: "GSK" },
  { id: "MED-002", name: "Piriton", generic: "Chlorpheniramine", brand: "Piriton", category: "Allergy", strength: "4mg", form: "Tablet", price: 8, quantity: 180, expiry: "2026-11-20", manufacturer: "GSK" },
  { id: "MED-003", name: "Amoxil", generic: "Amoxicillin", brand: "Amoxil", category: "Antibiotic", strength: "500mg", form: "Capsule", price: 35, quantity: 90, expiry: "2026-09-15", manufacturer: "GSK" },
  { id: "MED-004", name: "Augmentin", generic: "Amoxicillin Clavulanate", brand: "Augmentin", category: "Antibiotic", strength: "625mg", form: "Tablet", price: 95, quantity: 60, expiry: "2026-12-01", manufacturer: "GSK" },
  { id: "MED-005", name: "Cetirizine", generic: "Cetirizine", brand: "Cetirizine", category: "Allergy", strength: "10mg", form: "Tablet", price: 18, quantity: 120, expiry: "2027-01-05", manufacturer: "Generic Pharma" },
  { id: "MED-006", name: "Loratadine", generic: "Loratadine", brand: "Clarityne", category: "Allergy", strength: "10mg", form: "Tablet", price: 22, quantity: 75, expiry: "2026-10-12", manufacturer: "Bayer" },
  { id: "MED-007", name: "Omeprazole", generic: "Omeprazole", brand: "OMEZ", category: "Gastric", strength: "20mg", form: "Capsule", price: 28, quantity: 110, expiry: "2027-02-18", manufacturer: "Dr Reddy" },
  { id: "MED-008", name: "Pantoprazole", generic: "Pantoprazole", brand: "Pan 40", category: "Gastric", strength: "40mg", form: "Tablet", price: 35, quantity: 8, expiry: "2026-08-30", manufacturer: "Alkem" },
  { id: "MED-009", name: "Metformin", generic: "Metformin", brand: "Glycomet", category: "Diabetes", strength: "500mg", form: "Tablet", price: 16, quantity: 200, expiry: "2027-04-21", manufacturer: "USV" },
  { id: "MED-010", name: "Atorvastatin", generic: "Atorvastatin", brand: "Atorva", category: "Cholesterol", strength: "10mg", form: "Tablet", price: 32, quantity: 0, expiry: "2026-07-14", manufacturer: "Zydus" },
  { id: "MED-011", name: "Losartan", generic: "Losartan", brand: "Losar", category: "Blood Pressure", strength: "50mg", form: "Tablet", price: 25, quantity: 130, expiry: "2027-05-01", manufacturer: "Torrent" },
  { id: "MED-012", name: "Amlodipine", generic: "Amlodipine", brand: "Amlong", category: "Blood Pressure", strength: "5mg", form: "Tablet", price: 14, quantity: 160, expiry: "2026-12-22", manufacturer: "Micro Labs" },
  { id: "MED-013", name: "Salbutamol", generic: "Salbutamol", brand: "Ventolin", category: "Asthma", strength: "100mcg", form: "Inhaler", price: 650, quantity: 25, expiry: "2026-09-10", manufacturer: "GSK" },
  { id: "MED-014", name: "Azithromycin", generic: "Azithromycin", brand: "Azee", category: "Antibiotic", strength: "500mg", form: "Tablet", price: 120, quantity: 4, expiry: "2026-06-15", manufacturer: "Cipla" },
  { id: "MED-015", name: "Cefixime", generic: "Cefixime", brand: "Taxim-O", category: "Antibiotic", strength: "200mg", form: "Tablet", price: 85, quantity: 55, expiry: "2026-11-25", manufacturer: "Alkem" },
  { id: "MED-016", name: "Vitamin C", generic: "Ascorbic Acid", brand: "Celin", category: "Supplement", strength: "500mg", form: "Tablet", price: 20, quantity: 140, expiry: "2027-03-30", manufacturer: "GSK" },
  { id: "MED-017", name: "ORS", generic: "Oral Rehydration Salts", brand: "Jeevani", category: "Rehydration", strength: "21g", form: "Sachet", price: 45, quantity: 70, expiry: "2027-01-18", manufacturer: "SPC" },
  { id: "MED-018", name: "Betadine", generic: "Povidone Iodine", brand: "Betadine", category: "Antiseptic", strength: "10%", form: "Solution", price: 480, quantity: 30, expiry: "2027-05-10", manufacturer: "Mundipharma" },
  { id: "MED-019", name: "Diclofenac", generic: "Diclofenac", brand: "Voveran", category: "Pain Relief", strength: "50mg", form: "Tablet", price: 18, quantity: 100, expiry: "2026-10-01", manufacturer: "Novartis" },
  { id: "MED-020", name: "Ibuprofen", generic: "Ibuprofen", brand: "Brufen", category: "Pain Relief", strength: "400mg", form: "Tablet", price: 24, quantity: 88, expiry: "2026-09-28", manufacturer: "Abbott" }
];

export const categories = [...new Set(seedMedicines.map((medicine) => medicine.category))];

export function getStatus(medicine) {
  if (Number(medicine.quantity) === 0) return { label: "Out of stock", tone: "red" };
  if (Number(medicine.quantity) <= 10) return { label: "Low stock", tone: "amber" };
  return { label: "Available", tone: "green" };
}

export function daysUntil(date) {
  return Math.ceil((new Date(date) - new Date()) / 86400000);
}

export function matchMedicines(text, medicines = seedMedicines) {
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
