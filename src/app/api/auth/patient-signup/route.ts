import { prisma } from "@/lib/prisma";
import { hospitalSlugFromHost } from "@/lib/tenant";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const signupSchema = z.object({
  registrationNumber: z.string().min(3),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
  hospitalCode: z.string().optional()
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const payload = parsed.data;
  const host = req.headers.get("host");
  const slugFromHost = hospitalSlugFromHost(host);
  const tenantHint = (payload.hospitalCode || slugFromHost || "").toLowerCase();

  const hospital = tenantHint
    ? await prisma.hospital.findFirst({ where: { slug: tenantHint, isActive: true } })
    : await prisma.hospital.findFirst({ where: { isActive: true }, orderBy: { createdAt: "asc" } });

  if (!hospital) {
    return NextResponse.json({ error: "Invalid hospital context" }, { status: 400 });
  }

  const registration = await prisma.patientRegistration.findFirst({
    where: {
      hospitalId: hospital.id,
      registrationNumber: payload.registrationNumber,
      isClaimed: false
    }
  });

  if (!registration) {
    return NextResponse.json({ error: "Registration number not found or already claimed" }, { status: 404 });
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: payload.email,
      hospitalId: hospital.id
    }
  });
  if (existingUser) {
    return NextResponse.json({ error: "Email already exists for this hospital" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        hospitalId: hospital.id,
        role: "PATIENT",
        email: payload.email,
        phone: payload.phone ?? registration.phone,
        name: registration.fullName,
        password: hashedPassword
      }
    });

    const patient = registration.patientId
      ? await tx.patient.update({
          where: { id: registration.patientId },
          data: {
            userId: user.id,
            hospitalId: hospital.id,
            registrationNumber: registration.registrationNumber,
            isRegistrationLinked: true,
            gender: registration.gender
          }
        })
      : await tx.patient.create({
          data: {
            hospitalId: hospital.id,
            userId: user.id,
            registrationNumber: registration.registrationNumber,
            isRegistrationLinked: true,
            gender: registration.gender
          }
        });

    const claimedRegistration = await tx.patientRegistration.update({
      where: { id: registration.id },
      data: {
        isClaimed: true,
        patientId: patient.id,
        email: payload.email,
        phone: payload.phone ?? registration.phone
      }
    });

    return { user, patient, registration: claimedRegistration };
  });

  return NextResponse.json(result, { status: 201 });
}
