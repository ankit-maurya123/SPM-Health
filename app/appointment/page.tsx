import type { Metadata } from "next";
import { Suspense } from "react";
import { CalendarCheck, ShieldCheck, Clock, BadgeIndianRupee, Headphones } from "lucide-react";
import PageHero from "@/components/PageHero";
import AppointmentForm from "@/components/AppointmentForm";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book your consultation at SPMHealth in under 60 seconds. Choose your doctor, date and time slot.",
  alternates: { canonical: "/appointment" },
};

export default function AppointmentPage() {
  return (
    <>
      <PageHero
        title="Make Appointment"
        subtitle="Choose your doctor, pick a date and time — we'll confirm your slot instantly."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Appointment" }]}
      />

      <section className="section-pad">
        <div className="container-x grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-xl p-6 md:p-10 shadow-sm">
            <h2 className="heading-xl text-2xl md:text-3xl">Patient Details</h2>
            <div className="section-divider" />
            <p className="text-sm text-slate-600 mt-2">
              Please share a few details so we can confirm your appointment.
            </p>
            <Suspense fallback={null}>
              <AppointmentForm />
            </Suspense>
          </div>

          <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-28">
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
              <h3 className="font-extrabold text-[color:var(--navy)]">Why book online?</h3>
              <div className="section-divider" />
              <ul className="mt-4 space-y-5 text-sm text-slate-700">
                {[
                  { icon: Clock, t: "Instant confirmation", d: "We get back to you within minutes." },
                  { icon: ShieldCheck, t: "Verified specialists", d: "All consultants are board-certified." },
                  { icon: BadgeIndianRupee, t: "Transparent pricing", d: "See fees upfront, no surprises." },
                  { icon: CalendarCheck, t: "Easy reschedule", d: "Change slots anytime, hassle-free." },
                ].map((it, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="bg-brand h-10 w-10 grid place-items-center rounded-md text-white flex-shrink-0">
                      <it.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-extrabold text-sm text-[color:var(--navy)]">{it.t}</div>
                      <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">{it.d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-navy text-white rounded-xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <div className="relative flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-brand flex-shrink-0">
                  <Headphones className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-brand font-bold">
                    Emergency 24×7
                  </div>
                  <a
                    href="tel:+919999999999"
                    className="text-xl font-extrabold mt-1 block text-white"
                  >
                    +91 99999 99999
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
