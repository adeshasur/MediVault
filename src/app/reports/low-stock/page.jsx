import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import Reports from "@/components/Reports";

export default function LowStock() {
  return <AppShell><PageHeader eyebrow="Inventory health" title="Low-stock report" description="Review medicine records at or below the configured reorder threshold." /><Reports mode="low" /></AppShell>;
}
