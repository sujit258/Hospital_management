import Link from "next/link";
import { CalendarClock, FileText, Home, LayoutDashboard, Pill, Users } from "lucide-react";
import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSignOut } from "@/components/dashboard/sign-out-button";
import { dashboardLinksForPermissions } from "@/lib/rbac";

const links = [
  { href: "/dashboard" as const, label: "Overview", icon: <LayoutDashboard size={16} /> },
  { href: "/dashboard/patients" as const, label: "Patients", icon: <Users size={16} /> },
  { href: "/dashboard/appointments" as const, label: "Appointments", icon: <CalendarClock size={16} /> },
  { href: "/dashboard/prescriptions" as const, label: "Prescriptions", icon: <Pill size={16} /> },
  { href: "/dashboard/invoices" as const, label: "Billing", icon: <FileText size={16} /> }
];

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  const visiblePaths = dashboardLinksForPermissions(session.user?.permissions);
  const visibleLinks = links.filter((link) => visiblePaths.includes(link.href));

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <aside className="hidden w-64 shrink-0 border-r bg-white px-4 py-6 lg:block">
          <Link href="/" className="mb-6 flex items-center gap-2 text-sm font-semibold text-primary-700">
            <Home size={16} />
            Back to site
          </Link>
          <nav className="space-y-1">
            {visibleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-700"
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t mt-8 space-y-2">
            <div className="px-3">
              <p className="text-xs font-semibold text-slate-900 truncate">{session.user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
              <span className="mt-1 inline-block rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800 capitalize">
                {session.user?.role?.toLowerCase()}
              </span>
            </div>
            <DashboardSignOut />
          </div>
        </aside>

        <div className="flex-1 px-4 py-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-primary-700">{session.user?.role?.toLowerCase()} dashboard</p>
              <h1 className="text-2xl font-semibold text-slate-900">Hospital command center</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-slate-600 sm:block">
                {session.user?.name}
              </span>
              <DashboardSignOut iconOnly />
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
