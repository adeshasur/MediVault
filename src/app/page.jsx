import Link from "next/link";
import { ArrowRight, BarChart3, Check, ClipboardCheck, ScanLine, Search, ShieldCheck, Sparkles } from "lucide-react";
import Logo from "@/components/Logo";

export default function Home() {
  return <main className="landing">
    <nav className="landing-nav"><Logo /><div className="landing-links"><a href="#features">Features</a><Link href="/scan">Check prescription</Link><Link className="btn primary" href="/login">Staff workspace <ArrowRight size={16} /></Link></div></nav>
    <section className="hero">
      <div>
        <div className="eyebrow">Smart pharmacy inventory</div>
        <h1 className="serif">Find the right medicine, <span>instantly.</span></h1>
        <p>MediVault helps pharmacy teams manage stock and check prescription availability with confidence. Search faster, spot expiry risks, and keep every medicine accounted for.</p>
        <div className="hero-actions"><Link className="btn primary" href="/scan"><ScanLine size={16} /> Check your prescription</Link><Link className="btn secondary" href="/login">Staff workspace <ArrowRight size={16} /></Link></div>
        <div className="trust-row"><span className="trust"><Check size={15} color="#2f8c73" /> Fast stock lookup</span><span className="trust"><Check size={15} color="#2f8c73" /> OCR-assisted checking</span><span className="trust"><Check size={15} color="#2f8c73" /> Pharmacist verification first</span></div>
      </div>
      <div className="hero-visual">
        <div className="hero-orb" />
        <div className="preview">
          <div className="preview-top"><Logo /><span className="pill green">Live inventory</span></div>
          <div className="preview-grid"><div className="mini-card"><span className="muted">Medicines</span><b>1,248</b></div><div className="mini-card"><span className="muted">Available</span><b>94%</b></div><div className="mini-card"><span className="muted">Alerts</span><b>18</b></div></div>
          <div className="scan-card"><div className="eyebrow">Prescription checker</div><h3>Check availability in seconds</h3><p>Upload an image or paste prescription text to find medicines and possible matches.</p><span className="pill green"><Sparkles size={12} /> Smart match ready</span></div>
        </div>
      </div>
    </section>
    <section className="features" id="features"><div className="section-wrap"><div className="section-head"><div className="eyebrow">Built for clarity</div><h2 className="serif">Everything your pharmacy needs to stay prepared.</h2></div><div className="feature-grid">
      <Feature icon={Search} title="Search inventory" text="Find medicines by name, generic name, brand, category, or strength in a few keystrokes." />
      <Feature icon={ClipboardCheck} title="Check prescriptions" text="Compare typed or OCR-extracted prescription text against your current stock." />
      <Feature icon={BarChart3} title="Act on alerts" text="See low-stock and near-expiry medicines before they become urgent problems." />
      <Feature icon={ScanLine} title="OCR-assisted workflow" text="Upload prescription images, review extracted text, then confirm matches manually." />
      <Feature icon={ShieldCheck} title="Verification first" text="Safety reminders keep pharmacy staff in control before any medicine is dispensed." />
      <Feature icon={Sparkles} title="Simple by design" text="A calm, responsive interface keeps the important actions close at hand." />
    </div></div></section>
  </main>;
}

function Feature({ icon: Icon, title, text }) {
  return <article className="feature"><span className="feature-icon"><Icon size={20} /></span><h3>{title}</h3><p>{text}</p></article>;
}
