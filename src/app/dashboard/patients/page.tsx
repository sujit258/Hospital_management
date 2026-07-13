import Link from "next/link";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function PatientsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.hospitalId) redirect("/auth/login");

  const patients = await prisma.patient.findMany({
    where: {
      hospitalId: session.user.hospitalId,
      ...(session.user.role === "PATIENT" ? { userId: session.user.id } : {}),
      ...(session.user.role === "DOCTOR"
        ? {
            OR: [
              { appointments: { some: { practitioner: { userId: session.user.id } } } },
              { encounters: { some: { practitioner: { userId: session.user.id } } } },
              { prescriptions: { some: { practitioner: { userId: session.user.id } } } }
            ]
          }
        : {})
    },
    include: {
      user: true,
      appointments: { orderBy: { start: "desc" }, take: 1 },
      invoices: { select: { amountDue: true, status: true } }
    },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  const canWritePatient = session.user.permissions?.includes("patient.write");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600">Patients</p>
          <h2 className="text-xl font-semibold text-slate-900">Profiles & visit history</h2>
        </div>
        {canWritePatient ? (
          <Link href="/dashboard/patients/new" className="btn-primary inline-flex items-center gap-2">
            <Plus size={16} /> Add patient
          </Link>
        ) : null}
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Visits</th>
              <th className="px-4 py-3">Last visit</th>
              <th className="px-4 py-3">Balance</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{patient.user?.name ?? "Unknown patient"}</td>
                <td className="px-4 py-3 text-slate-600">{patient.registrationNumber ?? patient.id.slice(-8).toUpperCase()}</td>
                <td className="px-4 py-3 text-slate-600">{patient.appointments.length}</td>
                <td className="px-4 py-3 text-slate-600">{patient.appointments[0] ? new Date(patient.appointments[0].start).toLocaleDateString() : "--"}</td>
                <td className="px-4 py-3 text-slate-600">{patient.invoices.filter((i) => i.status !== "PAID").length} due</td>
                <td className="px-4 py-3 text-primary-700">
                  <Link href={`/dashboard/patients/${patient.id}`}>Open</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
