import {
  CalendarDays,
  Users,
  Stethoscope,
  FileText,
  Inbox,
  TrendingUp,
  Clock,
  ArrowRight,
  PlusCircle,
  CalendarCheck,
  AlertCircle,
  CheckCircle2,
  BadgeIndianRupee,
  Activity as ActivityIcon,
} from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import Service from "@/models/Service";
import BlogPost from "@/models/BlogPost";
import Contact from "@/models/Contact";
import AdminHeader from "@/components/admin/AdminHeader";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    await connectDB();
    const [
      appts,
      doctors,
      services,
      posts,
      contacts,
      recentAppts,
      unread,
      pendingAppts,
      confirmedAppts,
      todayAppts,
      recentContacts,
    ] = await Promise.all([
      Appointment.countDocuments({}),
      Doctor.countDocuments({}),
      Service.countDocuments({}),
      BlogPost.countDocuments({}),
      Contact.countDocuments({}),
      Appointment.find({}).sort({ createdAt: -1 }).limit(6).lean(),
      Contact.countDocuments({ read: false }),
      Appointment.countDocuments({ status: "pending" }),
      Appointment.countDocuments({ status: "confirmed" }),
      Appointment.countDocuments({
        date: new Date().toISOString().slice(0, 10),
      }),
      Contact.find({}).sort({ createdAt: -1 }).limit(4).lean(),
    ]);
    return {
      appts,
      doctors,
      services,
      posts,
      contacts,
      recentAppts,
      unread,
      pendingAppts,
      confirmedAppts,
      todayAppts,
      recentContacts,
    };
  } catch {
    return {
      appts: 0,
      doctors: 0,
      services: 0,
      posts: 0,
      contacts: 0,
      recentAppts: [],
      unread: 0,
      pendingAppts: 0,
      confirmedAppts: 0,
      todayAppts: 0,
      recentContacts: [],
    };
  }
}

const statusStyle: Record<string, string> = {
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  completed: "bg-slate-100 text-slate-700 border-slate-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
};

export default async function AdminDashboard() {
  const s = await getStats();

  const headlineCards = [
    {
      label: "Total Appointments",
      value: s.appts,
      icon: CalendarDays,
      tint: "bg-cyan-50 text-cyan-600 border-cyan-100",
      trend: "+12%",
      href: "/admin/appointments",
    },
    {
      label: "Active Doctors",
      value: s.doctors,
      icon: Users,
      tint: "bg-violet-50 text-violet-600 border-violet-100",
      trend: "+3",
      href: "/admin/doctors",
    },
    {
      label: "Services Offered",
      value: s.services,
      icon: Stethoscope,
      tint: "bg-rose-50 text-rose-600 border-rose-100",
      trend: "9",
      href: "/admin/services",
    },
    {
      label: "Published Posts",
      value: s.posts,
      icon: FileText,
      tint: "bg-amber-50 text-amber-600 border-amber-100",
      trend: "Live",
      href: "/admin/blog",
    },
    {
      label: "Messages",
      value: s.contacts,
      icon: Inbox,
      tint: "bg-emerald-50 text-emerald-600 border-emerald-100",
      trend: s.unread > 0 ? `${s.unread} new` : "—",
      href: "/admin/contacts",
    },
  ];

  const todayPct = s.appts > 0 ? Math.min(100, Math.round((s.todayAppts / s.appts) * 100)) : 0;
  const confirmedPct = s.appts > 0 ? Math.round((s.confirmedAppts / s.appts) * 100) : 0;
  const pendingPct = s.appts > 0 ? Math.round((s.pendingAppts / s.appts) * 100) : 0;

  return (
    <>
      <AdminHeader
        title="Dashboard"
        subtitle="Welcome back — here's what's happening today"
      />
      <div className="p-4 sm:p-6 lg:p-10 space-y-6">
        {/* Welcome banner with quick stats */}
        <div className="bg-navy text-white rounded-2xl p-5 sm:p-7 relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(27,189,228,0.25) 0%, transparent 70%)",
            }}
          />
          <div className="relative grid sm:grid-cols-2 gap-6 items-center">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-brand font-extrabold">
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 leading-tight">
                Good day! You have{" "}
                <span className="text-brand">{s.pendingAppts}</span> pending
                appointment{s.pendingAppts === 1 ? "" : "s"}.
              </h2>
              <p className="text-white/65 text-sm mt-2 max-w-xl">
                {s.unread > 0
                  ? `${s.unread} unread message${s.unread === 1 ? "" : "s"} need your attention.`
                  : "All caught up. Nice work!"}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/admin/appointments"
                  className="btn-primary !py-2.5"
                >
                  Review appointments <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/admin/doctors"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-white/10 border border-white/15 hover:bg-white/15 text-white font-bold uppercase text-xs tracking-wider"
                >
                  <PlusCircle className="h-4 w-4" /> Add doctor
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Today", val: s.todayAppts, icon: CalendarCheck },
                { label: "Pending", val: s.pendingAppts, icon: AlertCircle },
                { label: "Confirmed", val: s.confirmedAppts, icon: CheckCircle2 },
              ].map((q) => (
                <div
                  key={q.label}
                  className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-center"
                >
                  <q.icon className="h-5 w-5 text-brand mx-auto" />
                  <div className="text-2xl font-extrabold mt-2">{q.val}</div>
                  <div className="text-[9px] uppercase tracking-widest text-white/60 mt-1 font-bold">
                    {q.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Headline KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {headlineCards.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="bg-white rounded-xl p-4 sm:p-5 hover:-translate-y-1 transition-all shadow-sm hover:shadow-lg border border-slate-200 group"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`h-10 w-10 grid place-items-center rounded-lg border ${c.tint}`}
                >
                  <c.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand bg-brand/10 px-2 py-1 rounded">
                  {c.trend}
                </span>
              </div>
              <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-[color:var(--navy)]">
                {c.value}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-semibold">
                {c.label}
              </div>
            </Link>
          ))}
        </div>

        {/* Two-column lower section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent appointments */}
          <section className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-extrabold text-[color:var(--navy)] flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand" /> Recent Appointments
              </h2>
              <Link
                href="/admin/appointments"
                className="text-xs text-brand font-bold uppercase tracking-wider hover:gap-2 inline-flex items-center gap-1"
              >
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            {s.recentAppts.length === 0 ? (
              <div className="text-center py-12">
                <CalendarDays className="h-10 w-10 text-slate-300 mx-auto" />
                <div className="text-sm text-slate-500 mt-3">
                  No appointments yet.
                </div>
                <Link
                  href="/appointment"
                  target="_blank"
                  className="mt-3 inline-flex text-xs font-bold text-brand"
                >
                  Try the public form →
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-5 px-5">
                <table className="w-full text-sm min-w-[600px]">
                  <thead className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-100">
                    <tr className="text-left">
                      <th className="py-3 font-extrabold">Patient</th>
                      <th className="py-3 font-extrabold">Doctor / Dept</th>
                      <th className="py-3 font-extrabold">Schedule</th>
                      <th className="py-3 font-extrabold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.recentAppts.map((a) => (
                      <tr
                        key={String(a._id)}
                        className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50"
                      >
                        <td className="py-3 font-bold text-[color:var(--navy)]">
                          <div className="flex items-center gap-2.5">
                            <span className="bg-brand/10 text-brand h-8 w-8 grid place-items-center rounded-full font-extrabold text-xs">
                              {a.patientName?.[0]?.toUpperCase() || "?"}
                            </span>
                            {a.patientName}
                          </div>
                        </td>
                        <td className="py-3 text-slate-600">
                          {a.doctorName || a.department || "—"}
                        </td>
                        <td className="py-3 text-slate-600 text-xs">
                          <div className="font-bold text-[color:var(--navy)]">
                            {a.date}
                          </div>
                          <div>{a.time}</div>
                        </td>
                        <td className="py-3">
                          <span
                            className={`text-[10px] px-2.5 py-1 rounded-full font-extrabold uppercase tracking-widest border ${
                              statusStyle[a.status] || statusStyle.pending
                            }`}
                          >
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Right column — quick stats + recent messages */}
          <section className="space-y-6">
            {/* Health chart */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200">
              <h2 className="font-extrabold text-[color:var(--navy)] flex items-center gap-2 mb-5">
                <TrendingUp className="h-4 w-4 text-brand" /> Booking Health
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Today", val: s.todayAppts, pct: todayPct, color: "bg-brand" },
                  { label: "Confirmed", val: s.confirmedAppts, pct: confirmedPct, color: "bg-emerald-500" },
                  { label: "Pending", val: s.pendingAppts, pct: pendingPct, color: "bg-amber-500" },
                ].map((r) => (
                  <div key={r.label}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-[color:var(--navy)]">
                        {r.label}
                      </span>
                      <span className="text-slate-500 font-semibold">
                        {r.val}{" "}
                        <span className="text-slate-400">· {r.pct}%</span>
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full ${r.color} transition-all`}
                        style={{ width: `${r.pct || 2}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent messages */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-extrabold text-[color:var(--navy)] flex items-center gap-2">
                  <Inbox className="h-4 w-4 text-brand" /> Recent Messages
                </h2>
                <Link
                  href="/admin/contacts"
                  className="text-xs text-brand font-bold uppercase tracking-wider"
                >
                  Inbox →
                </Link>
              </div>
              {s.recentContacts.length === 0 ? (
                <div className="text-sm text-slate-500 py-6 text-center">
                  No messages yet.
                </div>
              ) : (
                <ul className="space-y-3">
                  {s.recentContacts.map((c: any) => (
                    <li
                      key={String(c._id)}
                      className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0"
                    >
                      <span className="bg-brand/10 text-brand h-9 w-9 grid place-items-center rounded-full font-extrabold text-xs flex-shrink-0">
                        {c.name?.[0]?.toUpperCase() || "?"}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-bold text-sm text-[color:var(--navy)] truncate">
                            {c.name}
                          </div>
                          {!c.read && (
                            <span className="h-2 w-2 rounded-full bg-brand flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {c.message || c.subject || c.email}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>

        {/* Quick actions row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Add doctor", icon: Users, href: "/admin/doctors", desc: "Create a new specialist profile" },
            { label: "Add service", icon: Stethoscope, href: "/admin/services", desc: "Publish a new specialty" },
            { label: "Write blog", icon: FileText, href: "/admin/blog", desc: "Share a new health story" },
            { label: "View live site", icon: ActivityIcon, href: "/", desc: "Open the public site" },
          ].map((q) => (
            <Link
              key={q.label}
              href={q.href}
              target={q.label === "View live site" ? "_blank" : undefined}
              className="bg-white rounded-xl p-5 border border-slate-200 hover:border-brand hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-start gap-4 group"
            >
              <div className="bg-brand/10 group-hover:bg-brand h-11 w-11 grid place-items-center rounded-lg text-brand group-hover:text-white transition-colors flex-shrink-0">
                <q.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-extrabold text-sm text-[color:var(--navy)] group-hover:text-brand transition-colors">
                  {q.label}
                </div>
                <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {q.desc}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
