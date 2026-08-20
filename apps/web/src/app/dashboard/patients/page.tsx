import Link from "next/link";
import { Plus, User, Phone, Calendar, ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function PatientsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.clinicId) redirect("/auth/login");

  const patients = await prisma.patient.findMany({
    where: {
      clinicId: session.user.clinicId,
      ...(session.user.role === "PATIENT" ? { userId: session.user.id } : {}),
      ...(session.user.role === "DOCTOR"
        ? {
            OR: [
              { appointments: { some: { doctor: { userId: session.user.id } } } },
              { consultations: { some: { doctor: { userId: session.user.id } } } },
              { prescriptions: { some: { doctor: { userId: session.user.id } } } }
            ]
          }
        : {})
    },
    include: {
      user: true,
      appointments: { orderBy: { startTime: "desc" }, take: 1 },
      consultations: { orderBy: { createdAt: "desc" }, take: 1 }
    },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  const canWritePatient = session.user.permissions?.includes("patient.write");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <User size={18} className="text-emerald-600" />
            <p className="text-sm font-medium text-emerald-600 uppercase tracking-wider">Patients</p>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Profiles & visit history
          </h2>
        </div>
        {canWritePatient ? (
          <Link 
            href="/dashboard/patients/new" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg shadow-emerald-500/30"
          >
            <Plus size={18} /> Add patient
          </Link>
        ) : null}
      </div>

      {/* Patients Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {patients.map((patient: any) => (
          <Link 
            key={patient.id} 
            href={`/dashboard/patients/${patient.id}`}
            className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity"></div>
            
            <div className="relative p-6">
              {/* Patient Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">{patient.fullName}</p>
                    <p className="text-xs text-slate-500">{patient.patientCode}</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </div>

              {/* Patient Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone size={14} className="text-slate-400" />
                  <span>{patient.phone}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar size={14} className="text-slate-400" />
                  <span>Visits: {patient.appointments.length + patient.consultations.length}</span>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <p className="text-xs text-slate-500">
                    Last visit: {(patient.appointments[0]?.startTime || patient.consultations[0]?.createdAt)
                      ? new Date(patient.appointments[0]?.startTime || patient.consultations[0]?.createdAt).toLocaleDateString()
                      : "No visits yet"}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {patients.length === 0 && (
        <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg mx-auto mb-4">
            <User size={32} />
          </div>
          <p className="text-lg font-semibold text-slate-900 mb-2">No patients yet</p>
          <p className="text-sm text-slate-600">Get started by adding your first patient profile</p>
        </div>
      )}
    </div>
  );
}
