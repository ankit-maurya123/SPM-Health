"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import toast from "react-hot-toast";
import { Activity, LogIn } from "lucide-react";
import Link from "next/link";

function LoginInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const from = sp.get("from") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Login failed");
      toast.success("Welcome back!");
      router.replace(from);
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center px-4 py-10 relative overflow-hidden">
      <div className="blob bg-cyan-300 -top-20 -left-20 h-80 w-80" />
      <div className="blob bg-indigo-300 -bottom-20 -right-20 h-80 w-80" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8">
          <span className="brand-gradient grid h-11 w-11 place-items-center rounded-xl text-white shadow-md">
            <Activity className="h-5 w-5" />
          </span>
          <span className="text-2xl font-extrabold tracking-tight">
            SPM<span className="text-brand-gradient">Health</span>
          </span>
        </Link>

        <div className="glass-strong rounded-3xl p-8 shadow-xl">
          <h1 className="text-2xl font-extrabold tracking-tight">Admin Panel</h1>
          <p className="text-sm text-slate-600 mt-1">
            Sign in to manage doctors, services, appointments and posts.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Email</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@spmhealth.com"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Password</label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              <LogIn className="h-4 w-4" />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
            <div className="font-semibold mb-0.5">Default credentials (change in production):</div>
            <div>new@gmail.com / new</div>
            <div className="mt-2 text-[11px] text-amber-700/80">
              Make sure MongoDB is running on{" "}
              <code className="bg-amber-100 px-1 rounded">127.0.0.1:27017</code>
            </div>
          </div>
        </div>

        <Link href="/" className="block text-center text-xs text-slate-500 mt-6 hover:text-slate-700">
          ← Back to website
        </Link>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
