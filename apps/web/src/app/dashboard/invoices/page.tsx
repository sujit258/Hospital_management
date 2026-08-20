import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function InvoicesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.clinicId) redirect("/auth/login");

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-slate-600">Billing</p>
        <h2 className="text-xl font-semibold text-slate-900">Invoices & payments</h2>
      </div>
      <div className="card p-8 text-center">
        <p className="text-slate-600">Billing module coming soon</p>
        <p className="text-sm text-slate-500 mt-2">This feature will be added in a future update</p>
      </div>
    </div>
  );
}
