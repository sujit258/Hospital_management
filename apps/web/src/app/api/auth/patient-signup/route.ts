import { prisma } from "@/lib/prisma";
import { clinicSlugFromHost } from "@/lib/tenant";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const signupSchema = z.object({
  registrationNumber: z.string().min(3),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
  clinicCode: z.string().optional()
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const payload = parsed.data;
  const host = req.headers.get("host");
  const slugFromHost = clinicSlugFromHost(host);
  const tenantHint = (payload.clinicCode || slugFromHost || "").toLowerCase();

  const clinic = tenantHint
    ? await prisma.clinic.findFirst({ where: { slug: tenantHint, isActive: true } })
    : await prisma.clinic.findFirst({ where: { isActive: true }, orderBy: { createdAt: "asc" } });

  if (!clinic) {
    return NextResponse.json({ error: "Invalid clinic context" }, { status: 400 });
  }

  // For now, patient signup is disabled since we removed PatientRegistration model
  // This would need to be re-implemented with the new schema
  return NextResponse.json({ error: "Patient signup temporarily disabled" }, { status: 503 });
}
