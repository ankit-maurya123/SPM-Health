import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  CheckCircle2,
  GraduationCap,
  Star,
  Stethoscope,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import { doctors } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Our Doctors",
  description:
    "Meet SPMHealth's board-certified, senior specialists. Find your doctor and book an appointment online.",
  alternates: { canonical: "/doctors" },
};

export default function DoctorsPage() {
  const specialties = Array.from(new Set(doctors.map((d) => d.specialty)));

  return (
    <>
      <PageHero
        title="Meet Our Specialists"
        subtitle="Senior, board-certified specialists trained at leading institutions — committed to listening first and treating thoughtfully."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Doctors" }]}
      />

      {/* Specialty filter chips */}
      <section className="container-x -mt-8 relative z-10">
        <div className="bg-white rounded-full shadow-lg border border-slate-100 p-2 flex items-center gap-1 overflow-x-auto">
          <span className="px-5 py-2.5 bg-brand text-white text-sm font-bold rounded-full whitespace-nowrap uppercase tracking-wider">
            All Specialists
          </span>
          {specialties.map((spec) => (
            <a
              key={spec}
              href={`#${spec.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-5 py-2.5 text-sm font-bold text-[color:var(--navy)] hover:bg-slate-50 rounded-full whitespace-nowrap uppercase tracking-wider"
            >
              {spec}
            </a>
          ))}
        </div>
      </section>

      {/* Doctor cards grid */}
      <section className="section-pad">
        <div className="container-x">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-7">
            {doctors.map((d, i) => (
              <article
                key={d.slug}
                id={d.slug}
                className="doctor-card group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 hover:border-transparent transition-all duration-500"
              >
                <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-slate-100">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy)]/95 via-[color:var(--navy)]/40 sm:via-[color:var(--navy)]/15 to-transparent" />
                  <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/25 transition-all duration-500" />

                  {/* Rating */}
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/95 backdrop-blur px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-extrabold shadow">
                    <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400" />
                    4.9
                    <span className="hidden sm:inline text-slate-400 font-bold ml-1">· 1.2k</span>
                  </div>

                  {/* Experience — desktop only */}
                  <div className="hidden sm:flex absolute top-4 right-4 bg-brand text-white px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow">
                    {d.experience}+ yrs
                  </div>

                  {/* Watermark — desktop only */}
                  <span className="hidden sm:inline absolute top-1/3 right-4 text-[80px] font-extrabold text-white/15 leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 pb-3 sm:pb-6 text-white">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-brand font-extrabold truncate">
                      {d.specialty}
                    </div>
                    <h2 className="mt-0.5 sm:mt-1 text-sm sm:text-xl font-extrabold leading-tight truncate">
                      {d.name}
                    </h2>
                    <p className="hidden sm:flex mt-1 text-xs text-white/70 items-center gap-1.5 truncate">
                      <GraduationCap className="h-3 w-3 text-brand flex-shrink-0" />
                      {d.qualification}
                    </p>
                  </div>

                  {/* Hover quick actions — desktop only */}
                  <div className="hidden sm:flex absolute inset-x-5 bottom-5 items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto">
                    <Link
                      href={`/appointment?doctor=${d.slug}`}
                      className="flex-1 bg-brand hover:bg-white hover:text-brand text-white text-xs font-extrabold uppercase tracking-wider px-4 py-3 rounded-md inline-flex items-center justify-center gap-2 transition"
                    >
                      <CalendarCheck className="h-4 w-4" /> Book Now
                    </Link>
                    <Link
                      href="/contact"
                      aria-label="Contact"
                      className="grid h-11 w-11 place-items-center rounded-md bg-white text-[color:var(--navy)] hover:bg-[color:var(--navy)] hover:text-white transition"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Stats — 2-col mobile, 3-col sm+ */}
                <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-slate-100">
                  <div className="text-center py-2.5 sm:py-3.5">
                    <div className="text-sm sm:text-base font-extrabold text-brand">
                      ₹{d.fees}
                    </div>
                    <div className="text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-500 mt-0.5">
                      Consult
                    </div>
                  </div>
                  <div className="hidden sm:block text-center py-3.5">
                    <div className="text-base font-extrabold text-brand">
                      {d.days.length}d
                    </div>
                    <div className="text-[9px] uppercase tracking-widest text-slate-500 mt-0.5">
                      / week
                    </div>
                  </div>
                  <div className="text-center py-2.5 sm:py-3.5">
                    <div className="text-sm sm:text-base font-extrabold text-brand">
                      {d.experience}+
                    </div>
                    <div className="text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-500 mt-0.5">
                      <span className="sm:hidden">Yrs Exp</span>
                      <span className="hidden sm:inline">Years</span>
                    </div>
                  </div>
                </div>

                {/* Days strip — desktop only */}
                <div className="hidden sm:flex items-center justify-center gap-1 px-5 pb-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                    const active = d.days.some((dd) => dd === day);
                    return (
                      <span
                        key={day}
                        className={`text-[9px] h-7 w-7 grid place-items-center rounded font-bold ${
                          active
                            ? "bg-brand text-white shadow"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {day[0]}
                      </span>
                    );
                  })}
                </div>

                {/* Mobile-only Book button */}
                <Link
                  href={`/appointment?doctor=${d.slug}`}
                  className="sm:hidden flex items-center justify-center gap-1.5 bg-brand text-white text-[10px] font-extrabold uppercase tracking-wider py-2.5 border-t border-slate-100"
                >
                  <CalendarCheck className="h-3 w-3" /> Book Now
                </Link>

                <span className="absolute bottom-0 left-0 right-0 h-1 bg-brand origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="container-x pb-20">
        <div className="grid md:grid-cols-5 rounded-xl overflow-hidden shadow-lg">
          <div className="md:col-span-3 bg-navy p-10 flex items-center gap-5">
            <Stethoscope className="h-12 w-12 text-brand flex-shrink-0" />
            <div>
              <h3 className="text-white text-xl md:text-2xl font-extrabold leading-snug">
                Not sure which specialist you need?
              </h3>
              <p className="text-white/70 text-sm mt-2">
                Our patient navigators will match you with the right doctor — at zero cost.
              </p>
              <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-xs text-white/85 font-semibold">
                {["Free recommendation", "Trained navigators", "Within 2 hours", "Confidential"].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:col-span-2 bg-brand p-10 flex items-center justify-center md:justify-end">
            <Link
              href="/contact"
              className="bg-white text-[color:var(--navy)] px-7 py-3.5 rounded-md font-extrabold uppercase tracking-wider text-sm inline-flex items-center gap-2 hover:bg-slate-100 transition"
            >
              Talk to us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
