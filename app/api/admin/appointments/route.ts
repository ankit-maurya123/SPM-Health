import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

export async function GET() {
  await connectDB();
  const items = await Appointment.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}
