"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Activity,
  CalendarCheck,
  ChevronDown,
  Search,
} from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/doctors", label: "Doctors" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* ─── Top contact strip ─── */}
      <div className="topbar hidden md:block">
        <div className="container-x flex items-center justify-between py-2.5">
          <div className="flex items-center gap-6 text-xs">
            <span className="flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-brand/15 text-brand">
                <MapPin className="h-3 w-3" />
              </span>
              <span>Wellness Tower, MG Road, Bengaluru</span>
            </span>
            <span className="hidden lg:flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-brand/15 text-brand">
                <Clock className="h-3 w-3" />
              </span>
              <span>Mon – Sat: 8AM – 9PM</span>
            </span>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <a
              href="mailto:hello@spmhealth.com"
              className="hidden lg:flex items-center gap-2"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-brand/15 text-brand">
                <Mail className="h-3 w-3" />
              </span>
              hello@spmhealth.com
            </a>
            <a href="tel:+919999999999" className="flex items-center gap-2 font-bold">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-brand/15 text-brand">
                <Phone className="h-3 w-3" />
              </span>
              +91 99999 99999
            </a>
            <span className="hidden lg:flex items-center gap-2 pl-3 border-l border-white/15">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="grid h-7 w-7 place-items-center rounded-full bg-white/5 hover:bg-brand transition-colors"
                >
                  <Icon className="h-2.5 w-2.5" />
                </a>
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* ─── Main sticky nav ─── */}
      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          scrolled
            ? "shadow-lg border-b border-transparent"
            : "border-b border-slate-100"
        }`}
      >
        <div className="container-x flex items-center justify-between h-[68px] sm:h-[78px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="relative grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-xl text-white shadow-lg transition-transform group-hover:scale-105 overflow-hidden bg-brand">
              <span className="absolute inset-0 bg-gradient-to-br from-brand to-[color:var(--brand-dark)]" />
              <Activity className="h-5 w-5 sm:h-6 sm:w-6 relative z-10" />
            </span>
            <div className="leading-tight">
              <div className="text-lg sm:text-xl font-extrabold tracking-tight text-[color:var(--navy)]">
                SPM<span className="text-brand">Health</span>
              </div>
              <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-slate-500 mt-0.5">
                Care · Cure · Comfort
              </div>
            </div>
          </Link>

          {/* Desktop nav — pill style */}
          <nav className="hidden lg:flex items-center bg-slate-50 rounded-full p-1 border border-slate-100">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 xl:px-5 py-2 text-[13px] xl:text-sm font-bold uppercase tracking-wider rounded-full transition-all ${
                    active
                      ? "bg-brand text-white shadow-md shadow-brand/30"
                      : "text-[color:var(--navy)] hover:text-brand"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              aria-label="Search"
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-[color:var(--navy)] hover:bg-brand hover:text-white hover:border-brand transition"
            >
              <Search className="h-4 w-4" />
            </button>
            <Link href="/appointment" className="btn-primary">
              <CalendarCheck className="h-4 w-4" /> Appointment
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid h-11 w-11 place-items-center rounded-xl bg-brand text-white shadow-md"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div
            className="lg:hidden border-t border-slate-100 bg-white shadow-xl animate-fadeUp overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 68px)" }}
          >
            <nav className="container-x flex flex-col py-3">
              {navLinks.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-3 py-3.5 text-sm font-bold uppercase tracking-wider border-b border-slate-100 last:border-0 transition-colors ${
                      active
                        ? "text-brand"
                        : "text-[color:var(--navy)] hover:text-brand"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="h-4 w-4 -rotate-90 opacity-50" />
                  </Link>
                );
              })}

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Link
                  href="/appointment"
                  className="btn-primary justify-center"
                >
                  <CalendarCheck className="h-4 w-4" /> Appointment
                </Link>
                <a
                  href="tel:+919999999999"
                  className="btn-dark justify-center"
                >
                  <Phone className="h-4 w-4" /> Call us
                </a>
              </div>

              {/* Mobile socials */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-extrabold">
                  Follow us
                </span>
                <div className="flex items-center gap-2">
                  {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                    (Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        aria-label="social"
                        className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-[color:var(--navy)] hover:bg-brand hover:text-white transition"
                      >
                        <Icon className="h-3 w-3" />
                      </a>
                    )
                  )}
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
