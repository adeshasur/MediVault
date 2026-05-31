import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";

export default function Login() {
  return <main className="auth">
    <section className="auth-visual"><Logo /><div className="auth-copy"><div className="eyebrow">Pharmacy workspace</div><h1 className="serif">Stay ahead of every prescription.</h1><p>Inventory clarity and prescription availability checks in one calm, reliable workspace.</p><div className="trust-row"><span className="trust"><Check size={15} /> Inventory insights</span><span className="trust"><Check size={15} /> Smart matching</span></div></div><span className="muted">MediVault · Pharmacy inventory simplified</span></section>
    <section className="auth-form-wrap"><div className="auth-form"><div className="eyebrow">Welcome back</div><h2 className="serif">Sign in to MediVault.</h2><p className="page-subtitle">Use your pharmacy staff account to continue.</p><form>
      <div className="field"><label>Email address</label><input className="input" defaultValue="admin@medivault.local" type="email" /></div>
      <div className="field"><label>Password</label><input className="input" defaultValue="password" type="password" /></div>
      <Link className="btn primary" href="/dashboard">Open workspace <ArrowRight size={16} /></Link>
    </form><div className="auth-foot"><ShieldCheck size={14} /> Demo access is enabled. Connect Supabase Auth for production accounts.</div></div></section>
  </main>;
}
