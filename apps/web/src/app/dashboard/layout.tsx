import Link from "next/link";
import { CalendarClock, FileText, Home, LayoutDashboard, Pill, Users, Bell, LogOut, User, Stethoscope } from "lucide-react";
import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSignOut } from "@/components/dashboard/sign-out-button";
import { dashboardLinksForPermissions } from "@/lib/rbac";

const links = [
  { href: "/dashboard" as const, label: "Overview", icon: <LayoutDashboard size={18} /> },
  { href: "/dashboard/patients" as const, label: "Patients", icon: <Users size={18} /> },
  { href: "/dashboard/appointments" as const, label: "Appointments", icon: <CalendarClock size={18} /> },
  { href: "/dashboard/consultations" as const, label: "Consultations", icon: <FileText size={18} /> },
  { href: "/dashboard/prescriptions" as const, label: "Prescriptions", icon: <Pill size={18} /> },
  { href: "/dashboard/followups" as const, label: "Follow-ups", icon: <Bell size={18} /> }
];

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  const visiblePaths = dashboardLinksForPermissions(session.user?.permissions);
  const visibleLinks = links.filter((link) => visiblePaths.includes(link.href));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-emerald-50/30">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-72 shrink-0 border-r border-slate-200/60 bg-white/80 backdrop-blur-xl px-6 py-8 lg:block">
          {/* Logo */}
          <Link href="/" className="mb-8 flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all">
              <Stethoscope size={20} />
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Homeo Clinic</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="space-y-1">
            {visibleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-700 transition-all duration-200 group"
              >
                <span className="text-slate-400 group-hover:text-emerald-600 transition-colors">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="absolute bottom-8 left-6 right-6">
            <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                  <User size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{session.user?.name}</p>
                  <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 capitalize">
                  {session.user?.role?.toLowerCase()}
                </span>
                <DashboardSignOut iconOnly />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 px-6 py-8 lg:px-10">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600 uppercase tracking-wider mb-1">
                {session.user?.role?.toLowerCase()} dashboard
              </p>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Clinic Command Center
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                  <User size={16} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900">{session.user?.name}</p>
                  <p className="text-xs text-slate-500">{session.user?.role?.toLowerCase()}</p>
                </div>
              </div>
              <DashboardSignOut />
            </div>
          </div>

          {/* Page Content */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
