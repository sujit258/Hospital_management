import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import { hospitalSlugFromHost } from "./tenant";
import { permissionsForRole } from "./rbac";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        hospitalCode: { label: "Hospital Code", type: "text" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const host = req?.headers?.host ?? null;
        const slugFromHost = hospitalSlugFromHost(host);
        const hospitalCode = String(credentials.hospitalCode ?? "").trim().toLowerCase();
        const tenantHint = hospitalCode || slugFromHost;

        let hospital = null;
        const parsedHost = host?.split(":")[0]?.toLowerCase();
        if (tenantHint) {
          const conditions: Array<{ slug?: string; customDomain?: string }> = [{ slug: tenantHint }];
          if (parsedHost) conditions.push({ customDomain: parsedHost });

          hospital = await prisma.hospital.findFirst({
            where: {
              OR: conditions
            }
          });
        } else {
          hospital = await prisma.hospital.findFirst({ where: { isActive: true }, orderBy: { createdAt: "asc" } });
        }

        if (!hospital || !hospital.isActive) return null;

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
            hospitalId: hospital.id
          }
        });

        if (!user || !user.password) return null;
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        const permissions = permissionsForRole(user.role);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          hospitalId: hospital.id,
          hospitalSlug: hospital.slug,
          permissions
        };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const authUser = user as typeof user & {
          hospitalId?: string;
          hospitalSlug?: string;
          permissions?: string[];
        };
        token.id = user.id;
        token.role = authUser.role;
        token.hospitalId = authUser.hospitalId;
        token.hospitalSlug = authUser.hospitalSlug;
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
        session.user.hospitalId = token.hospitalId;
        session.user.hospitalSlug = token.hospitalSlug;
        session.user.permissions = token.permissions;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/login"
  }
};
