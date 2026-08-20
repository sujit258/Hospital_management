import { Pill, User, Calendar, ArrowRight, FlaskConical } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function PrescriptionsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.clinicId) redirect("/auth/login");

  const prescriptions = await prisma.prescription.findMany({
    where: {
      clinicId: session.user.clinicId,
      ...(session.user.role === "PATIENT" ? { patient: { userId: session.user.id } } : {}),
      ...(session.user.role === "DOCTOR" ? { doctor: { userId: session.user.id } } : {})
    },
    include: {
      patient: true,
      doctor: { include: { user: true } },
      items: true
    },
    orderBy: { createdAt: "desc" },
    take: 40
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'finalized': return 'from-emerald-500 to-teal-500';
      case 'draft': return 'from-amber-500 to-orange-500';
      case 'cancelled': return 'from-rose-500 to-red-500';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status.toLowerCase()) {
      case 'finalized': return 'bg-emerald-100 text-emerald-700';
      case 'draft': return 'bg-amber-100 text-amber-700';
      case 'cancelled': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Pill size={24} className="text-emerald-600" />
        <div>
          <p className="text-sm font-medium text-emerald-600 uppercase tracking-wider">Prescriptions</p>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Homeopathic remedies & dosages
          </h2>
        </div>
      </div>

      {/* Prescriptions Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {prescriptions.map((rx: any) => (
          <div 
            key={rx.id} 
            className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${getStatusColor(rx.status)} opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity`}></div>
            
            <div className="relative p-6">
              {/* Prescription Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${getStatusColor(rx.status)} text-white shadow-md`}>
                    <FlaskConical size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{rx.id.slice(-8).toUpperCase()}</p>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusBg(rx.status)}`}>
                      {rx.status.toLowerCase()}
                    </span>
                  </div>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </div>

              {/* Prescription Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <User size={14} className="text-slate-400" />
                  <span>{rx.doctor.user?.name ?? "Unknown doctor"}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar size={14} className="text-slate-400" />
                  <span>{rx.patient.fullName}</span>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="space-y-1">
                    {rx.items.slice(0, 3).map((item: any) => (
                      <div key={item.id} className="flex items-center gap-2 text-xs text-slate-600">
                        <Pill size={10} className="text-emerald-500" />
                        <span>{item.remedy} {item.potency}</span>
                      </div>
                    ))}
                    {rx.items.length > 3 && (
                      <p className="text-xs text-emerald-600 font-medium">+{rx.items.length - 3} more items</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {prescriptions.length === 0 && (
        <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg mx-auto mb-4">
            <Pill size={32} />
          </div>
          <p className="text-lg font-semibold text-slate-900 mb-2">No prescriptions yet</p>
          <p className="text-sm text-slate-600">Homeopathic remedies will appear here</p>
        </div>
      )}
    </div>
  );
}
