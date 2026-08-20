import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { canAccessDashboardPath, permissionsForRole, roleHomePath } from "@/lib/rbac";
import { clinicSlugFromHost, isMainDomain } from "@/lib/tenant";

export default withAuth(
  function middleware(req) {
    const tokenRole = req.nextauth.token?.role as string | undefined;
    const tokenPermissions = req.nextauth.token?.permissions as string[] | undefined;
    const effectivePermissions = tokenPermissions?.length ? tokenPermissions : permissionsForRole(tokenRole);
    const tokenClinicSlug = req.nextauth.token?.clinicSlug as string | undefined;
    const { pathname } = req.nextUrl;
    const hostClinicSlug = clinicSlugFromHost(req.headers.get("host"));
    const isMain = isMainDomain(req.headers.get("host"));

    // If on main domain and trying to access dashboard, redirect to login
    if (isMain && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // If on subdomain but no clinic slug in token, redirect to login
    if (!isMain && !hostClinicSlug) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // If on subdomain and clinic slug mismatch, redirect to login
    if (hostClinicSlug && tokenClinicSlug && hostClinicSlug !== tokenClinicSlug) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // Check dashboard access permissions
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
  matcher: ["/dashboard/:path*", "/auth/:path*"]
};
