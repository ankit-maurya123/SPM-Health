"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2, RefreshCw } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";

type Appt = {
  _id: string;
  patientName: string;
  email: string;
  phone: string;
  doctorName?: string;
  department?: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  message?: string;
  createdAt: string;
};

export default function AppointmentsAdminPage() {
  const [items, setItems] = useState<Appt[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/appointments");
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/admin/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      toast.success("Updated");
      load();
    } else toast.error("Failed");
  }

  async function remove(id: string) {
    if (!confirm("Delete this appointment?")) return;
    const res = await fetch(`/api/admin/appointments/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted");
      load();
    } else toast.error("Failed");
  }

  const filtered = statusFilter ? items.filter((i) => i.status === statusFilter) : items;

  return (
    <>
      <AdminHeader
        title="Appointments"
        subtitle={`${items.length} total · ${items.filter((i) => i.status === "pending").length} pending`}
        actions={
          <>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button onClick={load} className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm flex items-center gap-1.5">
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
          </>
        }
      />
      <div className="p-6 lg:p-10">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-slate-500 text-sm">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-slate-500 text-sm">No appointments.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500">
                  <tr>
                    <th className="text-left p-3">Patient</th>
                    <th className="text-left p-3">Contact</th>
                    <th className="text-left p-3">Doctor / Dept</th>
                    <th className="text-left p-3">Slot</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-right p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a) => (
                    <tr key={a._id} className="border-t border-slate-100">
                      <td className="p-3">
                        <div className="font-semibold">{a.patientName}</div>
                        {a.message && <div className="text-xs text-slate-500 mt-0.5 max-w-xs truncate">{a.message}</div>}
                      </td>
                      <td className="p-3 text-slate-600">
                        <div>{a.phone}</div>
                        <div className="text-xs">{a.email}</div>
                      </td>
                      <td className="p-3 text-slate-600">
                        <div>{a.doctorName || "—"}</div>
                        <div className="text-xs">{a.department || "—"}</div>
                      </td>
                      <td className="p-3 text-slate-700">
                        <div className="font-medium">{a.date}</div>
                        <div className="text-xs text-slate-500">{a.time}</div>
                      </td>
                      <td className="p-3">
                        <select
                          value={a.status}
                          onChange={(e) => updateStatus(a._id, e.target.value)}
                          className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                            a.status === "confirmed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                            a.status === "cancelled" ? "bg-rose-50 text-rose-700 border-rose-200" :
                            a.status === "completed" ? "bg-slate-100 text-slate-700 border-slate-200" :
                            "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button onClick={() => remove(a._id)} className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
