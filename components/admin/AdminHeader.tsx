"use client";

import Link from "next/link";
import { Search, Bell, ExternalLink, Sparkles } from "lucide-react";

export default function AdminHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-10 py-4 lg:py-5 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4">
        {/* Left — title */}
        <div className="pl-14 lg:pl-0 min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brand font-extrabold mb-1">
            <Sparkles className="h-3 w-3" />
            Admin Panel
          </div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-[color:var(--navy)] truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right — search + actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search — desktop only */}
          <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 w-56 lg:w-72">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search anything…"
              className="flex-1 bg-transparent outline-none text-sm placeholder-slate-400"
            />
            <kbd className="hidden lg:inline text-[10px] font-mono bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-500">
              ⌘K
            </kbd>
          </div>

          {/* Notifications */}
          <button
            aria-label="Notifications"
            className="relative grid h-10 w-10 place-items-center rounded-lg bg-slate-50 border border-slate-200 text-[color:var(--navy)] hover:bg-brand hover:text-white hover:border-brand transition"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {/* View live site */}
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[color:var(--navy)] hover:bg-brand hover:text-white hover:border-brand transition text-sm font-bold"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Site
          </Link>

          {actions && (
            <div className="flex items-center gap-2">{actions}</div>
          )}
        </div>
      </div>
    </header>
  );
}
