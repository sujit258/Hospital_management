import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Testing authentication flow...\n");
  
  const email = "admin@samarthhospital.test";
  const password = "password123";
  const hospitalCode = "samarthhospital";
  
  // Test hospital lookup
  console.log("Step 1: Hospital lookup");
  const hospital = await prisma.hospital.findFirst({
    where: { slug: hospitalCode }
  });
  
  console.log(`Hospital found: ${hospital ? "YES" : "NO"}`);
  if (hospital) {
    console.log(`  - Name: ${hospital.name}`);
    console.log(`  - Slug: ${hospital.slug}`);
    console.log(`  - Active: ${hospital.isActive}`);
  }
  
  // Test user lookup with hospitalId
  console.log("\nStep 2: User lookup with hospitalId");
  if (hospital) {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        hospitalId: hospital.id
      }
    });
    
    console.log(`User found: ${user ? "YES" : "NO"}`);
    if (user) {
      console.log(`  - Email: ${user.email}`);
      console.log(`  - Role: ${user.role}`);
      console.log(`  - Has password: ${!!user.password}`);
      
      // Test password
      console.log("\nStep 3: Password verification");
      const valid = await bcrypt.compare(password, user.password!);
      console.log(`Password valid: ${valid}`);
      
      if (valid) {
        console.log("\n✓ Authentication would succeed");
      } else {
        console.log("\n✗ Authentication would fail - invalid password");
      }
    } else {
      console.log("✗ Authentication would fail - user not found");
    }
  } else {
    console.log("✗ Authentication would fail - hospital not found");
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
