import { ArrowDownRight, ArrowUpRight, CalendarClock, Users, FileText, Bell, TrendingUp, Activity, Clock } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { normalizeRole } from "@/lib/rbac";

type RoleCard = { heading: string; actions: string[] };

const roleCopy = {
  SUPER_ADMIN: {
    heading: "Network operations overview",
    actions: ["+ Add clinic", "+ Assign permissions", "+ Review audit logs"]
  },
  CLINIC_ADMIN: {
    heading: "Clinic operations overview",
    actions: ["+ Register patient", "+ Manage staff", "+ Review billing"]
  },
  DOCTOR: {
    heading: "Clinical queue",
    actions: ["+ Add clinical note", "+ Write prescription", "+ Mark follow-up"]
  },
  RECEPTIONIST: {
    heading: "Reception desk",
    actions: ["+ Pre-register patient", "+ Confirm booking", "+ Check-in patient"]
  },
  PATIENT: {
    heading: "My care timeline",
    actions: ["+ Book follow-up", "+ View prescriptions", "+ View appointments"]
  }
} as const satisfies Record<string, RoleCard>;

// This will be replaced with actual API data
const stats = [
  { label: "Total patients", value: "0", delta: "+0%", positive: true, icon: <Users size={20} />, color: "from-blue-500 to-cyan-500" },
  { label: "Today appointments", value: "0", delta: "+0", positive: true, icon: <CalendarClock size={20} />, color: "from-emerald-500 to-teal-500" },
  { label: "Follow-ups due", value: "0", delta: "+0", positive: true, icon: <Bell size={20} />, color: "from-amber-500 to-orange-500" }
];

const timeline = [
  { title: "System ready", detail: "Connect to API for live data", time: "Now", status: "pending" }
];

export default async function DashboardHome() {
  const session = await getServerSession(authOptions);
  const role = normalizeRole(session?.user?.role) ?? "PATIENT";
  const copy = roleCopy[role] ?? roleCopy.PATIENT;

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`}></div>
            <div className="relative p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">{item.label}</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{item.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                  {item.icon}
                </div>
              </div>
              <div className={`mt-4 flex items-center gap-1 text-sm font-semibold ${item.positive ? "text-emerald-600" : "text-rose-600"}`}>
                {item.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span>{item.delta}</span>
                <span className="text-slate-400 font-normal ml-1">vs last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Operations Timeline */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 bg-gradient-to-r from-slate-50 to-white">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Activity size={16} className="text-emerald-600" />
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Operations</p>
              </div>
              <p className="text-lg font-bold text-slate-900">{copy.heading}</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              Live updates
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {timeline.map((item) => (
              <div key={item.title} className="flex items-center justify-between px-6 py-5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-600">{item.detail}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">{item.time}</p>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 capitalize">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-emerald-600" />
            <p className="text-sm font-semibold text-slate-900">Quick actions</p>
          </div>
          <div className="space-y-3">
            {copy.actions.map((action) => (
              <button 
                key={action} 
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-left text-sm font-medium text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
