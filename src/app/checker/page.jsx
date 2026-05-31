import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import PrescriptionChecker from "@/components/PrescriptionChecker";

export default function Checker() {
  return <AppShell><PageHeader eyebrow="Smart scan" title="Prescription checker" description="Type prescription details or upload an image, then confirm medicine availability against your inventory." /><PrescriptionChecker /></AppShell>;
}
