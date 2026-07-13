import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const patientSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  gender: z.string().optional(),
  notes: z.string().optional()
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.hospitalId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isPatient = session.user.role === "PATIENT";
  const isDoctor = session.user.role === "DOCTOR";
  const patients = await prisma.patient.findMany({
    take: 50,
    where: {
      hospitalId: session.user.hospitalId,
      ...(isPatient ? { userId: session.user.id } : {}),
      ...(isDoctor
        ? {
            OR: [
              { appointments: { some: { practitioner: { userId: session.user.id } } } },
              { encounters: { some: { practitioner: { userId: session.user.id } } } },
              { prescriptions: { some: { practitioner: { userId: session.user.id } } } }
            ]
          }
        : {})
    },
    orderBy: { createdAt: "desc" },
    include: { user: true }
  });
  return NextResponse.json({ patients });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.hospitalId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = patientSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  let user = null;
  if (data.email) {
    user = await prisma.user.findFirst({
      where: {
        email: data.email,
        hospitalId: session.user.hospitalId
      }
    });

    if (user) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { name: data.name, phone: data.phone ?? user.phone }
      });
    } else {
      user = await prisma.user.create({
        data: {
          hospitalId: session.user.hospitalId,
          email: data.email,
          name: data.name,
          phone: data.phone,
          role: "PATIENT"
        }
      });
    }
  }

  const patient = await prisma.patient.create({
    data: {
      hospitalId: session.user.hospitalId,
      userId: user?.id,
      gender: data.gender,
      notes: data.notes
    }
  });

  return NextResponse.json({ patient }, { status: 201 });
}
