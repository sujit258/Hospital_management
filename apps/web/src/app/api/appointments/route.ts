import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const appointmentSchema = z.object({
  patientId: z.string(),
  practitionerId: z.string(),
  start: z.string(),
  end: z.string(),
  status: z.enum(["BOOKED", "CONFIRMED", "CHECKED_IN", "COMPLETED", "NO_SHOW", "CANCELLED"]).optional()
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.clinicId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isPatient = session.user.role === "PATIENT";
  const isDoctor = session.user.role === "DOCTOR";
  const appointments = await prisma.appointment.findMany({
    take: 50,
    where: {
      clinicId: session.user.clinicId,
      ...(isPatient ? { patient: { userId: session.user.id } } : {}),
      ...(isDoctor ? { practitioner: { userId: session.user.id } } : {})
    },
    orderBy: { start: "asc" },
    include: { patient: true, practitioner: { include: { user: true } } }
  });
  return NextResponse.json({ appointments });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.clinicId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const data = parsed.data;
  const appointment = await prisma.appointment.create({
    data: {
      clinicId: session.user.clinicId,
      patientId: data.patientId,
      practitionerId: data.practitionerId,
      start: new Date(data.start),
      end: new Date(data.end),
      status: data.status ?? "BOOKED"
    }
  });

  return NextResponse.json({ appointment }, { status: 201 });
}
