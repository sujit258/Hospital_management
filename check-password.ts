import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Testing password verification...\n");
  
  const user = await prisma.user.findFirst({
    where: { email: "admin@samarthhospital.test" }
  });
  
  if (!user) {
    console.log("User not found");
    return;
  }
  
  console.log(`User: ${user.email}`);
  console.log(`Has password: ${!!user.password}`);
  console.log(`Password length: ${user.password?.length}`);
  
  // Test password verification
  const testPassword = "password123";
  const isValid = await bcrypt.compare(testPassword, user.password!);
  
  console.log(`\nTesting password "${testPassword}":`);
  console.log(`Valid: ${isValid}`);
  
  // Test with wrong password
  const wrongPassword = "wrongpassword";
  const isWrongValid = await bcrypt.compare(wrongPassword, user.password!);
  
  console.log(`Testing password "${wrongPassword}":`);
  console.log(`Valid: ${isWrongValid}`);
  
  // Check NEXTAUTH_SECRET
  console.log(`\nNEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET ? "Set" : "NOT SET"}`);
  console.log(`NEXTAUTH_SECRET length: ${process.env.NEXTAUTH_SECRET?.length}`);
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
