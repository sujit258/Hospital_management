import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const issueRegistrationSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  dob: z.string().optional(),
  gender: z.string().optional()
});

function generateRegistrationNumber() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `REG-${new Date().getFullYear()}-${random}`;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.clinicId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!session.user.permissions?.includes("registration.issue")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const registrations = await prisma.patientRegistration.findMany({
    where: { clinicId: session.user.clinicId },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  return NextResponse.json({ registrations });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.clinicId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!session.user.permissions?.includes("registration.issue")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = issueRegistrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const payload = parsed.data;
  let registrationNumber = generateRegistrationNumber();

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const existing = await prisma.patientRegistration.findFirst({
      where: {
        clinicId: session.user.clinicId,
        registrationNumber
      }
    });
    if (!existing) break;
    registrationNumber = generateRegistrationNumber();
  }

  const registration = await prisma.patientRegistration.create({
    data: {
      clinicId: session.user.clinicId,
      registrationNumber,
      fullName: payload.fullName,
      phone: payload.phone,
      email: payload.email,
      dob: payload.dob ? new Date(payload.dob) : undefined,
      gender: payload.gender,
      issuedByUserId: session.user.id
    }
  });

  return NextResponse.json({ registration }, { status: 201 });
}
