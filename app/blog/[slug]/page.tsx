import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import PageHero from "@/components/PageHero";
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    await connectDB();
    const post = await BlogPost.findOne({ slug }).lean();
    if (post && !Array.isArray(post)) {
      return {
        title: post.title,
        description: post.excerpt || "",
        alternates: { canonical: `/blog/${slug}` },
      };
    }
  } catch {}
  return { title: slug.replace(/-/g, " "), alternates: { canonical: `/blog/${slug}` } };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  let post: {
    title: string;
    content: string;
    excerpt: string;
    category: string;
    author: string;
    createdAt: Date;
  } | null = null;

  try {
    await connectDB();
    const found = await BlogPost.findOne({ slug }).lean();
    if (found && !Array.isArray(found)) {
      post = {
        title: found.title,
        content: found.content,
        excerpt: found.excerpt || "",
        category: found.category,
        author: found.author,
        createdAt: found.createdAt,
      };
    }
  } catch {}

  if (!post) {
    post = {
      title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      excerpt:
        "This is a sample article. Connect MongoDB and publish posts from the admin panel to see real content here.",
      content:
        "This article will appear once you publish posts from the admin panel. Meanwhile, enjoy the design.",
      category: "Health",
      author: "SPMHealth Team",
      createdAt: new Date(),
    };
  }

  return (
    <>
      <PageHero
        title={post.title}
        subtitle={post.excerpt}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.category },
        ]}
      />
      <article className="container-x py-16">
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-8 md:p-12 max-w-3xl mx-auto">
          <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-slate-500 font-bold mb-6 pb-6 border-b border-slate-100">
            <span className="flex items-center gap-1.5 bg-brand text-white px-3 py-1 rounded-full">
              <Tag className="h-3 w-3" /> {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" /> {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span>— {post.author}</span>
          </div>
          <div className="prose prose-slate max-w-none">
            {post.content.split("\n").map((para, i) => (
              <p key={i} className="text-slate-700 leading-relaxed mb-4">
                {para}
              </p>
            ))}
          </div>
          <Link href="/blog" className="btn-dark mt-10">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>
        </div>
      </article>
    </>
  );
}
