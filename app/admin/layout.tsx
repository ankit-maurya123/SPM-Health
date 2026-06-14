import type { Metadata } from "next";
import { getAdminSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin · SPMHealth",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  if (!session) {
    // Login page renders without sidebar
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-slate-100">
      <AdminSidebar adminName={session.name} />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
