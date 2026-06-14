"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Activity,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 bg-navy text-white overflow-hidden">
      {/* ─── Background image with heavy blur ─── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/gallery/project-04-770x770.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover scale-110 blur-2xl opacity-30"
          aria-hidden
        />
        {/* Navy gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--navy)]/95 via-[color:var(--navy)]/90 to-[color:var(--navy)]" />
        {/* Dot texture */}
        <div className="absolute inset-0 dot-pattern opacity-15" />
        {/* Brand glow accents */}
        <div
          aria-hidden
          className="absolute -right-32 top-32 h-96 w-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(27,189,228,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -left-24 bottom-0 h-72 w-72 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(27,189,228,0.18) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ─── Main footer content ─── */}
      <div className="container-x relative z-10 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="brand-gradient grid h-12 w-12 place-items-center rounded-md text-white shadow-lg">
                <Activity className="h-5 w-5" />
              </span>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                SPM<span className="text-brand">Health</span>
              </span>
            </Link>
            <p className="mt-5 text-white/70 leading-relaxed text-sm max-w-md">
              A modern healthcare destination committed to compassionate care,
              expert diagnostics, and patient-first treatment journeys —
              everything you need under one roof.
            </p>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {["NABH", "ISO 9001", "JCI Ready"].map((b) => (
                <span
                  key={b}
                  className="text-[10px] font-extrabold uppercase tracking-widest bg-white/10 border border-white/15 text-white/85 px-3 py-1.5 rounded-full"
                >
                  ✓ {b}
                </span>
              ))}
            </div>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-2">
              {[
                { icon: FaFacebookF, href: "#", label: "Facebook" },
                { icon: FaXTwitter, href: "#", label: "Twitter" },
                { icon: FaInstagram, href: "#", label: "Instagram" },
                { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-md bg-white/5 border border-white/10 hover:bg-brand hover:border-brand text-white transition-all hover:-translate-y-0.5"
                >
                  <s.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-[0.2em] mb-6 relative pb-3">
              Our Services
              <span className="absolute left-0 bottom-0 h-0.5 w-12 bg-brand" />
            </h4>
            <ul className="space-y-3 text-white/70 text-sm">
              {[
                { l: "Cardiology", h: "/services#cardiology" },
                { l: "Neurology", h: "/services#neurology" },
                { l: "Pediatrics", h: "/services#pediatrics" },
                { l: "Orthopedics", h: "/services#orthopedics" },
                { l: "Diagnostics", h: "/services#diagnostics" },
                { l: "All Services", h: "/services" },
              ].map((it) => (
                <li key={it.l}>
                  <Link
                    href={it.h}
                    className="inline-flex items-center gap-2 hover:text-brand transition-colors group"
                  >
                    <ChevronRight className="h-3 w-3 text-brand transition-transform group-hover:translate-x-0.5" />
                    {it.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening hours */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-[0.2em] mb-6 relative pb-3">
              Opening Hours
              <span className="absolute left-0 bottom-0 h-0.5 w-12 bg-brand" />
            </h4>
            <ul className="text-white/70 text-sm space-y-2.5">
              {[
                { d: "Mon – Tue", t: "8:00 – 21:00" },
                { d: "Wed – Thu", t: "8:00 – 21:00" },
                { d: "Fri – Sat", t: "9:00 – 19:00" },
                { d: "Sunday", t: "Emergency Only" },
              ].map((r) => (
                <li
                  key={r.d}
                  className="flex items-center justify-between border-b border-white/10 pb-2"
                >
                  <span className="font-bold text-white/85 flex items-center gap-2 text-xs">
                    <Clock className="h-3 w-3 text-brand" />
                    {r.d}
                  </span>
                  <span className="text-xs font-semibold">{r.t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach us + newsletter */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-[0.2em] mb-6 relative pb-3">
              Reach Us
              <span className="absolute left-0 bottom-0 h-0.5 w-12 bg-brand" />
            </h4>
            <ul className="space-y-3 text-white/70 text-sm mb-6">
              <li className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-brand mt-0.5 flex-shrink-0" />
                <span>Wellness Tower, MG Road, Bengaluru 560001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-brand flex-shrink-0" />
                <a href="tel:+919999999999" className="hover:text-brand">
                  +91 99999 99999
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-brand flex-shrink-0" />
                <a
                  href="mailto:hello@spmhealth.com"
                  className="hover:text-brand truncate"
                >
                  hello@spmhealth.com
                </a>
              </li>
            </ul>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="text-[10px] uppercase tracking-[0.2em] text-brand font-bold">
                Newsletter
              </div>
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-md text-white placeholder-white/40 text-sm px-3 py-2.5 outline-none focus:border-brand"
              />
              <button
                type="submit"
                className="btn-primary w-full justify-center !py-2.5"
              >
                Subscribe <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container-x py-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-white/50 text-xs">
          <p>
            © {year}{" "}
            <span className="text-brand font-bold">SPMHealth</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-brand">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-brand">
              Terms
            </Link>
            <Link href="/admin/login" className="hover:text-brand">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
