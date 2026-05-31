"use client";

import { useState } from "react";
import { AlertTriangle, FileImage, LoaderCircle, ScanLine, Sparkles, Upload } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { getStatus, matchMedicines } from "@/lib/medicines";
import { useMedicines } from "@/hooks/useMedicines";

function loadTesseract() {
  if (window.Tesseract) return Promise.resolve(window.Tesseract);
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@6/dist/tesseract.min.js";
    script.onload = () => resolve(window.Tesseract);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default function PrescriptionChecker() {
  const { medicines } = useMedicines();
  const [text, setText] = useState("Panadol 500mg\nCetirizine 10mg\nAzithromycin 500mg");
  const [results, setResults] = useState([]);
  const [preview, setPreview] = useState("");
  const [scanning, setScanning] = useState(false);
  const [checked, setChecked] = useState(false);

  function check() { setResults(matchMedicines(text, medicines)); setChecked(true); }
  async function upload(event) {
    const file = event.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setScanning(true);
    try {
      const Tesseract = await loadTesseract();
      const { data } = await Tesseract.recognize(file, "eng");
      setText(data.text);
    } catch {
      setText("OCR could not read this image clearly. Enter the prescription text manually.");
    }
    setScanning(false);
  }
  return <div className="split">
    <section className="card form-card">
      <div className="panel-head" style={{padding: 0, marginBottom: 16}}><h3>Prescription input</h3><span className="pill blue"><Sparkles size={12} /> Smart matching</span></div>
      <div className="field"><label>Prescription text</label><textarea className="input" value={text} onChange={(event) => setText(event.target.value)} placeholder="Type or paste prescription details here..." /></div>
      <div className="notice"><AlertTriangle size={16} /> OCR results may contain errors. Please verify medicine names manually before dispensing.</div>
      <div className="form-actions"><button className="btn primary" onClick={check}><ScanLine size={16} /> Check availability</button></div>
      {checked && results.length === 0 && <div className="notice"><AlertTriangle size={16} /> No inventory matches found. Review the prescription text and try again.</div>}
      {results.length > 0 && <div className="result-list">{results.map(({ medicine, confidence, match }) => <div className="result" key={medicine.id}><div><h4>{medicine.name} · {medicine.strength}</h4><p>{medicine.generic} · {medicine.brand} · {match} ({confidence}%)</p></div><div className="result-meta"><StatusBadge {...getStatus(medicine)} /><b>LKR {medicine.price.toFixed(2)} · {medicine.quantity} units</b></div></div>)}</div>}
    </section>
    <section className="card form-card">
      <div className="panel-head" style={{padding: 0, marginBottom: 16}}><h3>Upload prescription</h3><span className="pill green">OCR enabled</span></div>
      <label className="upload">
        {scanning ? <LoaderCircle size={30} className="spin" /> : preview ? <FileImage size={30} /> : <Upload size={30} />}
        <h3>{scanning ? "Reading prescription..." : "Drop or choose an image"}</h3><p>JPG, PNG, or WEBP prescription image</p>
        <input accept="image/*" onChange={upload} type="file" />
        {preview && <img className="file-preview" src={preview} alt="Prescription preview" />}
      </label>
      <div className="notice"><AlertTriangle size={16} /> Handwritten prescriptions are difficult for OCR. Always review the extracted text and verify matches manually.</div>
    </section>
  </div>;
}
