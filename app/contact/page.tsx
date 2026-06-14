import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageCircle, Headphones } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach SPMHealth — call us, email us, or visit our centre. We're here for you, 24/7 for emergencies.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get In Touch"
        subtitle="Questions, feedback or emergencies — choose the way that works for you. We respond fast."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* Contact info cards */}
      <section className="container-x -mt-12 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Phone, t: "Call us", a: "+91 99999 99999", href: "tel:+919999999999" },
            { icon: Mail, t: "Email", a: "hello@spmhealth.com", href: "mailto:hello@spmhealth.com" },
            { icon: MapPin, t: "Visit", a: "MG Road, Bengaluru 560001" },
            { icon: Clock, t: "Hours", a: "Mon–Sat · 8AM – 8PM" },
          ].map((c, i) => {
            const Wrapper: "a" | "div" = c.href ? "a" : "div";
            return (
              <Wrapper
                key={i}
                href={c.href}
                className="card-service flex items-start gap-4 hover:border-brand"
              >
                <div className="bg-brand h-12 w-12 grid place-items-center rounded-md text-white flex-shrink-0">
                  <c.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                    {c.t}
                  </div>
                  <div className="font-extrabold text-sm mt-1 text-[color:var(--navy)]">
                    {c.a}
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x grid lg:grid-cols-12 gap-8">
          {/* Form */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-xl p-6 md:p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-brand h-10 w-10 grid place-items-center rounded-md text-white">
                <MessageCircle className="h-5 w-5" />
              </div>
              <h2 className="heading-xl text-2xl md:text-3xl">Send a message</h2>
            </div>
            <div className="section-divider" />
            <p className="text-sm text-slate-600 mb-4">
              Our care team usually responds within a few hours.
            </p>
            <ContactForm />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.5946%2C12.9716%2C77.6146%2C12.9916&layer=mapnik"
                className="w-full h-72 border-0"
                title="Our location"
                loading="lazy"
              />
              <div className="p-5 border-t border-slate-100">
                <div className="font-extrabold text-[color:var(--navy)]">
                  SPMHealth · MG Road Centre
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  2nd Floor, Wellness Tower, MG Road, Bengaluru 560001
                </div>
              </div>
            </div>

            <div className="bg-navy text-white rounded-xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <div className="relative flex items-start gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-brand flex-shrink-0">
                  <Headphones className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-brand font-bold">
                    Emergency 24×7
                  </div>
                  <a
                    href="tel:+919999999999"
                    className="text-2xl font-extrabold mt-1 block text-white"
                  >
                    +91 99999 99999
                  </a>
                  <p className="text-xs text-white/70 mt-2">
                    For life-threatening emergencies, please call or visit our ER directly.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
