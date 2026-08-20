import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const invoiceSchema = z.object({
  patientId: z.string(),
  encounterId: z.string().optional(),
  amountDue: z.number().nonnegative(),
  status: z.enum(["PENDING", "PARTIAL", "PAID", "VOID"]).optional(),
  items: z
    .array(
      z.object({
        description: z.string(),
        quantity: z.number().int().positive(),
        unitPrice: z.number().nonnegative(),
        taxRate: z.number().nonnegative().optional()
      })
    )
    .optional()
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.clinicId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isPatient = session.user.role === "PATIENT";
  const isDoctor = session.user.role === "DOCTOR";

  const invoices = await prisma.invoice.findMany({
    take: 50,
    where: {
      clinicId: session.user.clinicId,
      ...(isPatient ? { patient: { userId: session.user.id } } : {}),
      ...(isDoctor ? { encounter: { practitioner: { userId: session.user.id } } } : {})
    },
    orderBy: { createdAt: "desc" },
    include: { patient: true, payments: true, items: true }
  });

  return NextResponse.json({ invoices });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.clinicId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = invoiceSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const data = parsed.data;
  const invoice = await prisma.invoice.create({
    data: {
      clinicId: session.user.clinicId,
      patientId: data.patientId,
      encounterId: data.encounterId,
      amountDue: data.amountDue,
      status: data.status ?? "PENDING",
      items: data.items
        ? {
            create: data.items.map((item) => ({
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              taxRate: item.taxRate ?? 0
            }))
          }
        : undefined
    },
    include: { items: true }
  });

  return NextResponse.json({ invoice }, { status: 201 });
}
