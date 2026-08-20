import { FileText, Calendar, User, Pill, ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ConsultationsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.clinicId) redirect("/auth/login");

  const consultations = await prisma.consultation.findMany({
    where: {
      clinicId: session.user.clinicId,
      ...(session.user.role === "PATIENT" ? { patient: { userId: session.user.id } } : {}),
      ...(session.user.role === "DOCTOR" ? { doctor: { userId: session.user.id } } : {})
    },
    include: {
      patient: true,
      doctor: { include: { user: true } },
      prescriptions: { include: { items: true } }
    },
    orderBy: { createdAt: "desc" },
    take: 40
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <FileText size={24} className="text-emerald-600" />
        <div>
          <p className="text-sm font-medium text-emerald-600 uppercase tracking-wider">Consultations</p>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Clinical records & notes
          </h2>
        </div>
      </div>

      {/* Consultations Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {consultations.map((consultation: any) => (
          <div 
            key={consultation.id} 
            className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity"></div>
            
            <div className="relative p-6">
              {/* Consultation Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{consultation.id.slice(-8).toUpperCase()}</p>
                    <span className="text-xs text-slate-500">
                      {new Date(consultation.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </div>

              {/* Consultation Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <User size={14} className="text-slate-400" />
                  <span>{consultation.doctor.user?.name ?? "Unknown doctor"}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar size={14} className="text-slate-400" />
                  <span>{consultation.patient.fullName}</span>
                </div>

                {consultation.chiefComplaint && (
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs text-slate-500 line-clamp-2">{consultation.chiefComplaint}</p>
                  </div>
                )}

                {consultation.prescription && (
                  <div className="flex items-center gap-2 text-xs text-emerald-600">
                    <Pill size={12} />
                    <span>{consultation.prescription.items.length} prescription items</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {consultations.length === 0 && (
        <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg mx-auto mb-4">
            <FileText size={32} />
          </div>
          <p className="text-lg font-semibold text-slate-900 mb-2">No consultations yet</p>
          <p className="text-sm text-slate-600">Clinical records will appear here</p>
        </div>
      )}
    </div>
  );
}
