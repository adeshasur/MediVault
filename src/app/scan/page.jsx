import Link from "next/link";
import { LogIn } from "lucide-react";
import CustomerScanner from "@/components/CustomerScanner";
import Logo from "@/components/Logo";

export default function ScanPage() {
  return <main className="public-scan">
    <nav className="scan-nav"><Logo /><Link className="btn secondary" href="/login"><LogIn size={15} /> Staff login</Link></nav>
    <div className="scan-wrap">
      <section className="scan-hero"><div className="eyebrow">Customer prescription check</div><h1 className="serif">Check medicine availability.</h1><p>Scan your prescription from your phone, confirm the detected medicine names, and see whether the pharmacy currently has them in stock.</p></section>
      <div className="scan-steps"><div className="scan-step"><span>1</span> Upload prescription</div><div className="scan-step"><span>2</span> Verify detected text</div><div className="scan-step"><span>3</span> View stock and total</div></div>
      <CustomerScanner />
    </div>
  </main>;
}
