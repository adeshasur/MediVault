"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";
import { signIn } from "@/lib/auth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault();
    const { error: signInError } = await signIn(email.trim(), password);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.replace("/dashboard");
  }
  return <main className="auth">
    <section className="auth-visual"><Logo /><div className="auth-copy"><div className="eyebrow">Pharmacy workspace</div><h1 className="serif">Stay ahead of every prescription.</h1><p>Inventory clarity and prescription availability checks in one calm, reliable workspace.</p><div className="trust-row"><span className="trust"><Check size={15} /> Inventory insights</span><span className="trust"><Check size={15} /> Smart matching</span></div></div><span className="muted">MediVault · Pharmacy inventory simplified</span></section>
    <section className="auth-form-wrap"><div className="auth-form"><div className="eyebrow">Staff access</div><h2 className="serif">Sign in to MediVault.</h2><p className="page-subtitle">Enter your pharmacy staff email and password.</p><form onSubmit={submit}>
      <div className="field"><label>Email address</label><input autoComplete="username" className="input" onChange={(event) => setEmail(event.target.value)} type="email" value={email} /></div>
      <div className="field"><label>Password</label><input autoComplete="current-password" className="input" onChange={(event) => setPassword(event.target.value)} type="password" value={password} /></div>
      {error && <p className="login-error">{error}</p>}
      <button className="btn primary" type="submit">Open workspace <ArrowRight size={16} /></button>
    </form><div className="auth-foot"><ShieldCheck size={14} /> Authorized pharmacy staff only.</div></div></section>
  </main>;
}
