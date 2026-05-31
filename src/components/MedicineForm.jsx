"use client";

import { useState } from "react";

const initial = { name: "", generic: "", brand: "", category: "Pain Relief", strength: "", form: "Tablet", price: "", quantity: "", expiry: "", manufacturer: "" };

export default function MedicineForm({ medicine, onSave, onCancel }) {
  const [form, setForm] = useState(medicine || initial);
  function update(event) { setForm({ ...form, [event.target.name]: event.target.value }); }
  function submit(event) {
    event.preventDefault();
    onSave({ ...form, price: Number(form.price), quantity: Number(form.quantity) });
    setForm(initial);
  }
  return <form className="card form-card" onSubmit={submit}>
    <div className="panel-head" style={{padding: 0, marginBottom: 17}}><h3>{medicine ? "Edit medicine record" : "Add medicine record"}</h3><span className="pill blue">{medicine ? "Update inventory" : "New inventory"}</span></div>
    <div className="form-grid">
      <Field label="Medicine name" name="name" value={form.name} onChange={update} required />
      <Field label="Generic name" name="generic" value={form.generic} onChange={update} required />
      <Field label="Brand name" name="brand" value={form.brand} onChange={update} />
      <Field label="Category" name="category" value={form.category} onChange={update} />
      <Field label="Strength" name="strength" value={form.strength} onChange={update} placeholder="e.g. 500mg" />
      <Field label="Dosage form" name="form" value={form.form} onChange={update} />
      <Field label="Unit price (LKR)" name="price" value={form.price} onChange={update} type="number" required />
      <Field label="Quantity" name="quantity" value={form.quantity} onChange={update} type="number" required />
      <Field label="Expiry date" name="expiry" value={form.expiry} onChange={update} type="date" required />
      <Field label="Manufacturer" name="manufacturer" value={form.manufacturer} onChange={update} />
    </div>
    <div className="form-actions"><button className="btn secondary" onClick={onCancel} type="button">Cancel</button><button className="btn primary" type="submit">{medicine ? "Update medicine" : "Save medicine"}</button></div>
  </form>;
}

function Field({ label, ...props }) { return <div className="field"><label>{label}</label><input className="input" {...props} /></div>; }
