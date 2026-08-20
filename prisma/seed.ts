import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const clinic = await prisma.clinic.upsert({
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
      email_clinicId: {
        email: "admin@samarthhospital.test",
        clinicId: clinic.id
      }
    },
    update: { password: hashedPassword, role: Role.CLINIC_ADMIN, clinicId: clinic.id },
    create: {
      clinicId: clinic.id,
      email: "admin@samarthhospital.test",
      name: "Clinic Admin",
      role: Role.CLINIC_ADMIN,
      password: hashedPassword
    }
  });

  const reception = await prisma.user.upsert({
    where: {
      email_clinicId: {
        email: "reception@samarthhospital.test",
        clinicId: clinic.id
      }
    },
    update: { password: hashedPassword, role: Role.RECEPTIONIST, clinicId: clinic.id },
    create: {
      clinicId: clinic.id,
      email: "reception@samarthhospital.test",
      name: "Reception Desk",
      role: Role.RECEPTIONIST,
      password: hashedPassword
    }
  });

  const doctor = await prisma.user.upsert({
    where: {
      email_clinicId: {
        email: "doctor@samarthhospital.test",
        clinicId: clinic.id
      }
    },
    update: { password: hashedPassword, clinicId: clinic.id },
    create: {
      clinicId: clinic.id,
      email: "doctor@samarthhospital.test",
      name: "Dr. Meera Nair",
      role: Role.DOCTOR,
      password: hashedPassword,
      doctorProfile: {
        create: {
          clinicId: clinic.id,
          specialty: "Digestive health",
          qualification: "BHMS",
          experience: 8
        }
      }
    }
  });

  const patientUser = await prisma.user.upsert({
    where: {
      email_clinicId: {
        email: "patient@samarthhospital.test",
        clinicId: clinic.id
      }
    },
    update: { password: hashedPassword, clinicId: clinic.id },
    create: {
      clinicId: clinic.id,
      email: "patient@samarthhospital.test",
      name: "Riya Sharma",
      role: Role.PATIENT,
      password: hashedPassword,
      patient: {
        create: {
          clinicId: clinic.id,
          patientCode: "HC-000001",
          firstName: "Riya",
          lastName: "Sharma",
          fullName: "Riya Sharma",
          gender: "Female",
          dateOfBirth: new Date("1990-05-15"),
          phone: "+919876543210",
          address: "123 Main Street",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001"
        }
      }
    }
  });

  const doctorProfile = await prisma.doctorProfile.findFirst({ where: { userId: doctor.id } });
  const patient = await prisma.patient.findFirst({ where: { userId: patientUser.id } });

  if (doctorProfile && patient) {
    const appointment = await prisma.appointment.create({
      data: {
        clinicId: clinic.id,
        patientId: patient.id,
        doctorId: doctorProfile.id,
        appointmentDate: new Date(),
        startTime: new Date(),
        endTime: new Date(Date.now() + 45 * 60 * 1000),
        type: "NEW_CONSULTATION",
        status: "CONFIRMED",
        reason: "Digestive issues"
      }
    });

    const consultation = await prisma.consultation.create({
      data: {
        clinicId: clinic.id,
        patientId: patient.id,
        doctorId: doctorProfile.id,
        appointmentId: appointment.id,
        chiefComplaint: "Bloating and indigestion",
        symptoms: "Abdominal discomfort after meals",
        observations: "Mild tenderness in epigastric region",
        assessment: "Functional dyspepsia",
        doctorNotes: "Initial consultation",
        constitution: "Nux Vomica type",
        temperament: "Choleric",
        modalities: "Worse from spicy food, better from warm drinks"
      }
    });

    const prescription = await prisma.prescription.create({
      data: {
        clinicId: clinic.id,
        patientId: patient.id,
        doctorId: doctorProfile.id,
        consultationId: consultation.id,
        instructions: "Take before meals",
        followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: "FINALIZED",
        items: {
          create: [
            {
              remedy: "Nux Vomica",
              potency: "30C",
              dose: "3 pellets",
              frequency: "Twice daily",
              duration: "7 days",
              instructions: "Take 15 minutes before meals"
            },
            {
              remedy: "Carbo Vegetabilis",
              potency: "200C",
              dose: "3 pellets",
              frequency: "Once daily",
              duration: "3 days",
              instructions: "Take at bedtime"
            }
          ]
        }
      }
    });

    await prisma.followUp.create({
      data: {
        clinicId: clinic.id,
        patientId: patient.id,
        doctorId: doctorProfile.id,
        consultationId: consultation.id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: "PENDING",
        notes: "Review response to Nux Vomica"
      }
    });
  }

  console.log({ clinic: clinic.slug, admin: admin.email, reception: reception.email, doctor: doctor.email, patientUser: patientUser.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
