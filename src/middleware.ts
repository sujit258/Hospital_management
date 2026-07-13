import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { canAccessDashboardPath, permissionsForRole, roleHomePath } from "@/lib/rbac";
import { hospitalSlugFromHost } from "@/lib/tenant";

export default withAuth(
  function middleware(req) {
    const tokenRole = req.nextauth.token?.role as string | undefined;
    const tokenPermissions = req.nextauth.token?.permissions as string[] | undefined;
    const effectivePermissions = tokenPermissions?.length ? tokenPermissions : permissionsForRole(tokenRole);
    const tokenHospitalSlug = req.nextauth.token?.hospitalSlug as string | undefined;
    const { pathname } = req.nextUrl;
    const hostHospitalSlug = hospitalSlugFromHost(req.headers.get("host"));

    if (hostHospitalSlug && tokenHospitalSlug && hostHospitalSlug !== tokenHospitalSlug) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (!canAccessDashboardPath(effectivePermissions, pathname)) {
      const target = roleHomePath(effectivePermissions);
      if (target === pathname) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      return NextResponse.redirect(new URL(target, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
);

export const config = {
  matcher: ["/dashboard/:path*"]
};
