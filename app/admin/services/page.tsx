"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";

type Service = {
  _id: string;
  title: string;
  slug?: string;
  shortDescription?: string;
  description?: string;
  icon?: string;
  featured?: boolean;
  active?: boolean;
};

export default function ServicesAdmin() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/services");
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    if (!editing?.title) {
      toast.error("Title required");
      return;
    }
    const isNew = !editing._id;
    const res = await fetch(
      isNew ? "/api/admin/services" : `/api/admin/services/${editing._id}`,
      {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      }
    );
    if (res.ok) {
      toast.success(isNew ? "Service added" : "Service updated");
      setEditing(null);
      load();
    } else toast.error("Failed");
  }

  async function remove(id: string) {
    if (!confirm("Delete this service?")) return;
    const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted");
      load();
    } else toast.error("Failed");
  }

  return (
    <>
      <AdminHeader
        title="Services"
        subtitle={`${items.length} total`}
        actions={
          <button onClick={() => setEditing({ title: "", active: true, featured: false })} className="btn-primary text-sm">
            <Plus className="h-4 w-4" /> Add Service
          </button>
        }
      />
      <div className="p-6 lg:p-10">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-sm text-slate-500">Loading…</div>
          ) : items.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-500">No services yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500">
                  <tr>
                    <th className="text-left p-3">Title</th>
                    <th className="text-left p-3">Short Description</th>
                    <th className="text-left p-3">Active</th>
                    <th className="text-right p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((s) => (
                    <tr key={s._id} className="border-t border-slate-100">
                      <td className="p-3 font-semibold">{s.title}</td>
                      <td className="p-3 text-slate-600 max-w-md truncate">{s.shortDescription || "—"}</td>
                      <td className="p-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          s.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"
                        }`}>{s.active ? "Yes" : "No"}</span>
                      </td>
                      <td className="p-3 text-right space-x-1">
                        <button onClick={() => setEditing(s)} className="hover:bg-slate-100 p-2 rounded-lg">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => remove(s._id)} className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg">
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
              <h3 className="font-bold">{editing._id ? "Edit Service" : "Add Service"}</h3>
              <button onClick={() => setEditing(null)} className="p-2 rounded-lg hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5 grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Title *</label>
                <input className="input" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Short Description</label>
                <input className="input" value={editing.shortDescription || ""} onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Description</label>
                <textarea className="input min-h-[140px]" value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Active</label>
                <select className="input" value={editing.active ? "yes" : "no"} onChange={(e) => setEditing({ ...editing, active: e.target.value === "yes" })}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Featured</label>
                <select className="input" value={editing.featured ? "yes" : "no"} onChange={(e) => setEditing({ ...editing, featured: e.target.value === "yes" })}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white p-5 border-t border-slate-200 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-100">Cancel</button>
              <button onClick={save} className="btn-primary text-sm">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
