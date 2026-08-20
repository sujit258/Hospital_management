import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import { clinicSlugFromHost } from "./tenant";
import { permissionsForRole } from "./rbac";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? "development-secret-change-me",
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        clinicCode: { label: "Clinic Code", type: "text" }
      },
      async authorize(credentials, req) {
        console.log("[AUTH] Authorize called", { email: credentials?.email, hasPassword: !!credentials?.password });
        
        if (!credentials?.email || !credentials?.password) {
          console.log("[AUTH] Missing credentials");
          return null;
        }

        const host = req?.headers?.host ?? null;
        const slugFromHost = clinicSlugFromHost(host);
        const clinicCode = String(credentials.clinicCode ?? "").trim().toLowerCase();
        const tenantHint = clinicCode || slugFromHost;

        console.log("[AUTH] Clinic lookup", { host, slugFromHost, clinicCode, tenantHint });

        let clinic = null;
        const parsedHost = host?.split(":")[0]?.toLowerCase();
        if (tenantHint) {
          const conditions: Array<{ slug?: string; customDomain?: string }> = [{ slug: tenantHint }];
          if (parsedHost) conditions.push({ customDomain: parsedHost });

          clinic = await prisma.clinic.findFirst({
            where: {
              OR: conditions
            }
          });
        } else {
          clinic = await prisma.clinic.findFirst({ where: { isActive: true }, orderBy: { createdAt: "asc" } });
        }

        console.log("[AUTH] Clinic found", { found: !!clinic, active: clinic?.isActive });
        if (!clinic || !clinic.isActive) {
          console.log("[AUTH] Clinic not found or inactive");
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
            clinicId: clinic.id
          }
        });

        console.log("[AUTH] User found", { found: !!user, hasPassword: !!user?.password });
        if (!user || !user.password) {
          console.log("[AUTH] User not found or no password");
          return null;
        }
        
        const valid = await bcrypt.compare(credentials.password, user.password);
        console.log("[AUTH] Password valid", { valid });
        if (!valid) return null;

        const permissions = permissionsForRole(user.role);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          clinicId: clinic.id,
          clinicSlug: clinic.slug,
          permissions
        };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const authUser = user as typeof user & {
          clinicId?: string;
          clinicSlug?: string;
          permissions?: string[];
        };
        token.id = user.id;
        token.role = authUser.role;
        token.clinicId = authUser.clinicId;
        token.clinicSlug = authUser.clinicSlug;
        token.permissions = authUser.permissions;
      }

      if ((!token.permissions || token.permissions.length === 0) && token.role) {
        token.permissions = permissionsForRole(String(token.role));
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.clinicId = token.clinicId;
        session.user.clinicSlug = token.clinicSlug;
        session.user.permissions = token.permissions;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/login"
  }
};
