import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export default function PageHero({
  title,
  subtitle,
  breadcrumb,
}: {
  title: string;
  subtitle?: string;
  breadcrumb: { label: string; href?: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      <div
        aria-hidden
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(27,189,228,0.35) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="absolute -left-24 -bottom-24 h-80 w-80 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(27,189,228,0.18) 0%, transparent 70%)" }}
      />
      <div className="container-x relative py-16 md:py-24 text-center">
        <h1 className="heading-xl !text-white text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl mx-auto text-white/75 leading-relaxed">
            {subtitle}
          </p>
        )}
        <nav className="mt-6 flex items-center justify-center gap-2 text-sm">
          <Link href="/" className="text-white/70 hover:text-brand flex items-center gap-1.5 font-semibold">
            <Home className="h-3.5 w-3.5" /> Home
          </Link>
          {breadcrumb.slice(1).map((b, i) => (
            <span key={i} className="flex items-center gap-2">
              <ChevronRight className="h-3.5 w-3.5 text-white/40" />
              {b.href ? (
                <Link href={b.href} className="text-white/70 hover:text-brand font-semibold">
                  {b.label}
                </Link>
              ) : (
                <span className="text-brand font-bold">{b.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
