import AppShell from "@/components/AppShell";
import MedicineInventory from "@/components/MedicineInventory";
import PageHeader from "@/components/PageHeader";

export default function Medicines() {
  return <AppShell><PageHeader eyebrow="Stock control" title="Medicine inventory" description="Search, review, and maintain every medicine record in one place." /><MedicineInventory /></AppShell>;
}
