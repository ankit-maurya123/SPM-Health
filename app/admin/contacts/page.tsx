"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2, MailCheck, MailOpen, RefreshCw } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";

type Message = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function ContactsAdmin() {
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<Message | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/contacts");
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(m: Message) {
    const res = await fetch(`/api/admin/contacts/${m._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !m.read }),
    });
    if (res.ok) load();
    else toast.error("Failed");
  }

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted");
      setOpen(null);
      load();
    } else toast.error("Failed");
  }

  return (
    <>
      <AdminHeader
        title="Messages"
        subtitle={`${items.length} total · ${items.filter((i) => !i.read).length} unread`}
        actions={
          <button onClick={load} className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm flex items-center gap-1.5">
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
        }
      />
      <div className="p-6 lg:p-10">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-sm text-slate-500">Loading…</div>
          ) : items.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-500">No messages yet.</div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {items.map((m) => (
                <li
                  key={m._id}
                  onClick={() => {
                    setOpen(m);
                    if (!m.read) toggleRead(m);
                  }}
                  className={`p-4 flex items-start gap-3 cursor-pointer hover:bg-slate-50 ${
                    !m.read ? "bg-cyan-50/40" : ""
                  }`}
                >
                  <div className={`h-9 w-9 rounded-full grid place-items-center flex-shrink-0 ${
                    !m.read ? "bg-cyan-500 text-white" : "bg-slate-200 text-slate-600"
                  }`}>
                    {m.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm">
                      <span className={!m.read ? "font-bold" : "font-medium"}>{m.name}</span>
                      <span className="text-xs text-slate-500">· {m.email}</span>
                    </div>
                    <div className="text-sm text-slate-700 mt-0.5 truncate">
                      <span className="font-semibold">{m.subject || "(no subject)"}</span> — {m.message}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{new Date(m.createdAt).toLocaleString()}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 grid place-items-end sm:place-items-center p-0 sm:p-4" onClick={() => setOpen(null)}>
          <div className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-200">
              <div className="text-xs uppercase tracking-widest text-slate-500">From</div>
              <div className="font-bold">{open.name} <span className="text-slate-400 font-normal">· {open.email}</span></div>
              {open.phone && <div className="text-sm text-slate-600 mt-1">{open.phone}</div>}
            </div>
            <div className="p-6 border-b border-slate-200">
              <div className="text-xs uppercase tracking-widest text-slate-500">Subject</div>
              <div className="font-semibold mt-1">{open.subject || "(no subject)"}</div>
              <div className="mt-4 text-sm text-slate-700 whitespace-pre-wrap">{open.message}</div>
            </div>
            <div className="p-5 flex justify-between gap-2">
              <button
                onClick={() => toggleRead(open)}
                className="text-sm font-semibold flex items-center gap-2 px-4 py-2 rounded-full hover:bg-slate-100"
              >
                {open.read ? <MailOpen className="h-4 w-4" /> : <MailCheck className="h-4 w-4" />}
                {open.read ? "Mark unread" : "Mark read"}
              </button>
              <div className="flex gap-2">
                <button onClick={() => remove(open._id)} className="text-rose-600 text-sm font-semibold flex items-center gap-2 px-4 py-2 rounded-full hover:bg-rose-50">
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
                <a href={`mailto:${open.email}`} className="btn-primary text-sm">Reply</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
