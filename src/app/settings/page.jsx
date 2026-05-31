import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";

export default function Settings() {
  return <AppShell><PageHeader eyebrow="Workspace preferences" title="Pharmacy settings" description="Keep the pharmacy profile and inventory alert rules up to date." />
    <section className="card form-card" style={{maxWidth: 820}}>
      <div className="panel-head" style={{padding: 0, marginBottom: 18}}><h3>Pharmacy profile</h3><span className="pill green">Demo settings</span></div>
      <div className="form-grid">
        <Field label="Pharmacy name" value="MediCare Pharmacy" />
        <Field label="Contact number" value="+94 11 234 5678" />
        <Field label="Address" value="42 Galle Road, Colombo 03" wide />
        <Field label="Low-stock threshold" value="10" type="number" />
        <Field label="Near-expiry alert days" value="120" type="number" />
      </div>
      <div className="form-actions"><button className="btn primary">Save settings</button></div>
    </section>
  </AppShell>;
}

function Field({ label, wide, ...props }) { return <div className={`field ${wide ? "wide" : ""}`}><label>{label}</label><input className="input" {...props} readOnly /></div>; }
