import { ArrowDownRight, ArrowUpRight, CalendarClock, CreditCard, FileText, Users } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { normalizeRole } from "@/lib/rbac";

type RoleCard = { heading: string; actions: string[] };

const roleCopy = {
  SUPER_ADMIN: {
    heading: "Network operations overview",
    actions: ["+ Add hospital", "+ Assign permissions", "+ Review audit logs"]
  },
  HOSPITAL_ADMIN: {
    heading: "Hospital operations overview",
    actions: ["+ Register patient", "+ Manage staff", "+ Review billing"]
  },
  ADMIN: {
    heading: "Operations overview",
    actions: ["+ New appointment", "+ Add visit note", "+ Create invoice"]
  },
  DOCTOR: {
    heading: "Clinical queue",
    actions: ["+ Add clinical note", "+ Write prescription", "+ Mark follow-up"]
  },
  NURSE: {
    heading: "Nursing station",
    actions: ["+ Update vitals", "+ Queue follow-up", "+ Assist discharge"]
  },
  FRONT_DESK: {
    heading: "Reception desk",
    actions: ["+ Pre-register patient", "+ Confirm booking", "+ Check-in patient"]
  },
  BILLING: {
    heading: "Revenue desk",
    actions: ["+ Generate invoice", "+ Post payment", "+ Resolve dues"]
  },
  LAB_TECH: {
    heading: "Lab workflow",
    actions: ["+ Receive sample", "+ Update test status", "+ Publish report"]
  },
  PHARMACY: {
    heading: "Pharmacy counter",
    actions: ["+ Validate prescription", "+ Dispense medicine", "+ Update stock"]
  },
  STAFF: {
    heading: "Front desk workflow",
    actions: ["+ Register patient", "+ Confirm booking", "+ Collect payment"]
  },
  PATIENT: {
    heading: "My care timeline",
    actions: ["+ Book follow-up", "+ View prescriptions", "+ View invoices"]
  }
} as const satisfies Record<string, RoleCard>;

const stats = [
  { label: "Active patients", value: "1,284", delta: "+6.2%", positive: true, icon: <Users size={18} /> },
  { label: "Today appointments", value: "42", delta: "+2", positive: true, icon: <CalendarClock size={18} /> },
  { label: "Invoices due", value: "$18.4k", delta: "-4.1%", positive: false, icon: <CreditCard size={18} /> }
];

const timeline = [
  { title: "Visit - Riya S.", detail: "Digestive consult • Dr. Meera", time: "09:00", status: "checked-in" },
  { title: "Prescription", detail: "#RX-1045 emailed to patient", time: "10:40", status: "sent" },
  { title: "Payment", detail: "Invoice INV-2025 settled online", time: "11:10", status: "paid" },
  { title: "New booking", detail: "Panchakarma assessment", time: "12:00", status: "booked" }
];

export default async function DashboardHome() {
  const session = await getServerSession(authOptions);
  const role = normalizeRole(session?.user?.role) ?? "PATIENT";
  const copy = roleCopy[role] ?? roleCopy.PATIENT;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="card flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-slate-600">{item.label}</p>
              <p className="text-2xl font-semibold text-slate-900">{item.value}</p>
            </div>
            <div className={`flex items-center gap-1 text-sm font-semibold ${item.positive ? "text-emerald-600" : "text-rose-600"}`}>
              {item.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              <span>{item.delta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-primary-700">Operations</p>
              <p className="text-lg font-semibold text-slate-900">{copy.heading}</p>
            </div>
            <span className="badge">Live updates</span>
          </div>
          <div className="divide-y">
            {timeline.map((item) => (
              <div key={item.title} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-600">{item.detail}</p>
                </div>
                <div className="text-right text-sm text-slate-500">
                  <p>{item.time}</p>
                  <p className="capitalize text-primary-700">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-5">
          <p className="text-sm font-semibold text-slate-900">Quick actions</p>
          <div className="mt-3 space-y-3 text-sm text-slate-700">
            {copy.actions.map((action) => (
              <button key={action} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left hover:border-primary-300">
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
