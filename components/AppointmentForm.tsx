"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CalendarCheck } from "lucide-react";
import { doctors, services } from "@/lib/siteData";

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

export default function AppointmentForm() {
  const sp = useSearchParams();
  const presetDoctor = sp.get("doctor") || "";
  const presetDept = sp.get("dept") || "";
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    patientName: "",
    email: "",
    phone: "",
    age: "",
    gender: "male",
    department: presetDept,
    doctor: presetDoctor,
    date: "",
    time: "",
    message: "",
  });

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.patientName || !form.email || !form.phone || !form.date || !form.time) {
      toast.error("Please fill all required fields.");
      return;
    }
    setLoading(true);
    try {
      const doctorObj = doctors.find((d) => d.slug === form.doctor);
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: form.patientName,
          email: form.email,
          phone: form.phone,
          age: Number(form.age) || 0,
          gender: form.gender,
          department: form.department,
          doctorName: doctorObj?.name || "",
          date: form.date,
          time: form.time,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not book");
      toast.success("Appointment requested! We'll confirm soon.");
      setForm({
        patientName: "",
        email: "",
        phone: "",
        age: "",
        gender: "male",
        department: "",
        doctor: "",
        date: "",
        time: "",
        message: "",
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 grid sm:grid-cols-2 gap-4">
      <div>
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Full Name *</label>
        <input
          className="input"
          value={form.patientName}
          onChange={(e) => update("patientName", e.target.value)}
          placeholder="Your full name"
          required
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Phone *</label>
        <input
          type="tel"
          className="input"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="+91 xxxxx xxxxx"
          required
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Email *</label>
        <input
          type="email"
          className="input"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@email.com"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Age</label>
          <input
            type="number"
            className="input"
            value={form.age}
            onChange={(e) => update("age", e.target.value)}
            placeholder="28"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Gender</label>
          <select
            className="input"
            value={form.gender}
            onChange={(e) => update("gender", e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Department</label>
        <select
          className="input"
          value={form.department}
          onChange={(e) => update("department", e.target.value)}
        >
          <option value="">Select speciality</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Doctor</label>
        <select
          className="input"
          value={form.doctor}
          onChange={(e) => update("doctor", e.target.value)}
        >
          <option value="">Any available</option>
          {doctors.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name} — {d.specialty}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Date *</label>
        <input
          type="date"
          className="input"
          value={form.date}
          onChange={(e) => update("date", e.target.value)}
          required
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Time *</label>
        <select
          className="input"
          value={form.time}
          onChange={(e) => update("time", e.target.value)}
          required
        >
          <option value="">Select slot</option>
          {timeSlots.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Reason / Symptoms</label>
        <textarea
          className="input min-h-[110px]"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us briefly what's going on..."
        />
      </div>

      <div className="sm:col-span-2 mt-2">
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
          <CalendarCheck className="h-4 w-4" />
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>
        <p className="text-[11px] text-slate-500 mt-3 text-center">
          By booking, you agree to our care policies. We&apos;ll contact you to confirm.
        </p>
      </div>
    </form>
  );
}
