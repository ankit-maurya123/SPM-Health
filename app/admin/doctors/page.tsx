"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";

type Doctor = {
  _id: string;
  name: string;
  specialty: string;
  qualification?: string;
  experience?: number;
  bio?: string;
  email?: string;
  phone?: string;
  fees?: number;
  active?: boolean;
};

const empty: Partial<Doctor> = {
  name: "",
  specialty: "",
  qualification: "",
  experience: 0,
  bio: "",
  email: "",
  phone: "",
  fees: 0,
  active: true,
};

export default function DoctorsAdmin() {
  const [items, setItems] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Doctor> | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/doctors");
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    if (!editing?.name || !editing?.specialty) {
      toast.error("Name and specialty required");
      return;
    }
    const isNew = !editing._id;
    const res = await fetch(
      isNew ? "/api/admin/doctors" : `/api/admin/doctors/${editing._id}`,
      {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      }
    );
    if (res.ok) {
      toast.success(isNew ? "Doctor added" : "Doctor updated");
      setEditing(null);
      load();
    } else {
      const data = await res.json();
      toast.error(data?.error || "Failed");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this doctor?")) return;
    const res = await fetch(`/api/admin/doctors/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted");
      load();
    } else toast.error("Failed");
  }

  return (
    <>
      <AdminHeader
        title="Doctors"
        subtitle={`${items.length} total`}
        actions={
          <button onClick={() => setEditing({ ...empty })} className="btn-primary text-sm">
            <Plus className="h-4 w-4" /> Add Doctor
          </button>
        }
      />
      <div className="p-6 lg:p-10">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-sm text-slate-500">Loading…</div>
          ) : items.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-500">No doctors yet. Click &quot;Add Doctor&quot; to create one.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500">
                  <tr>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Specialty</th>
                    <th className="text-left p-3">Experience</th>
                    <th className="text-left p-3">Fees</th>
                    <th className="text-left p-3">Active</th>
                    <th className="text-right p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((d) => (
                    <tr key={d._id} className="border-t border-slate-100">
                      <td className="p-3 font-semibold">{d.name}</td>
                      <td className="p-3 text-slate-600">{d.specialty}</td>
                      <td className="p-3 text-slate-600">{d.experience} yrs</td>
                      <td className="p-3 text-slate-600">₹{d.fees}</td>
                      <td className="p-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          d.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"
                        }`}>{d.active ? "Yes" : "No"}</span>
                      </td>
                      <td className="p-3 text-right space-x-1">
                        <button onClick={() => setEditing(d)} className="hover:bg-slate-100 p-2 rounded-lg">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => remove(d._id)} className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg">
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

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/40 grid place-items-end sm:place-items-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold">{editing._id ? "Edit Doctor" : "Add Doctor"}</h3>
              <button onClick={() => setEditing(null)} className="p-2 rounded-lg hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5 grid sm:grid-cols-2 gap-4">
              <Field label="Name *" value={editing.name || ""} onChange={(v) => setEditing({ ...editing, name: v })} />
              <Field label="Specialty *" value={editing.specialty || ""} onChange={(v) => setEditing({ ...editing, specialty: v })} />
              <Field label="Qualification" value={editing.qualification || ""} onChange={(v) => setEditing({ ...editing, qualification: v })} />
              <Field label="Experience (yrs)" type="number" value={String(editing.experience ?? 0)} onChange={(v) => setEditing({ ...editing, experience: Number(v) })} />
              <Field label="Email" type="email" value={editing.email || ""} onChange={(v) => setEditing({ ...editing, email: v })} />
              <Field label="Phone" value={editing.phone || ""} onChange={(v) => setEditing({ ...editing, phone: v })} />
              <Field label="Fees (₹)" type="number" value={String(editing.fees ?? 0)} onChange={(v) => setEditing({ ...editing, fees: Number(v) })} />
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Active</label>
                <select
                  className="input"
                  value={editing.active ? "yes" : "no"}
                  onChange={(e) => setEditing({ ...editing, active: e.target.value === "yes" })}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Bio</label>
                <textarea
                  className="input min-h-[120px]"
                  value={editing.bio || ""}
                  onChange={(e) => setEditing({ ...editing, bio: e.target.value })}
                />
              </div>
            </div>
            <div className="sticky bottom-0 bg-white p-5 border-t border-slate-200 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-100">
                Cancel
              </button>
              <button onClick={save} className="btn-primary text-sm">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-600 mb-1.5 block">{label}</label>
      <input type={type} className="input" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
