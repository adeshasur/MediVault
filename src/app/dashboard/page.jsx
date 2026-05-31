"use client";

import Link from "next/link";
import { ArrowRight, Boxes, ClipboardCheck, PackageCheck, PackageX, ScanLine, TriangleAlert } from "lucide-react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import { getStatus } from "@/lib/medicines";
import { useMedicines } from "@/hooks/useMedicines";

export default function Dashboard() {
  const { medicines, loading, error } = useMedicines();
  const lowStock = medicines.filter((medicine) => medicine.quantity <= 10);
  return <AppShell>
    <PageHeader eyebrow="Sunday, 31 May 2026" title="Good evening, Admin." description="Here is what is happening with your pharmacy inventory today." action={<Link className="btn primary" href="/checker"><ScanLine size={16} /> New prescription check</Link>} />
    <div className="stats">
      <StatCard icon={Boxes} value={loading ? "..." : medicines.length} label="Total medicines" note="Database" />
      <StatCard icon={PackageCheck} value={loading ? "..." : medicines.filter((x) => x.quantity > 0).length} label="Available medicines" note="Healthy" />
      <StatCard icon={TriangleAlert} value={lowStock.length} label="Low-stock alerts" note="Needs action" tone="amber" />
      <StatCard icon={PackageX} value={medicines.filter((x) => x.quantity === 0).length} label="Out of stock" note="Restock" tone="red" />
    </div>
    {error && <div className="notice">{error}</div>}
    <div className="dashboard-grid">
      <section className="card">
        <div className="panel-head"><h3>Inventory movement</h3><span className="pill blue">Last 7 days</span></div>
        <div className="chart">{[48, 65, 56, 82, 70, 91, 76].map((height, index) => <div className="bar-col" key={index}><div className={`bar ${index === 5 ? "active" : ""}`} style={{height}} /><span>{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][index]}</span></div>)}</div>
      </section>
      <section className="card">
        <div className="panel-head"><h3>Quick actions</h3></div>
        <div className="activity">
          <Quick href="/medicines" icon={Boxes} title="Manage inventory" text="Add, find, and update medicine records" />
          <Quick href="/checker" icon={ClipboardCheck} title="Check a prescription" text="Match a customer prescription with stock" />
          <Quick href="/reports" icon={TriangleAlert} title="Review stock alerts" text="See low-stock and expiry warnings" />
        </div>
      </section>
    </div>
    <div className="dashboard-grid">
      <section className="card">
        <div className="panel-head"><h3>Medicines needing attention</h3><Link className="btn ghost" href="/reports">View report <ArrowRight size={14} /></Link></div>
        <div className="table-wrap"><table><thead><tr><th>Medicine</th><th>Stock</th><th>Expiry</th><th>Status</th></tr></thead><tbody>{lowStock.map((medicine) => <tr key={medicine.id}><td className="medicine-name"><b>{medicine.name}</b><span>{medicine.generic} · {medicine.strength}</span></td><td>{medicine.quantity} units</td><td>{medicine.expiry}</td><td><StatusBadge {...getStatus(medicine)} /></td></tr>)}</tbody></table></div>
      </section>
      <section className="card">
        <div className="panel-head"><h3>Recent activity</h3></div>
        <div className="activity">
          <Quick icon={ClipboardCheck} title="Prescription scan completed" text="3 matches found · 12 minutes ago" />
          <Quick icon={Boxes} title="Stock record updated" text="Panadol 500mg · 42 minutes ago" />
          <Quick icon={TriangleAlert} title="Low-stock alert created" text="Azithromycin 500mg · 2 hours ago" />
        </div>
      </section>
    </div>
  </AppShell>;
}

function Quick({ href, icon: Icon, title, text }) {
  const body = <><span className="activity-icon"><Icon size={16} /></span><div><b>{title}</b><span>{text}</span></div></>;
  return href ? <Link className="activity-row" href={href}>{body}</Link> : <div className="activity-row">{body}</div>;
}
