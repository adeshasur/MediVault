"use client";

import { CalendarClock, PackageX, TriangleAlert } from "lucide-react";
import { daysUntil, getStatus } from "@/lib/medicines";
import { useMedicines } from "@/hooks/useMedicines";
import StatusBadge from "./StatusBadge";

export default function Reports({ mode = "all" }) {
  const { medicines } = useMedicines();
  const low = medicines.filter((medicine) => medicine.quantity > 0 && medicine.quantity <= 10);
  const out = medicines.filter((medicine) => medicine.quantity === 0);
  const expiry = medicines.filter((medicine) => daysUntil(medicine.expiry) <= 120).sort((a, b) => daysUntil(a.expiry) - daysUntil(b.expiry));
  const focus = mode === "low" ? low : mode === "expiry" ? expiry : [...low, ...out, ...expiry.filter((item) => !low.includes(item) && !out.includes(item))];

  return <>
    <div className="report-grid">
      <ReportCard icon={TriangleAlert} title="Low stock" value={low.length} text="Medicines at or below the 10-unit reorder threshold." tone="amber" width="38%" />
      <ReportCard icon={PackageX} title="Out of stock" value={out.length} text="Medicines currently unavailable for prescriptions." tone="red" width="16%" />
      <ReportCard icon={CalendarClock} title="Near expiry" value={expiry.length} text="Medicines expiring within the next 120 days." tone="blue" width="62%" />
    </div>
    <section className="card" style={{marginTop: 16}}>
      <div className="panel-head"><h3>Attention required</h3><span className="pill amber">{focus.length} records</span></div>
      <div className="table-wrap"><table><thead><tr><th>Medicine</th><th>Category</th><th>Stock</th><th>Expiry</th><th>Expires in</th><th>Status</th></tr></thead><tbody>
        {focus.map((medicine) => <tr key={medicine.id}><td className="medicine-name"><b>{medicine.name}</b><span>{medicine.generic} · {medicine.strength}</span></td><td>{medicine.category}</td><td>{medicine.quantity} units</td><td>{medicine.expiry}</td><td>{daysUntil(medicine.expiry)} days</td><td><StatusBadge {...getStatus(medicine)} /></td></tr>)}
      </tbody></table>{focus.length === 0 && <div className="empty">No records need attention right now.</div>}</div>
    </section>
  </>;
}

function ReportCard({ icon: Icon, title, value, text, tone, width }) {
  return <div className="card report-card"><span className={`pill ${tone}`}><Icon size={14} /> {value} alerts</span><h3>{title}</h3><p>{text}</p><div className="progress"><span style={{width}} /></div></div>;
}
