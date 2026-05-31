import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import Reports from "@/components/Reports";

export default function ReportsPage() {
  return <AppShell><PageHeader eyebrow="Inventory health" title="Reports & alerts" description="Review stock risks and expiry warnings before they interrupt service." /><Reports /></AppShell>;
}
