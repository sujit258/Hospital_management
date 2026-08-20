import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendClinicWelcomeEmail } from "@/lib/email";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      clinicName,
      clinicSlug,
      clinicCode,
      adminName,
      adminEmail,
      adminPhone,
      adminPassword,
      clinicAddress,
      clinicCity,
      clinicState,
      clinicZip
    } = body;

    // Validate required fields
    if (!clinicName || !clinicSlug || !clinicCode || !adminName || !adminEmail || !adminPhone || !adminPassword) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if clinic slug already exists
    const existingClinic = await prisma.clinic.findUnique({
      where: { slug: clinicSlug }
    });

    if (existingClinic) {
      return NextResponse.json(
        { error: "Clinic slug already exists" },
        { status: 409 }
      );
    }

    // Check if clinic code already exists
    const existingCode = await prisma.clinic.findUnique({
      where: { code: clinicCode }
    });

    if (existingCode) {
      return NextResponse.json(
        { error: "Clinic code already exists" },
        { status: 409 }
      );
    }

    // Check if admin email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create clinic and admin user in a transaction
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create clinic
      const clinic = await tx.clinic.create({
        data: {
          name: clinicName,
          slug: clinicSlug,
          code: clinicCode,
          address: clinicAddress || null,
          city: clinicCity || null,
          state: clinicState || null,
          zip: clinicZip || null,
          phone: adminPhone,
          isActive: true
        }
      });

      // Create admin user
      const user = await tx.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          name: adminName,
          role: "CLINIC_ADMIN",
          clinicId: clinic.id,
          phone: adminPhone
        }
      });

      return { clinic, user };
    });

    // Send welcome email
    await sendClinicWelcomeEmail(
      adminName,
      adminEmail,
      clinicName,
      clinicSlug,
      clinicCode,
      adminPassword
    );

    return NextResponse.json({
      success: true,
      clinicId: result.clinic.id,
      clinicSlug: result.clinic.slug,
      clinicCode: result.clinic.code,
      adminEmail: result.user.email,
      message: "Clinic created successfully"
    });

  } catch (error) {
    console.error("Clinic registration error:", error);
    return NextResponse.json(
      { error: "Failed to create clinic" },
      { status: 500 }
    );
  }
}
