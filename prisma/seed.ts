import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const hospital = await prisma.hospital.upsert({
    where: { slug: "samarthhospital" },
    update: { name: "Samarth Hospital" },
    create: {
      name: "Samarth Hospital",
      slug: "samarthhospital",
      customDomain: "samarthhospital.ourapplicationdomain.com"
    }
  });

  const admin = await prisma.user.upsert({
    where: {
      email_hospitalId: {
        email: "admin@samarthhospital.test",
        hospitalId: hospital.id
      }
    },
    update: { password: hashedPassword, role: Role.HOSPITAL_ADMIN, hospitalId: hospital.id },
    create: {
      hospitalId: hospital.id,
      email: "admin@samarthhospital.test",
      name: "Hospital Admin",
      role: Role.HOSPITAL_ADMIN,
      password: hashedPassword
    }
  });

  const reception = await prisma.user.upsert({
    where: {
      email_hospitalId: {
        email: "reception@samarthhospital.test",
        hospitalId: hospital.id
      }
    },
    update: { password: hashedPassword, role: Role.FRONT_DESK, hospitalId: hospital.id },
    create: {
      hospitalId: hospital.id,
      email: "reception@samarthhospital.test",
      name: "Reception Desk",
      role: Role.FRONT_DESK,
      password: hashedPassword
    }
  });

  const doctor = await prisma.user.upsert({
    where: {
      email_hospitalId: {
        email: "doctor@samarthhospital.test",
        hospitalId: hospital.id
      }
    },
    update: { password: hashedPassword, hospitalId: hospital.id },
    create: {
      hospitalId: hospital.id,
      email: "doctor@samarthhospital.test",
      name: "Dr. Meera Nair",
      role: Role.DOCTOR,
      password: hashedPassword,
      practitioner: {
        create: {
          hospitalId: hospital.id,
          specialty: "Digestive health"
        }
      }
    }
  });

  const patientUser = await prisma.user.upsert({
    where: {
      email_hospitalId: {
        email: "patient@samarthhospital.test",
        hospitalId: hospital.id
      }
    },
    update: { password: hashedPassword, hospitalId: hospital.id },
    create: {
      hospitalId: hospital.id,
      email: "patient@samarthhospital.test",
      name: "Riya Sharma",
      role: Role.PATIENT,
      password: hashedPassword,
      patient: {
        create: {
          hospitalId: hospital.id,
          registrationNumber: "REG-2026-100001",
          isRegistrationLinked: true,
          gender: "F",
          notes: "Registered from reception"
        }
      }
    }
  });

  const practitioner = await prisma.practitioner.findFirst({ where: { userId: doctor.id } });
  const patient = await prisma.patient.findFirst({ where: { userId: patientUser.id } });

  if (practitioner && patient) {
    await prisma.patientRegistration.upsert({
      where: {
        hospitalId_registrationNumber: {
          hospitalId: hospital.id,
          registrationNumber: "REG-2026-100001"
        }
      },
      update: {
        isClaimed: true,
        patientId: patient.id,
        issuedByUserId: reception.id,
        email: patientUser.email
      },
      create: {
        hospitalId: hospital.id,
        registrationNumber: "REG-2026-100001",
        fullName: "Riya Sharma",
        phone: "+910000000001",
        email: patientUser.email,
        gender: "F",
        isClaimed: true,
        patientId: patient.id,
        issuedByUserId: reception.id
      }
    });

    await prisma.patientRegistration.upsert({
      where: {
        hospitalId_registrationNumber: {
          hospitalId: hospital.id,
          registrationNumber: "REG-2026-100002"
        }
      },
      update: {
        fullName: "New Walk-in Patient",
        issuedByUserId: reception.id,
        isClaimed: false
      },
      create: {
        hospitalId: hospital.id,
        registrationNumber: "REG-2026-100002",
        fullName: "New Walk-in Patient",
        phone: "+910000000002",
        issuedByUserId: reception.id,
        isClaimed: false
      }
    });

    const appointment = await prisma.appointment.create({
      data: {
        hospitalId: hospital.id,
        patientId: patient.id,
        practitionerId: practitioner.id,
        start: new Date(),
        end: new Date(Date.now() + 45 * 60 * 1000),
        status: "CONFIRMED"
      }
    });

    const encounter = await prisma.encounter.create({
      data: {
        hospitalId: hospital.id,
        patientId: patient.id,
        practitionerId: practitioner.id,
        appointmentId: appointment.id,
        vitals: JSON.stringify({ bp: "120/80", pulse: 76 }),
        soap: JSON.stringify({ subjective: "Bloating", objective: "Tenderness" }),
        notes: "Initial visit"
      }
    });

    await prisma.prescription.create({
      data: {
        hospitalId: hospital.id,
        patientId: patient.id,
        practitionerId: practitioner.id,
        encounterId: encounter.id,
        items: JSON.stringify([{ name: "Triphala", dose: "2t HS" }]),
        status: "SENT"
      }
    });

    await prisma.invoice.create({
      data: {
        hospitalId: hospital.id,
        patientId: patient.id,
        encounterId: encounter.id,
        amountDue: 180,
        status: "PENDING",
        items: {
          create: [{ description: "Consultation", quantity: 1, unitPrice: 120 }, { description: "Medicines", quantity: 1, unitPrice: 60 }]
        }
      }
    });
  }

  console.log({ hospital: hospital.slug, admin: admin.email, reception: reception.email, doctor: doctor.email, patientUser: patientUser.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
