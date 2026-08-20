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

  // Invoice model not yet implemented in schema
  return NextResponse.json({ invoices: [] });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.clinicId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Invoice model not yet implemented in schema
  return NextResponse.json({ error: "Invoice model not yet implemented" }, { status: 501 });
}
