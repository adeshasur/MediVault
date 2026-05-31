"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Camera, CheckCircle2, LoaderCircle, Minus, Plus, RotateCcw, Search } from "lucide-react";
import { matchMedicines, seedMedicines } from "@/lib/medicines";
import { readMedicineNames } from "@/lib/ocr";
import StatusBadge from "./StatusBadge";

export default function CustomerScanner() {
  const [text, setText] = useState("");
  const [matches, setMatches] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [preview, setPreview] = useState("");
  const [scanning, setScanning] = useState(false);
  const [checked, setChecked] = useState(false);

  async function upload(event) {
    const file = event.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setScanning(true);
    try {
      const medicineNames = await readMedicineNames(file, seedMedicines);
      setText(medicineNames);
      if (!medicineNames) setChecked(true);
    } catch {
      setText("");
      setChecked(true);
    }
    setScanning(false);
  }

  function check() {
    if (!text.trim()) {
      setMatches([]);
      setChecked(true);
      return;
    }
    const found = matchMedicines(text, seedMedicines);
    setMatches(found);
    setChecked(true);
    setQuantities(Object.fromEntries(found.map(({ medicine }) => [medicine.id, 1])));
  }

  function changeQuantity(medicine, amount) {
    setQuantities((current) => ({
      ...current,
      [medicine.id]: Math.min(medicine.quantity || 1, Math.max(1, (current[medicine.id] || 1) + amount))
    }));
  }
  function reset() {
    setText("");
    setMatches([]);
    setQuantities({});
    setPreview("");
    setChecked(false);
  }

  const grandTotal = useMemo(() => matches.reduce((sum, { medicine }) => sum + (medicine.quantity > 0 ? medicine.price * (quantities[medicine.id] || 1) : 0), 0), [matches, quantities]);

  return <>
    <section className="card form-card">
      <label className="upload">
        {scanning ? <LoaderCircle className="spin" size={29} /> : <Camera size={29} />}
        <h3>{scanning ? "Reading your prescription..." : "Take a photo or upload your prescription"}</h3>
        <p>Only detected medicine names will be added below. JPG, PNG, or WEBP.</p>
        <input accept="image/*" capture="environment" onChange={upload} type="file" />
        {preview && <img className="file-preview" src={preview} alt="Prescription preview" />}
      </label>
      <div className="field" style={{marginTop: 14}}><label>Detected prescription text</label><textarea className="input" value={text} onChange={(event) => setText(event.target.value)} placeholder="Type medicine names here..." /></div>
      <div className="notice"><AlertTriangle size={16} /> OCR may contain errors. Check the medicine names before viewing availability.</div>
      <div className="form-actions"><button className="btn secondary" onClick={reset}><RotateCcw size={15} /> Reset</button><button className="btn primary" onClick={check}><Search size={16} /> Check availability</button></div>
    </section>
    {checked && matches.length === 0 && <div className="notice"><AlertTriangle size={16} /> No medicine names were detected. Upload a clearer image or type the medicine names manually.</div>}
    {matches.length > 0 && <section className="scan-results">
      <div className="panel-head" style={{padding: "3px 2px"}}><h3>Available medicines</h3><span className="pill green"><CheckCircle2 size={13} /> {matches.length} matches</span></div>
      {matches.map(({ medicine }) => {
        const requested = quantities[medicine.id] || 1;
        return <article className="scan-result" key={medicine.id}>
          <div><h4>{medicine.name} · {medicine.strength}</h4><p>{medicine.generic} · {medicine.form}</p><p style={{marginTop: 7}}>Available quantity: <b>{medicine.quantity} units</b> · Unit price: <b>LKR {medicine.price.toFixed(2)}</b></p></div>
          <div className="scan-result-right"><StatusBadge label={medicine.quantity > 0 ? "Available" : "Out of stock"} tone={medicine.quantity > 0 ? "green" : "red"} />{medicine.quantity > 0 ? <><div className="qty-control"><button onClick={() => changeQuantity(medicine, -1)}><Minus size={13} /></button><b>{requested}</b><button onClick={() => changeQuantity(medicine, 1)}><Plus size={13} /></button></div><span className="line-total">Total: LKR {(medicine.price * requested).toFixed(2)}</span></> : <span className="line-total">Unavailable</span>}</div>
        </article>;
      })}
      <div className="total-card"><div><span>Estimated prescription total</span><strong>LKR {grandTotal.toFixed(2)}</strong></div><CheckCircle2 size={26} /></div>
      <div className="notice"><AlertTriangle size={16} /> Availability and prices are estimates. Show this result to pharmacy staff and verify the prescription before purchasing.</div>
    </section>}
  </>;
}
