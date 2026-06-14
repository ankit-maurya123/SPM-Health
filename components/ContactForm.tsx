"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill name, email, and message.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not send");
      toast.success("Message sent! We'll get back soon.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
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
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Name *</label>
        <input
          className="input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your name"
          required
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Email *</label>
        <input
          type="email"
          className="input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@email.com"
          required
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Phone</label>
        <input
          type="tel"
          className="input"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+91 xxxxx xxxxx"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Subject</label>
        <input
          className="input"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          placeholder="What's this about?"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Message *</label>
        <textarea
          className="input min-h-[140px]"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="How can we help?"
          required
        />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
          <Send className="h-4 w-4" />
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
