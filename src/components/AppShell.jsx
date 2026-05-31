"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, Boxes, ClipboardCheck, FileWarning, LayoutDashboard, LogOut, Menu, Search, Settings, ShieldCheck } from "lucide-react";
import Logo from "./Logo";
import { getStaffUser, signOut } from "@/lib/auth";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/medicines", label: "Medicine inventory", icon: Boxes },
  { href: "/checker", label: "Prescription checker", icon: ClipboardCheck },
  { href: "/reports", label: "Reports & alerts", icon: FileWarning },
  { href: "/settings", label: "Settings", icon: Settings }
];

export default function AppShell({ children }) {
  const path = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!getStaffUser()) {
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [router]);
  function logout() {
    signOut();
    router.replace("/login");
  }
  if (!ready) return <div className="auth-loading">Checking staff access...</div>;
  return (
    <div className="shell">
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <Logo />
        <div className="nav-group-title">Workspace</div>
        {nav.map(({ href, label, icon: Icon }) => (
          <Link className={`side-link ${path.startsWith(href) ? "active" : ""}`} href={href} key={href} onClick={() => setMenuOpen(false)}><Icon size={17} />{label}</Link>
        ))}
        <div className="nav-group-title">Account</div>
        <Link className="side-link" href="/"><ShieldCheck size={17} />Safety notice</Link>
        <button className="side-link side-button" onClick={logout}><LogOut size={17} />Log out</button>
        <div className="sidebar-foot">
          <div className="profile"><span className="avatar">AD</span><div><b>Admin</b><span>Pharmacy administrator</span></div></div>
        </div>
      </aside>
      <main className="workspace">
        <header className="topbar">
          <div className="searchbox"><button className="icon-btn mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={18} /></button><Search size={17} /><input placeholder="Search inventory..." /></div>
          <div className="top-actions"><button className="icon-btn"><Bell size={17} /></button><span className="pill green">System online</span></div>
        </header>
        <div className="content">{children}</div>
      </main>
      {menuOpen && <button aria-label="Close navigation" className="nav-backdrop" onClick={() => setMenuOpen(false)} />}
    </div>
  );
}
