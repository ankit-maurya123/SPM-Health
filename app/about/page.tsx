import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Target,
  HeartHandshake,
  Sparkles,
  Users,
  Clock,
  PlayCircle,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import { stats } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SPMHealth — our mission, values, leadership, and the people building a more humane healthcare experience.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About SPMHealth"
        subtitle="A new chapter in compassionate care — SPMHealth was founded on a simple belief: every patient deserves clinical excellence delivered with kindness."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Mission & story split */}
      <section className="section-pad">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/img/gallery/project-01-770x770.jpg"
                alt="Our team at SPMHealth"
                fill
                sizes="(max-width: 1024px) 90vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy)]/60 via-transparent to-transparent" />
              <button
                aria-label="Play story"
                className="absolute inset-0 grid place-items-center"
              >
                <span className="grid h-20 w-20 place-items-center rounded-full bg-brand text-white shadow-2xl animate-float">
                  <PlayCircle className="h-10 w-10" />
                </span>
              </button>
              <div className="absolute -bottom-6 -right-6 bg-brand text-white p-6 rounded-xl shadow-2xl">
                <div className="text-4xl font-extrabold">20+</div>
                <div className="text-xs uppercase tracking-widest mt-1">Years of Trust</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <span className="eyebrow">Our Story</span>
            <h2 className="heading-xl mt-3 text-3xl md:text-4xl lg:text-5xl">
              Born from a quiet promise:
              <br />
              <span className="text-brand">people before paperwork.</span>
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed">
              SPMHealth began in 2005 with a small clinic and a big idea — that
              healthcare could be both clinically excellent and refreshingly
              human. Two decades later, we operate a network of multi-specialty
              centres serving thousands of families each month.
            </p>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {[
                { icon: Target, title: "Mission" },
                { icon: HeartHandshake, title: "Values" },
                { icon: Sparkles, title: "Vision" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="card-service flex flex-col items-center text-center !p-4"
                >
                  <div className="bg-brand h-12 w-12 grid place-items-center rounded-md text-white">
                    <m.icon className="h-6 w-6" />
                  </div>
                  <div className="font-extrabold text-sm mt-3 text-[color:var(--navy)]">
                    {m.title}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <Link href="/doctors" className="btn-primary">
                Meet Doctors <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-dark">
                Visit Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats banner — navy */}
      <section className="bg-navy py-16 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="container-x relative grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-5xl font-extrabold text-brand">{s.value}</div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/70 mt-2 font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="section-pad">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow">Our Pillars</span>
            <h2 className="heading-xl mt-3 text-3xl sm:text-4xl lg:text-5xl">
              What makes SPMHealth different
            </h2>
          </div>
          <div className="space-y-16">
            {[
              {
                icon: Users,
                title: "People-led, patient-first",
                text: "Every protocol, every layout, every appointment slot is designed around what makes patients feel safe, informed and respected.",
                image: "/img/gallery/project-02-770x770.jpg",
              },
              {
                icon: Clock,
                title: "Time is part of the treatment",
                text: "We have engineered our scheduling so consultations actually happen on time. We respect your day as much as your diagnosis.",
                image: "/img/gallery/project-05-770x770.jpg",
              },
              {
                icon: Sparkles,
                title: "Modern medicine, calm design",
                text: "We pair the latest in clinical technology with calming, beautifully-designed environments — because how care feels matters.",
                image: "/img/gallery/project-07-770x770.jpg",
              },
            ].map((p, i) => (
              <div
                key={i}
                className={`grid lg:grid-cols-12 gap-10 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 1024px) 90vw, 500px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <div className="grid h-14 w-14 place-items-center rounded-md bg-brand text-white">
                    <p.icon className="h-7 w-7" />
                  </div>
                  <h3 className="heading-xl mt-5 text-2xl md:text-3xl lg:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-slate-600 leading-relaxed">{p.text}</p>
                  <ul className="mt-6 grid sm:grid-cols-2 gap-3 max-w-md">
                    {[
                      "Trained, certified care teams",
                      "Honest, transparent quotes",
                      "Followups built into the journey",
                      "Always reachable, 24×7",
                    ].map((b, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-sm font-semibold text-[color:var(--navy)]"
                      >
                        <CheckCircle2 className="h-5 w-5 text-brand flex-shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
