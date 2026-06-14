import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.patientName || !body.email || !body.phone || !body.date || !body.time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    await connectDB();
    const appt = await Appointment.create({
      patientName: body.patientName,
      email: body.email,
      phone: body.phone,
      age: body.age || 0,
      gender: body.gender || "other",
      doctorName: body.doctorName || "",
      department: body.department || "",
      date: body.date,
      time: body.time,
      message: body.message || "",
    });
    return NextResponse.json({ ok: true, id: appt._id }, { status: 201 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
