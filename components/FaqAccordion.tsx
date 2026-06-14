"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = { q: string; a: string };

export default function FaqAccordion({ items }: { items: readonly FaqItem[] | FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`bg-white border border-slate-100 rounded-lg overflow-hidden transition-all ${
              isOpen ? "shadow-md border-brand" : ""
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left"
            >
              <span className="font-extrabold text-sm sm:text-base text-[color:var(--navy)] flex items-center gap-3">
                <span className={`text-brand font-extrabold tracking-widest text-xs ${isOpen ? "" : "opacity-60"}`}>
                  {String(i + 1).padStart(2, "0")}.
                </span>
                {it.q}
              </span>
              <ChevronDown
                className={`h-4 w-4 flex-shrink-0 transition-transform ${
                  isOpen ? "rotate-180 text-brand" : "text-slate-400"
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">
                  {it.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
