"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  CalendarDays,
  FileText,
  Inbox,
  LogOut,
  Activity,
  Menu,
  X,
  Settings,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const sections: { title: string; items: { href: string; label: string; icon: any; badge?: string }[] }[] = [
  {
    title: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Bookings",
    items: [
      { href: "/admin/appointments", label: "Appointments", icon: CalendarDays },
      { href: "/admin/contacts", label: "Messages", icon: Inbox },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/doctors", label: "Doctors", icon: Users },
      { href: "/admin/services", label: "Services", icon: Stethoscope },
      { href: "/admin/blog", label: "Blog Posts", icon: FileText },
    ],
  },
];

export default function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      toast.success("Signed out");
      router.replace("/admin/login");
      router.refresh();
    } catch {
      toast.error("Logout failed");
    }
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 grid h-11 w-11 place-items-center rounded-xl bg-brand text-white shadow-lg"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <aside
        className={`fixed lg:sticky top-0 z-50 h-screen w-72 bg-navy text-white flex flex-col transition-transform shadow-2xl ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Decorative top glow */}
        <div
          aria-hidden
          className="absolute -top-24 -right-24 h-64 w-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(27,189,228,0.25) 0%, transparent 70%)" }}
        />

        {/* Logo */}
        <div className="relative p-5 flex items-center justify-between border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="brand-gradient grid h-11 w-11 place-items-center rounded-xl text-white shadow-lg">
              <Activity className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <div className="font-extrabold text-base">SPMHealth</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-brand font-bold mt-0.5">
                Admin Suite
              </div>
            </div>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="relative flex-1 p-4 space-y-6 overflow-y-auto">
          {sections.map((section) => (
            <div key={section.title}>
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-extrabold px-3 mb-2">
                {section.title}
              </div>
              <div className="space-y-1">
                {section.items.map((it) => {
                  const active =
                    it.href === "/admin"
                      ? pathname === "/admin"
                      : pathname?.startsWith(it.href);
                  return (
                    <Link
                      key={it.href}
                      href={it.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${
                        active
                          ? "bg-brand text-white shadow-lg shadow-brand/30"
                          : "text-white/75 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <it.icon className="h-4 w-4" />
                        {it.label}
                      </span>
                      {it.badge ? (
                        <span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.5 rounded-full font-extrabold">
                          {it.badge}
                        </span>
                      ) : active ? (
                        <ChevronRight className="h-4 w-4" />
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Help card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-6">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-brand text-white mb-3">
              <HelpCircle className="h-4 w-4" />
            </div>
            <div className="text-sm font-extrabold">Need help?</div>
            <p className="text-xs text-white/60 mt-1 leading-relaxed">
              Check the docs or contact our team for assistance.
            </p>
            <a
              href="mailto:support@spmhealth.com"
              className="mt-3 inline-flex text-[11px] font-bold text-brand"
            >
              Get support →
            </a>
          </div>
        </nav>

        {/* Profile + logout */}
        <div className="relative p-4 border-t border-white/10 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5">
            <div className="bg-brand h-9 w-9 grid place-items-center rounded-full text-white font-extrabold text-sm flex-shrink-0">
              {adminName?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="text-xs min-w-0 flex-1">
              <div className="text-white/60">Signed in as</div>
              <div className="font-bold truncate">{adminName}</div>
            </div>
            <Settings className="h-4 w-4 text-white/40 hover:text-white cursor-pointer" />
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-rose-300 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
