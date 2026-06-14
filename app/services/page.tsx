import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarCheck, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import { services } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Services & Specialties",
  description:
    "Explore SPMHealth's complete range of medical specialties — cardiology, neurology, paediatrics, orthopedics, dermatology and more.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Department of Medical Health Care"
        subtitle="From everyday wellness to advanced interventions — our specialities work together to deliver coordinated, evidence-based care."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      {/* Service grid */}
      <section className="section-pad">
        <div className="container-x">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`#${s.slug}`}
                className="group block bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy)]/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 grid h-12 w-12 place-items-center rounded-md bg-white text-brand shadow-md group-hover:bg-brand group-hover:text-white transition-colors">
                    <s.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-extrabold text-xl text-[color:var(--navy)] group-hover:text-brand transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {s.short}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed alternating rows */}
      <section className="bg-slate-50 py-16">
        <div className="container-x space-y-20">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className={`grid lg:grid-cols-12 gap-10 items-center scroll-mt-32 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 1024px) 90vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 grid h-14 w-14 place-items-center rounded-md bg-white text-brand shadow-md">
                    <s.icon className="h-7 w-7" />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6">
                <span className="eyebrow">Speciality 0{i + 1}</span>
                <h2 className="heading-xl mt-3 text-2xl md:text-3xl lg:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-3 text-lg font-semibold text-[color:var(--navy)]">
                  {s.short}
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed">{s.description}</p>
                <ul className="mt-6 grid sm:grid-cols-2 gap-2.5">
                  {["Senior consultants", "Latest diagnostics", "Multidisciplinary team", "Day-care & inpatient"].map(
                    (b, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm font-semibold text-[color:var(--navy)]">
                        <CheckCircle2 className="h-5 w-5 text-brand flex-shrink-0" />
                        {b}
                      </li>
                    )
                  )}
                </ul>
                <div className="mt-7 flex gap-3 flex-wrap">
                  <Link href="/appointment" className="btn-primary">
                    <CalendarCheck className="h-4 w-4" /> Book Consultation
                  </Link>
                  <Link href="/doctors" className="btn-dark">
                    Find Doctor <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
