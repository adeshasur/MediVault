"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search, SlidersHorizontal, Trash2 } from "lucide-react";
import MedicineForm from "./MedicineForm";
import StatusBadge from "./StatusBadge";
import { getStatus } from "@/lib/medicines";
import { useMedicines } from "@/hooks/useMedicines";

export default function MedicineInventory() {
  const { medicines, loading, error, add, remove, update } = useMedicines();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [stockStatus, setStockStatus] = useState("All stock levels");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");
  const categories = ["All categories", ...new Set(medicines.map((medicine) => medicine.category))];
  const filtered = useMemo(() => medicines.filter((medicine) => {
    const blob = `${medicine.name} ${medicine.generic} ${medicine.brand} ${medicine.strength}`.toLowerCase();
    const status = getStatus(medicine).label;
    return blob.includes(query.toLowerCase()) && (category === "All categories" || medicine.category === category) && (stockStatus === "All stock levels" || status === stockStatus);
  }), [medicines, query, category, stockStatus]);
  function confirmRemove(medicine) {
    if (window.confirm(`Remove ${medicine.name} from the inventory?`)) remove(medicine.id).catch((requestError) => setMessage(requestError.message));
  }

  return <>{showForm && <div style={{marginBottom: 16}}><MedicineForm medicine={editing} onSave={async (item) => { try { editing ? await update(editing.id, item) : await add(item); setEditing(null); setShowForm(false); setMessage(""); } catch (requestError) { setMessage(requestError.message); } }} onCancel={() => { setEditing(null); setShowForm(false); }} /></div>}
    {(error || message) && <div className="notice">{error || message}</div>}
    <section className="card">
      <div className="toolbar">
        <div className="toolbar-left"><div className="searchbox input"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search medicines..." /></div><select className="input" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select><select className="input" value={stockStatus} onChange={(event) => setStockStatus(event.target.value)}>{["All stock levels", "Available", "Low stock", "Out of stock"].map((item) => <option key={item}>{item}</option>)}</select></div>
        <button className="btn primary" onClick={() => { setEditing(null); setShowForm(!showForm); }}><Plus size={16} /> Add medicine</button>
      </div>
      <div className="table-wrap">{loading ? <div className="empty">Loading inventory from database...</div> : <table><thead><tr><th>Medicine</th><th>Category</th><th>Form</th><th>Price</th><th>Stock</th><th>Expiry</th><th>Status</th><th></th></tr></thead><tbody>
        {filtered.map((medicine) => <tr key={medicine.id}><td className="medicine-name"><b>{medicine.name}</b><span>{medicine.generic} · {medicine.brand}</span></td><td>{medicine.category}</td><td>{medicine.strength} {medicine.form}</td><td>LKR {Number(medicine.price).toFixed(2)}</td><td>{medicine.quantity}</td><td>{medicine.expiry}</td><td><StatusBadge {...getStatus(medicine)} /></td><td><div className="table-actions"><button title="Edit record" onClick={() => { setEditing(medicine); setShowForm(true); }}><Pencil size={15} /></button><button title="Remove record" onClick={() => confirmRemove(medicine)}><Trash2 size={15} /></button></div></td></tr>)}
      </tbody></table>}{!loading && filtered.length === 0 && <div className="empty"><SlidersHorizontal size={24} /><p>No medicines match your filters.</p></div>}</div>
    </section>
  </>;
}
