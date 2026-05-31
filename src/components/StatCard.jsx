export default function StatCard({ icon: Icon, value, label, note, tone = "green" }) {
  return <div className="card stat-card"><div className="stat-top"><span className="stat-icon"><Icon size={18} /></span><span className={`pill ${tone}`}>{note}</span></div><h3>{value}</h3><p>{label}</p></div>;
}
