"use client";

import { useEffect, useState } from "react";
import { seedMedicines } from "@/lib/medicines";

const storageKey = "medivault-medicines";

export function useMedicines() {
  const [medicines, setMedicines] = useState(seedMedicines);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) setMedicines(JSON.parse(saved));
  }, []);

  function save(next) {
    setMedicines(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  }

  function add(medicine) {
    save([{ ...medicine, id: `MED-${String(Date.now()).slice(-6)}` }, ...medicines]);
  }

  function remove(id) {
    save(medicines.filter((medicine) => medicine.id !== id));
  }

  function update(id, medicine) {
    save(medicines.map((item) => item.id === id ? { ...item, ...medicine } : item));
  }

  return { medicines, add, remove, update };
}
