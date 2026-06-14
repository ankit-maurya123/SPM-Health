import bcrypt from "bcryptjs";
import { connectDB } from "./mongodb";
import Admin from "@/models/Admin";

export async function ensureAdminSeeded() {
  await connectDB();
  const email = (process.env.ADMIN_EMAIL || "admin@spmhealth.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "Admin@12345";
  const existing = await Admin.findOne({ email });
  if (!existing) {
    const hash = await bcrypt.hash(password, 10);
    await Admin.create({
      name: "SPMHealth Admin",
      email,
      password: hash,
      role: "super",
    });
  }
}
