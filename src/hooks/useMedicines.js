"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

function fromDatabase(row) {
  return {
    id: row.id,
    name: row.medicine_name,
    generic: row.generic_name || "",
    brand: row.brand_name || "",
    category: row.category || "",
    strength: row.strength || "",
    form: row.dosage_form || "",
    price: Number(row.price),
    quantity: Number(row.quantity),
    expiry: row.expiry_date || "",
    manufacturer: row.manufacturer || ""
  };
}

function toDatabase(medicine) {
  return {
    medicine_name: medicine.name,
    generic_name: medicine.generic,
    brand_name: medicine.brand,
    category: medicine.category,
    strength: medicine.strength,
    dosage_form: medicine.form,
    price: Number(medicine.price),
    quantity: Number(medicine.quantity),
    expiry_date: medicine.expiry || null,
    manufacturer: medicine.manufacturer
  };
}

export function useMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!supabase) {
      setError("Database connection is not configured.");
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error: queryError } = await supabase.from("medicines").select("*").order("medicine_name");
    setError(queryError?.message || "");
    setMedicines((data || []).map(fromDatabase));
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  async function add(medicine) {
    const { error: queryError } = await supabase.from("medicines").insert(toDatabase(medicine));
    if (queryError) throw queryError;
    await refresh();
  }

  async function remove(id) {
    const { error: queryError } = await supabase.from("medicines").delete().eq("id", id);
    if (queryError) throw queryError;
    await refresh();
  }

  async function update(id, medicine) {
    const { error: queryError } = await supabase.from("medicines").update(toDatabase(medicine)).eq("id", id);
    if (queryError) throw queryError;
    await refresh();
  }

  return { medicines, loading, error, add, remove, update, refresh };
}
