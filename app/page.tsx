import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck,
  Star,
  CheckCircle2,
  PlayCircle,
  Headphones,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import {
  services,
  doctors,
  stats,
  testimonials,
  features,
  faqs,
  gallery,
  blogPosts,
  clients,
} from "@/lib/siteData";
import FaqAccordion from "@/components/FaqAccordion";

export default function Home() {
  return (
    <>
      {/* ───── HERO ───── */}
      <section className="hero-banner relative overflow-hidden">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <Image
            src="/img/gallery/project-04-770x770.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Layered overlays for legibility + brand tint */}
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--navy)]/95 via-[color:var(--navy)]/80 to-[color:var(--navy)]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color:var(--navy)]/30" />
          <div className="absolute inset-0 dot-pattern opacity-15" />
        </div>

        <div className="container-x relative z-10 pt-16 pb-28 sm:pt-20 sm:pb-32 lg:pt-24 lg:pb-40">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* LEFT — copy */}
            <div className="lg:col-span-7 text-center lg:text-left animate-fadeUp">
              <span className="inline-flex items-center gap-2 text-brand uppercase tracking-[0.22em] font-extrabold text-xs sm:text-sm">
                <span className="h-px w-8 bg-brand" />
                Welcome to SPMHealth
                <span className="h-px w-8 bg-brand lg:hidden" />
              </span>
              <h1 className="heading-xl !text-white mt-5 text-[34px] leading-[1.05] sm:text-5xl lg:text-[68px]">
                Changing health care
                <br className="hidden sm:block" />{" "}
                <span className="text-brand">for good.</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-white/75 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                A family of hospitals for your family. Trusted doctors, modern
                diagnostics and a calming patient experience — book a
                consultation in less than 60&nbsp;seconds.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link href="/appointment" className="btn-primary">
                  <CalendarCheck className="h-4 w-4" /> Discover More
                </Link>
                <a
                  href="#tour"
                  className="inline-flex items-center gap-3 text-white font-bold uppercase tracking-wider text-sm group"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-brand shadow-lg group-hover:bg-brand group-hover:text-white transition">
                    <PlayCircle className="h-5 w-5" />
                  </span>
                  Watch Tour
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4">
                {[
                  { icon: Star, label: "4.9 patient rating" },
                  { icon: ShieldCheck, label: "NABH accredited" },
                  { icon: CheckCircle2, label: "Cashless insurance" },
                ].map((it, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-white/85"
                  >
                    <it.icon className="h-4 w-4 text-brand" />
                    <span className="font-semibold">{it.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — doctor portrait */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="relative w-full max-w-md mx-auto aspect-[4/5]">
                {/* Outer rotating dashed ring */}
                <svg
                  className="absolute inset-0 w-full h-full text-brand/40 animate-spin-slow"
                  viewBox="0 0 200 200"
                  aria-hidden
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="98"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="3 6"
                  />
                </svg>

                {/* Outer glow */}
                <div className="absolute inset-6 rounded-full bg-brand/30 blur-3xl" />

                {/* Solid teal disc behind doctor */}
                <div className="absolute inset-x-4 bottom-0 top-12 rounded-[40%_40%_45%_45%/55%_55%_45%_45%] bg-gradient-to-b from-brand to-[color:var(--brand-dark)] shadow-2xl" />

                {/* Decorative dots cluster (top right) */}
                <div className="absolute top-6 right-0 grid grid-cols-5 gap-1.5 opacity-60">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <span key={i} className="block h-1 w-1 rounded-full bg-white/60" />
                  ))}
                </div>

                {/* Decorative plus marks */}
                <span className="absolute top-0 left-0 text-brand/60 text-3xl font-light select-none">+</span>
                <span className="absolute bottom-1/3 -left-2 text-white/40 text-2xl font-light select-none">+</span>

                {/* Doctor image */}
                <Image
                  src="/img/hero/doc.png"
                  alt="Dr. Priya - SPMHealth specialist"
                  fill
                  sizes="(max-width: 1024px) 80vw, 460px"
                  className="object-contain object-bottom drop-shadow-[0_30px_30px_rgba(8,24,57,0.35)] relative z-10"
                  priority
                />

                {/* Floating Experience badge */}
                <div className="absolute top-6 -left-4 bg-white rounded-xl shadow-2xl px-4 py-3 flex items-center gap-3 animate-float border border-slate-100 z-20">
                  <div className="bg-brand text-white h-10 w-10 grid place-items-center rounded-lg font-extrabold text-base">
                    20+
                  </div>
                  <div className="text-xs">
                    <div className="font-extrabold text-[color:var(--navy)]">Years</div>
                    <div className="text-slate-500">Experience</div>
                  </div>
                </div>

                {/* Floating Rating chip */}
                <div
                  className="absolute top-1/3 -right-4 bg-white rounded-xl shadow-2xl p-3 flex items-center gap-2 animate-float border border-slate-100 z-20"
                  style={{ animationDelay: "1.2s" }}
                >
                  <div className="bg-brand grid h-9 w-9 place-items-center rounded-full text-white">
                    <Star className="h-4 w-4 fill-white" />
                  </div>
                  <div className="text-xs">
                    <div className="font-extrabold text-[color:var(--navy)]">4.9 / 5</div>
                    <div className="text-slate-500">85K+ reviews</div>
                  </div>
                </div>

                {/* Floating Appointment chip */}
                <div
                  className="absolute -bottom-2 -left-2 bg-white rounded-xl shadow-2xl p-3 w-56 animate-float border border-slate-100 z-20"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-brand/10 text-brand grid h-9 w-9 place-items-center rounded-lg">
                      <CalendarCheck className="h-4 w-4" />
                    </div>
                    <div className="text-xs flex-1 min-w-0">
                      <div className="text-[10px] uppercase tracking-widest text-slate-500">
                        Today's Slot
                      </div>
                      <div className="font-extrabold text-[color:var(--navy)] truncate">
                        Dr. Neha · 11:30 AM
                      </div>
                    </div>
                  </div>
                  <div className="mt-2.5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full w-3/4 bg-brand" />
                  </div>
                </div>

                {/* Floating Trust chip */}
                <div
                  className="absolute bottom-1/4 -right-6 bg-navy text-white rounded-xl shadow-2xl px-3 py-2.5 animate-float z-20"
                  style={{ animationDelay: "1.8s" }}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-brand" />
                    <div className="text-[11px] font-extrabold">NABH<br/>Accredited</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ───── EMERGENCY + APPOINTMENT STRIP ───── */}
      <section className="container-x -mt-16 sm:-mt-20 lg:-mt-24 relative z-20">
        <div className="grid lg:grid-cols-5 rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
          {/* Emergency card */}
          <div className="lg:col-span-2 bg-navy p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute inset-0 dot-pattern opacity-20" />
            <div className="relative flex items-start gap-4 sm:gap-5">
              <div className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full bg-brand text-white flex-shrink-0 shadow-lg">
                <Headphones className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand font-extrabold">
                  Emergency Cases
                </div>
                <a
                  href="tel:+919999999999"
                  className="block text-2xl sm:text-3xl font-extrabold mt-2 text-white tracking-tight break-words"
                >
                  1-800-123-4560
                </a>
                <p className="text-sm text-white/70 mt-2 leading-relaxed">
                  24/7 round-the-clock ER with rapid triage &amp; ambulance dispatch.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 mt-4 text-brand font-bold text-xs uppercase tracking-widest hover:gap-2.5 transition-all"
                >
                  Contact us <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Appointment form */}
          <div className="lg:col-span-3 bg-white p-6 sm:p-8 lg:p-10">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[color:var(--navy)]">
              Book Appointment Today!
            </h3>
            <div className="section-divider" />
            <form action="/appointment" className="grid sm:grid-cols-2 gap-3 mt-4">
              <select className="input" defaultValue="">
                <option value="" disabled>Department</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.title}</option>
                ))}
              </select>
              <select className="input" defaultValue="">
                <option value="" disabled>Doctor</option>
                {doctors.map((d) => (
                  <option key={d.slug} value={d.slug}>{d.name}</option>
                ))}
              </select>
              <input className="input" placeholder="Your Name" />
              <input className="input" placeholder="Phone Number" />
              <button
                type="submit"
                className="btn-primary justify-center sm:col-span-2 mt-1"
              >
                <CalendarCheck className="h-4 w-4" /> Book Appointment
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ───── ABOUT + CIRCULAR STATS ───── */}
      <section className="pt-20 pb-0 lg:pt-24">
        <div className="container-x grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left — intro */}
          <div className="lg:col-span-6">
            <span className="eyebrow">Introduction</span>
            <h2 className="heading-xl mt-4 text-3xl sm:text-4xl lg:text-5xl">
              A great place of medical{" "}
              <span className="text-brand">hospital center</span> &amp; health
              care.
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed max-w-xl">
              We blend evidence-based medicine with thoughtful design and
              compassionate service — because healthcare should heal more
              than the body. From board-certified specialists to transparent
              pricing and dedicated patient navigators, every detail is built
              around you.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-3 max-w-lg">
              {[
                "Standards of Treatment",
                "Quality of Care",
                "Infection Prevention",
                "Patient Experience",
                "Well Communication",
                "Modern Diagnostics",
              ].map((p, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <CheckCircle2
                    className="h-5 w-5 text-brand flex-shrink-0"
                    strokeWidth={2.5}
                  />
                  <span className="text-sm font-bold text-[color:var(--navy)]">
                    {p}
                  </span>
                </li>
              ))}
            </ul>

            {/* CEO / Founder card */}
            <div className="mt-8 flex items-center gap-4">
              <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-brand flex-shrink-0">
                <Image
                  src="/img/hero/m2.png"
                  alt="Richard Muldoone"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-extrabold text-[color:var(--navy)] leading-tight">
                  Richard Muldoone
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-brand font-extrabold mt-1">
                  CEO &amp; Founder
                </div>
              </div>
              <Link href="/about" className="btn-primary ml-auto">
                About Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right — circular percentage stats */}
          <div className="lg:col-span-6">
            <div className="space-y-5">
              {[
                {
                  pct: 67,
                  title: "Qualified Doctors",
                  desc: "Medical experts present in our clinic, ready 24/7.",
                },
                {
                  pct: 84,
                  title: "Allergy Medicine",
                  desc: "Healthcare and effective medicine for every condition.",
                },
                {
                  pct: 78,
                  title: "Emergency Services",
                  desc: "Total succeed emergency cases handled in clinic.",
                },
              ].map((s, i) => {
                const r = 44;
                const c = 2 * Math.PI * r;
                const offset = c * (1 - s.pct / 100);
                return (
                  <div
                    key={i}
                    className="flex items-center gap-5 bg-white rounded-xl p-5 sm:p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:border-brand transition-all group"
                  >
                    <div className="relative h-20 w-20 flex-shrink-0">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full -rotate-90"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r={r}
                          stroke="#e7ecf3"
                          strokeWidth="6"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r={r}
                          stroke="#1bbde4"
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray={c}
                          strokeDashoffset={offset}
                          strokeLinecap="round"
                          className="transition-all duration-700"
                        />
                      </svg>
                      <div className="absolute inset-0 grid place-items-center text-lg font-extrabold text-[color:var(--navy)]">
                        {s.pct}%
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="font-extrabold text-[color:var(--navy)] group-hover:text-brand transition-colors">
                        {s.title}
                      </div>
                      <div className="text-sm text-slate-600 mt-1 leading-relaxed">
                        {s.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Doctor team photo — flows into the next services section without a gap */}
        <div className="relative mt-12 lg:mt-16 -mb-px">
          <div className="container-x relative">
            <div className="relative h-48 sm:h-56 lg:h-72 max-w-4xl mx-auto">
              <Image
                src="/img/hero/img-06.png"
                alt="Our doctors team"
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───── SERVICES ───── */}
      <section className="section-pad bg-[color:var(--soft-sky)] dot-pattern">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow">Choose your services</span>
            <h2 className="heading-xl mt-3 text-3xl sm:text-4xl lg:text-5xl">
              Department of medical health care
            </h2>
            <p className="mt-4 text-slate-600">
              {services.length} specialty departments under one roof — coordinated, ethical, evidence-led.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-7">
            {services.slice(0, 8).map((s, i) => (
              <Link
                key={s.slug}
                href={`/services#${s.slug}`}
                className="service-card group relative block bg-white rounded-2xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy)]/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/30 transition-all duration-500" />

                  {/* Watermark number */}
                  <span className="absolute top-3 right-4 text-5xl font-extrabold text-white/30 leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Curved bottom dip */}
                  <svg
                    className="absolute bottom-0 left-0 right-0 w-full text-white"
                    viewBox="0 0 100 8"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path d="M0 8 Q 50 0 100 8 L 100 8 L 0 8 Z" fill="currentColor" />
                  </svg>
                </div>

                {/* Floating icon — sits exactly on the image/content boundary */}
                <div className="relative h-0">
                  <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-xl text-brand group-hover:bg-brand group-hover:text-white group-hover:rotate-[10deg] group-hover:scale-110 transition-all duration-500 z-10 border border-slate-100">
                    <s.icon className="h-6 w-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="px-3 sm:px-5 pt-10 sm:pt-12 pb-5 sm:pb-6 text-center">
                  <h3 className="font-extrabold text-sm sm:text-lg text-[color:var(--navy)] group-hover:text-brand transition-colors leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-sm text-slate-600 leading-relaxed line-clamp-2 sm:min-h-[42px]">
                    {s.short}
                  </p>

                  <div className="mt-3 sm:mt-5 flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-brand">
                    <span className="hidden sm:inline-block h-px w-6 bg-brand opacity-40 group-hover:w-10 group-hover:opacity-100 transition-all" />
                    Read More
                    <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Bottom brand bar */}
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-brand origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-dark">
              All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───── WHY US — full-bleed split ───── */}
      <section className="bg-navy relative overflow-hidden">
        <div className="grid lg:grid-cols-2 items-stretch relative">
          {/* LEFT — full-bleed image */}
          <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[640px]">
            <Image
              src="/img/services/service-01-770x770.jpg"
              alt="Our medical team at work"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--navy)]/0 via-[color:var(--navy)]/0 to-[color:var(--navy)]/40 lg:to-[color:var(--navy)]/10" />
          </div>

          {/* RIGHT — navy content panel */}
          <div className="bg-navy relative px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-24 xl:pl-24">
            <div className="absolute inset-0 dot-pattern opacity-15" />
            <div className="relative max-w-xl">
              <span className="eyebrow !text-brand">What we do</span>
              <h2 className="heading-xl !text-white mt-4 text-3xl sm:text-4xl lg:text-5xl leading-[1.1]">
                A great place for medico hospital center &amp; health care.
              </h2>
              <p className="mt-5 text-white/70 leading-relaxed">
                We are committed to delivering world-class medical care with
                compassion. Our experienced specialists, modern infrastructure
                and patient-first approach combine to deliver outcomes you can
                trust.
              </p>
              <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-4">
                {[
                  "Standards of Treatment",
                  "Quality of Care",
                  "Infection Prevention",
                  "Patient Experience",
                  "Well Communication",
                  "Quality of Care Services",
                ].map((p, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-white text-sm font-bold"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-white flex-shrink-0 shadow-lg shadow-brand/30">
                      <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Floating play button — centered at the boundary on desktop, on image on mobile */}
          <button
            aria-label="Play video"
            className="absolute z-20 left-1/2 -translate-x-1/2 top-[300px] sm:top-[400px] lg:top-1/2 lg:-translate-y-1/2 grid h-16 w-16 sm:h-20 sm:w-20 place-items-center rounded-full bg-brand text-white shadow-2xl animate-float ring-8 ring-[color:var(--navy)]/40 hover:scale-110 transition-transform"
          >
            <PlayCircle className="h-8 w-8 sm:h-10 sm:w-10" />
          </button>
        </div>
      </section>

      {/* ───── FEATURES STRIP ───── */}
      <section className="container-x section-pad">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="card-service flex items-start gap-4"
            >
              <div className="bg-brand h-12 w-12 grid place-items-center rounded-md text-white flex-shrink-0">
                <f.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="font-extrabold text-base text-[color:var(--navy)]">
                  {f.title}
                </div>
                <div className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {f.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── DOCTORS ───── */}
      <section className="section-pad bg-slate-50">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow">Our Team</span>
            <h2 className="heading-xl mt-3 text-3xl sm:text-4xl lg:text-5xl">
              Meet the doctors patients love
            </h2>
            <p className="mt-4 text-slate-600">
              Hand-picked specialists, trained at top institutions in India and abroad.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-7">
            {doctors.slice(0, 6).map((d, i) => (
              <article
                key={d.slug}
                className="doctor-card group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 hover:border-transparent transition-all duration-500"
              >
                {/* Portrait with overlays */}
                <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-slate-100">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy)]/95 via-[color:var(--navy)]/40 sm:via-[color:var(--navy)]/10 to-transparent" />
                  <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/25 transition-all duration-500" />

                  {/* Top-left rating — compact on mobile */}
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/95 backdrop-blur px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-extrabold shadow">
                    <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400" />
                    4.9
                  </div>

                  {/* Top-right experience — hidden on mobile */}
                  <div className="hidden sm:flex absolute top-4 right-4 bg-brand text-white px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow">
                    {d.experience}+ yrs
                  </div>

                  {/* Bottom content overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 pb-3 sm:pb-6 text-white">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-brand font-extrabold truncate">
                      {d.specialty}
                    </div>
                    <h3 className="mt-0.5 sm:mt-1 text-sm sm:text-xl font-extrabold leading-tight truncate">
                      {d.name}
                    </h3>
                    <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-white/70 truncate hidden sm:block">
                      {d.qualification}
                    </p>
                  </div>

                  {/* Hover quick actions */}
                  <div className="hidden sm:flex absolute inset-x-5 bottom-5 items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto">
                    <Link
                      href={`/appointment?doctor=${d.slug}`}
                      className="flex-1 bg-brand hover:bg-white hover:text-brand text-white text-xs font-extrabold uppercase tracking-wider px-4 py-3 rounded-md inline-flex items-center justify-center gap-2 transition"
                    >
                      <CalendarCheck className="h-4 w-4" /> Book
                    </Link>
                    <Link
                      href={`/doctors#${d.slug}`}
                      aria-label="View profile"
                      className="grid h-11 w-11 place-items-center rounded-md bg-white text-[color:var(--navy)] hover:bg-[color:var(--navy)] hover:text-white transition"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Footer strip — 2-col on mobile, 3-col on sm+ */}
                <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-slate-100">
                  <div className="text-center py-2.5 sm:py-3">
                    <div className="text-sm sm:text-base font-extrabold text-brand">
                      ₹{d.fees}
                    </div>
                    <div className="text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-500 mt-0.5">
                      Consult
                    </div>
                  </div>
                  <div className="hidden sm:block text-center py-3">
                    <div className="text-base font-extrabold text-brand">
                      {d.days.length}d
                    </div>
                    <div className="text-[9px] uppercase tracking-widest text-slate-500 mt-0.5">
                      / week
                    </div>
                  </div>
                  <div className="text-center py-2.5 sm:py-3">
                    <div className="text-sm sm:text-base font-extrabold text-brand">
                      {d.experience}+
                    </div>
                    <div className="text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-500 mt-0.5">
                      <span className="sm:hidden">Yrs Exp</span>
                      <span className="hidden sm:inline">Years</span>
                    </div>
                  </div>
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

      {/* ───── CTA SPLIT STRIP ───── */}
      <section className="container-x py-12">
        <div className="grid md:grid-cols-5 rounded-xl overflow-hidden shadow-lg">
          <div className="md:col-span-3 bg-navy p-8 md:p-10 flex items-center gap-5">
            <HeartPulse className="h-12 w-12 text-brand flex-shrink-0" />
            <p className="text-white text-lg md:text-xl font-bold leading-snug">
              Looking for professional &amp; trusted medical healthcare? Don't
              hesitate to contact us.
            </p>
          </div>
          <div className="md:col-span-2 bg-brand p-8 md:p-10 flex items-center justify-center md:justify-end">
            <Link
              href="/appointment"
              className="bg-white text-[color:var(--navy)] px-7 py-3.5 rounded-md font-extrabold uppercase tracking-wider text-sm inline-flex items-center gap-2 hover:bg-slate-100 transition"
            >
              Make Appointment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───── TESTIMONIALS (dark) ───── */}
      <section className="section-pad bg-navy relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="container-x relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow !text-brand">Patient Voices</span>
            <h2 className="heading-xl !text-white mt-3 text-3xl sm:text-4xl lg:text-5xl">
              What people say about medical health care
            </h2>
            <div className="mt-4 flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-300 text-amber-300" />
              ))}
              <span className="text-white/80 ml-2 text-sm">
                4.9 / 5 from 12,400+ reviews
              </span>
            </div>
          </div>
          {/* Mobile: horizontal snap slider | Desktop: 3-col grid */}
          <div className="md:grid md:grid-cols-3 md:gap-6 flex md:overflow-visible overflow-x-auto snap-x snap-mandatory gap-4 -mx-5 px-5 md:mx-0 md:px-0 pb-4 md:pb-0 scrollbar-hide">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="snap-center flex-shrink-0 w-[85%] sm:w-[60%] md:w-auto bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-300 text-amber-300" />
                  ))}
                </div>
                <blockquote className="text-sm text-white/85 leading-relaxed">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 pt-4 border-t border-white/10">
                  <span className="bg-brand h-10 w-10 grid place-items-center rounded-full text-white text-sm font-bold">
                    {t.image}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-[11px] text-white/60">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Slider dots — mobile only */}
          <div className="md:hidden flex items-center justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full bg-white/30 transition-all ${
                  i === 0 ? "w-8 bg-brand" : "w-1.5"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ───── GALLERY ───── */}
      <section className="section-pad">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow">Our Facility</span>
            <h2 className="heading-xl mt-3 text-3xl sm:text-4xl lg:text-5xl">
              Take a look inside our hospital
            </h2>
            <p className="mt-4 text-slate-600">
              A glimpse into the spaces, technology and teams that make SPMHealth feel like a home.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.slice(0, 8).map((g) => (
              <div
                key={g.src}
                className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
              >
                <Image
                  src={g.src}
                  alt={g.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[color:var(--navy)]/0 group-hover:bg-[color:var(--navy)]/70 transition-colors flex items-end p-4">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-[10px] uppercase tracking-widest text-brand font-bold">
                      {g.category}
                    </div>
                    <div className="font-extrabold text-sm mt-1">{g.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="section-pad pt-0">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="eyebrow">General Query</span>
            <h2 className="heading-xl mt-3 text-3xl sm:text-4xl lg:text-5xl">
              Get every single update here med info.
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed">
              Can't find what you're looking for?{" "}
              <Link href="/contact" className="text-brand font-bold underline-offset-4 hover:underline">
                Talk to our care team
              </Link>{" "}
              — we're here to help.
            </p>
            <Link href="/contact" className="btn-dark mt-7">
              Show All FAQ <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ───── BLOG PREVIEW ───── */}
      <section className="section-pad bg-slate-50">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="max-w-xl">
              <span className="eyebrow">Keeping You Well</span>
              <h2 className="heading-xl mt-3 text-3xl sm:text-4xl lg:text-5xl">
                Stories, tips &amp; latest news
              </h2>
            </div>
            <Link href="/blog" className="btn-dark">
              View All Posts <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-brand text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {p.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-slate-500 mb-2">{p.date} · {p.author}</div>
                  <h3 className="font-extrabold text-lg text-[color:var(--navy)] group-hover:text-brand transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {p.excerpt}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand">
                    Read Post <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CLIENTS / BRANDS ───── */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="container-x">
          <div className="text-center text-xs uppercase tracking-[0.25em] text-slate-500 font-bold mb-8">
            Trusted by leading partners and insurers
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {clients.map((c, i) => (
              <div
                key={i}
                className="relative h-12 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all"
              >
                <Image src={c} alt={`Client ${i + 1}`} fill className="object-contain" sizes="160px" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
