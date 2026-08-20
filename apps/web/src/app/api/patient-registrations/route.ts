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

  // PatientRegistration model not yet implemented in schema
  return NextResponse.json({ registrations: [] });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.clinicId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // PatientRegistration model not yet implemented in schema
  return NextResponse.json({ error: "PatientRegistration model not yet implemented" }, { status: 501 });
}
