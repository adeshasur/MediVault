import { Circle } from "lucide-react";

export default function StatusBadge({ label, tone = "green" }) {
  return <span className={`pill ${tone}`}><Circle size={7} fill="currentColor" />{label}</span>;
}
