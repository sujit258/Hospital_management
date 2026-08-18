import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function PrescriptionsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.hospitalId) redirect("/auth/login");

  const prescriptions = await prisma.prescription.findMany({
    where: {
      hospitalId: session.user.hospitalId,
      ...(session.user.role === "PATIENT" ? { patient: { userId: session.user.id } } : {}),
      ...(session.user.role === "DOCTOR" ? { practitioner: { userId: session.user.id } } : {})
    },
    include: {
      patient: { include: { user: true } },
      practitioner: { include: { user: true } }
    },
    orderBy: { createdAt: "desc" },
    take: 40
  });

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-slate-600">Prescriptions</p>
        <h2 className="text-xl font-semibold text-slate-900">Digital RX with print/PDF</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {prescriptions.map((rx) => (
          <div key={rx.id} className="card p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900">{rx.id.slice(-8).toUpperCase()}</p>
              <span className="badge capitalize">{rx.status.toLowerCase()}</span>
            </div>
            <p className="text-sm text-slate-700">{rx.patient.user?.name ?? "Unknown patient"}</p>
            <p className="text-sm text-slate-600">{rx.practitioner.user?.name ?? "Unknown doctor"}</p>
            <p className="mt-2 text-sm text-slate-700 truncate">{rx.items}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
