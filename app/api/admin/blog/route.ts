import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { slugify } from "@/lib/slug";

export async function GET() {
  await connectDB();
  const items = await BlogPost.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  if (!body.title || !body.content) {
    return NextResponse.json({ error: "Title and content required" }, { status: 400 });
  }
  const slug = body.slug || slugify(body.title);
  const doc = await BlogPost.create({ ...body, slug });
  return NextResponse.json({ item: doc }, { status: 201 });
}
