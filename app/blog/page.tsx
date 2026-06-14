import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Tag, Clock, TrendingUp, Search } from "lucide-react";
import PageHero from "@/components/PageHero";
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export const metadata: Metadata = {
  title: "Health Blog & Insights",
  description:
    "Trusted health advice, wellness tips and clinical insights from SPMHealth's medical team.",
  alternates: { canonical: "/blog" },
};

export const dynamic = "force-dynamic";

const blogImages = [
  "/img/blog/blog-01-770x500.jpg",
  "/img/blog/blog-02-770x500.jpg",
  "/img/blog/blog-03-770x500.jpg",
];

const fallback = [
  {
    title: "5 simple habits for a stronger heart",
    excerpt: "Small, daily changes that compound into meaningful cardiovascular wellbeing.",
    category: "Cardiology",
    author: "Dr. Arjun Mehra",
    slug: "5-habits-stronger-heart",
    date: new Date(),
    readMin: 6,
  },
  {
    title: "Understanding your child's growth chart",
    excerpt: "A friendly primer for parents on what those percentile lines really mean.",
    category: "Pediatrics",
    author: "Dr. Ishaan Rao",
    slug: "child-growth-chart",
    date: new Date(),
    readMin: 4,
  },
  {
    title: "Migraines: when to see a neurologist",
    excerpt: "Red flags, common myths, and modern treatment options that actually work.",
    category: "Neurology",
    author: "Dr. Neha Kapoor",
    slug: "migraine-when-to-see-doctor",
    date: new Date(),
    readMin: 5,
  },
  {
    title: "Skin in your 30s: a dermatologist's guide",
    excerpt: "The science-backed routine that doesn't need 12 steps.",
    category: "Dermatology",
    author: "Dr. Sanya Iyer",
    slug: "skin-care-30s",
    date: new Date(),
    readMin: 7,
  },
  {
    title: "Knee pain? Try these before considering surgery",
    excerpt: "Evidence-based, non-invasive options that often work — and when they don't.",
    category: "Orthopedics",
    author: "Dr. Vikram Sharma",
    slug: "knee-pain-non-surgical",
    date: new Date(),
    readMin: 8,
  },
  {
    title: "PCOS and your everyday choices",
    excerpt: "A gentle framework to take charge of PCOS without overwhelm.",
    category: "Gynecology",
    author: "Dr. Priya Nair",
    slug: "pcos-everyday-choices",
    date: new Date(),
    readMin: 6,
  },
];

async function getPosts() {
  try {
    await connectDB();
    const posts = await BlogPost.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();
    if (posts.length === 0) return fallback;
    return posts.map((p, i) => ({
      title: p.title,
      excerpt: p.excerpt || "",
      category: p.category,
      author: p.author,
      slug: p.slug,
      date: p.createdAt,
      readMin: 4 + (i % 5),
    }));
  } catch {
    return fallback;
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  const sideList = posts.slice(6, 12);
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <>
      <PageHero
        title="Stories, Tips & Latest News"
        subtitle="Curated by our medical team — practical, evidence-based, and free from jargon."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      {/* Search + category strip */}
      <section className="container-x -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-3 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="flex items-center gap-2 flex-1 bg-slate-50 rounded-md px-4 py-2.5">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles, symptoms, conditions…"
              className="flex-1 bg-transparent outline-none text-sm placeholder-slate-400"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto px-1">
            <span className="px-4 py-2 bg-brand text-white text-xs font-bold uppercase tracking-wider rounded-md whitespace-nowrap">
              All
            </span>
            {categories.map((c) => (
              <span
                key={c}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[color:var(--navy)] bg-slate-50 hover:bg-brand hover:text-white rounded-md whitespace-nowrap cursor-pointer transition"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          {/* Main grid */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-extrabold tracking-tight text-[color:var(--navy)] flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-brand" /> Latest articles
              </h3>
              <span className="text-xs text-slate-500">{posts.length} articles</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {posts.slice(0, 6).map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={blogImages[i % blogImages.length]}
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
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {new Date(p.date).toLocaleDateString()}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {p.readMin} min
                      </span>
                    </div>
                    <h4 className="mt-2 text-lg font-extrabold leading-snug text-[color:var(--navy)] group-hover:text-brand transition">
                      {p.title}
                    </h4>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">{p.excerpt}</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand">
                      Read More <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 self-start">
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[color:var(--navy)] font-extrabold mb-4 relative pb-2">
                Browse by Category
                <span className="absolute left-0 bottom-0 h-0.5 w-10 bg-brand" />
              </h4>
              <ul className="space-y-1">
                {categories.map((c) => {
                  const count = posts.filter((p) => p.category === c).length;
                  return (
                    <li
                      key={c}
                      className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0"
                    >
                      <span className="flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)] hover:text-brand cursor-pointer transition">
                        <span className="h-2 w-2 rounded-full bg-brand" />
                        {c}
                      </span>
                      <span className="text-xs text-slate-500 font-bold bg-slate-50 px-2 py-0.5 rounded">{count}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[color:var(--navy)] font-extrabold mb-4 relative pb-2">
                Popular this week
                <span className="absolute left-0 bottom-0 h-0.5 w-10 bg-brand" />
              </h4>
              <ol className="space-y-4">
                {sideList.map((p, i) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="flex gap-3 group">
                      <span className="text-2xl font-extrabold text-brand flex-shrink-0 w-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-[color:var(--navy)] leading-snug group-hover:text-brand transition line-clamp-2">
                          {p.title}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                          <Tag className="h-2.5 w-2.5" /> {p.category}
                          <span>·</span>
                          <Clock className="h-2.5 w-2.5" /> {p.readMin} min
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-navy rounded-xl p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <div className="relative">
                <h4 className="text-lg font-extrabold">Health Weekly</h4>
                <p className="text-white/70 text-sm mt-2">
                  One thoughtful article in your inbox, every Sunday.
                </p>
                <form action="#" className="mt-4 space-y-2">
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-md text-white placeholder-white/50 text-sm px-4 py-2.5 outline-none focus:border-brand"
                  />
                  <button type="submit" className="btn-primary w-full justify-center">
                    Subscribe <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
