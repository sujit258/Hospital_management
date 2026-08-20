import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Checking production database...\n");
  
  // Check hospitals
  const hospitals = await prisma.hospital.findMany();
  console.log(`Hospitals found: ${hospitals.length}`);
  hospitals.forEach(h => {
    console.log(`  - ${h.name} (slug: ${h.slug}, active: ${h.isActive})`);
  });
  
  // Check users
  const users = await prisma.user.findMany();
  console.log(`\nUsers found: ${users.length}`);
  users.forEach(u => {
    console.log(`  - ${u.email} (role: ${u.role}, hospitalId: ${u.hospitalId}, hasPassword: ${!!u.password})`);
  });
  
  // Check specific test users
  const testEmails = [
    "admin@samarthhospital.test",
    "reception@samarthhospital.test", 
    "doctor@samarthhospital.test",
    "patient@samarthhospital.test"
  ];
  
  console.log("\nTest accounts:");
  for (const email of testEmails) {
    const user = await prisma.user.findFirst({
      where: { email },
      include: { hospital: true }
    });
    if (user) {
      console.log(`  ✓ ${email} - exists (hospital: ${user.hospital?.name}, hasPassword: ${!!user.password})`);
    } else {
      console.log(`  ✗ ${email} - NOT FOUND`);
    }
  }
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
