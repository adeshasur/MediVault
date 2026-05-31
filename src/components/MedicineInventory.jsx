"use client";

import { useMemo, useState } from "react";
import { Plus, Search, SlidersHorizontal, Trash2 } from "lucide-react";
import MedicineForm from "./MedicineForm";
import StatusBadge from "./StatusBadge";
import { getStatus } from "@/lib/medicines";
import { useMedicines } from "@/hooks/useMedicines";

export default function MedicineInventory() {
  const { medicines, add, remove } = useMedicines();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [showForm, setShowForm] = useState(false);
  const categories = ["All categories", ...new Set(medicines.map((medicine) => medicine.category))];
  const filtered = useMemo(() => medicines.filter((medicine) => {
    const blob = `${medicine.name} ${medicine.generic} ${medicine.brand} ${medicine.strength}`.toLowerCase();
    return blob.includes(query.toLowerCase()) && (category === "All categories" || medicine.category === category);
  }), [medicines, query, category]);

  return <>{showForm && <div style={{marginBottom: 16}}><MedicineForm onAdd={(item) => { add(item); setShowForm(false); }} onCancel={() => setShowForm(false)} /></div>}
    <section className="card">
      <div className="toolbar">
        <div className="toolbar-left"><div className="searchbox input"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search medicines..." /></div><select className="input" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></div>
        <button className="btn primary" onClick={() => setShowForm(!showForm)}><Plus size={16} /> Add medicine</button>
      </div>
      <div className="table-wrap"><table><thead><tr><th>Medicine</th><th>Category</th><th>Form</th><th>Price</th><th>Stock</th><th>Expiry</th><th>Status</th><th></th></tr></thead><tbody>
        {filtered.map((medicine) => <tr key={medicine.id}><td className="medicine-name"><b>{medicine.name}</b><span>{medicine.generic} · {medicine.brand}</span></td><td>{medicine.category}</td><td>{medicine.strength} {medicine.form}</td><td>LKR {Number(medicine.price).toFixed(2)}</td><td>{medicine.quantity}</td><td>{medicine.expiry}</td><td><StatusBadge {...getStatus(medicine)} /></td><td><div className="table-actions"><button title="Remove record" onClick={() => remove(medicine.id)}><Trash2 size={15} /></button></div></td></tr>)}
      </tbody></table>{filtered.length === 0 && <div className="empty"><SlidersHorizontal size={24} /><p>No medicines match your filters.</p></div>}</div>
    </section>
  </>;
}
