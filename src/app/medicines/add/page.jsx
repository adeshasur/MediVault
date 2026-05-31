import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import MedicineInventory from "@/components/MedicineInventory";

export default function AddMedicine() {
  return <AppShell><PageHeader eyebrow="Stock control" title="Add inventory" description="Create and manage medicine records from the inventory workspace." /><MedicineInventory /></AppShell>;
}
