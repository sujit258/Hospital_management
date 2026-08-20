import type { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      clinicId?: string;
      clinicSlug?: string;
      permissions?: string[];
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
    clinicId?: string;
    clinicSlug?: string;
    permissions?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
    clinicId?: string;
    clinicSlug?: string;
    permissions?: string[];
  }
}
