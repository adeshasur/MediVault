import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import Reports from "@/components/Reports";

export default function Expiry() {
  return <AppShell><PageHeader eyebrow="Inventory health" title="Expiry report" description="Review medicines approaching expiry and plan stock handling." /><Reports mode="expiry" /></AppShell>;
}
