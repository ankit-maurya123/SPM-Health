import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Doctor from "@/models/Doctor";
import { slugify } from "@/lib/slug";

export async function GET() {
  await connectDB();
  const items = await Doctor.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  if (!body.name || !body.specialty) {
    return NextResponse.json({ error: "Name and specialty required" }, { status: 400 });
  }
  const slug = body.slug || slugify(body.name);
  const doc = await Doctor.create({ ...body, slug });
  return NextResponse.json({ item: doc }, { status: 201 });
}
