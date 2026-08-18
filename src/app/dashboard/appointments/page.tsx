import { CalendarClock } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AppointmentsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.hospitalId) redirect("/auth/login");

  const appointments = await prisma.appointment.findMany({
    where: {
      hospitalId: session.user.hospitalId,
      ...(session.user.role === "PATIENT" ? { patient: { userId: session.user.id } } : {}),
      ...(session.user.role === "DOCTOR" ? { practitioner: { userId: session.user.id } } : {})
    },
    include: {
      patient: { include: { user: true } },
      practitioner: { include: { user: true } }
    },
    orderBy: { start: "asc" },
    take: 40
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-primary-700">
        <CalendarClock size={20} />
        <div>
          <p className="text-sm text-slate-600">Appointments</p>
          <h2 className="text-xl font-semibold text-slate-900">Calendar & triage</h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {appointments.map((apt) => (
          <div key={apt.id} className="card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">{apt.id.slice(-8).toUpperCase()}</p>
              <span className="badge capitalize">{apt.status.toLowerCase()}</span>
            </div>
            <p className="mt-2 text-sm text-slate-700">{new Date(apt.start).toLocaleString()} • {apt.practitioner.user?.name ?? "Unknown doctor"}</p>
            <p className="text-sm text-slate-600">{apt.patient.user?.name ?? "Unknown patient"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
