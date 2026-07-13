import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function InvoicesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.hospitalId) redirect("/auth/login");

  const invoices = await prisma.invoice.findMany({
    where: {
      hospitalId: session.user.hospitalId,
      ...(session.user.role === "PATIENT" ? { patient: { userId: session.user.id } } : {}),
      ...(session.user.role === "DOCTOR" ? { encounter: { practitioner: { userId: session.user.id } } } : {})
    },
    include: { patient: { include: { user: true } } },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-slate-600">Billing</p>
        <h2 className="text-xl font-semibold text-slate-900">Invoices & payments</h2>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-4 py-3">Invoice</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Due</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-slate-900">{inv.id.slice(-8).toUpperCase()}</td>
                <td className="px-4 py-3 text-slate-700">{inv.patient.user?.name ?? "Unknown patient"}</td>
                <td className="px-4 py-3 text-slate-700">${inv.amountDue.toFixed(2)}</td>
                <td className="px-4 py-3 text-primary-700 capitalize">{inv.status.toLowerCase()}</td>
                <td className="px-4 py-3 text-slate-600">{inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : "--"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
