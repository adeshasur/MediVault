"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";

const initial = { pharmacy: "MediCare Pharmacy", phone: "+94 11 234 5678", address: "42 Galle Road, Colombo 03", lowStock: "10", expiryDays: "120" };

export default function Settings() {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");
  function update(event) { setForm({ ...form, [event.target.name]: event.target.value }); }
  function save() {
    if (!form.pharmacy.trim() || Number(form.lowStock) < 1 || Number(form.expiryDays) < 1) {
      setMessage("Enter a pharmacy name and positive alert thresholds.");
      return;
    }
    setMessage("Settings saved for this demo workspace.");
  }
  return <AppShell><PageHeader eyebrow="Workspace preferences" title="Pharmacy settings" description="Keep the pharmacy profile and inventory alert rules up to date." />
    <section className="card form-card" style={{maxWidth: 820}}>
      <div className="panel-head" style={{padding: 0, marginBottom: 18}}><h3>Pharmacy profile</h3><span className="pill green">Demo settings</span></div>
      <div className="form-grid">
        <Field label="Pharmacy name" name="pharmacy" value={form.pharmacy} onChange={update} />
        <Field label="Contact number" name="phone" value={form.phone} onChange={update} />
        <Field label="Address" name="address" value={form.address} onChange={update} wide />
        <Field label="Low-stock threshold" name="lowStock" value={form.lowStock} onChange={update} type="number" />
        <Field label="Near-expiry alert days" name="expiryDays" value={form.expiryDays} onChange={update} type="number" />
      </div>
      {message && <p className="page-subtitle" style={{marginTop: 15}}>{message}</p>}
      <div className="form-actions"><button className="btn primary" onClick={save}>Save settings</button></div>
    </section>
  </AppShell>;
}

function Field({ label, wide, ...props }) { return <div className={`field ${wide ? "wide" : ""}`}><label>{label}</label><input className="input" {...props} /></div>; }
