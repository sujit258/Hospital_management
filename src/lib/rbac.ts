export type AppRole =
  | "SUPER_ADMIN"
  | "HOSPITAL_ADMIN"
  | "ADMIN"
  | "DOCTOR"
  | "NURSE"
  | "FRONT_DESK"
  | "BILLING"
  | "LAB_TECH"
  | "PHARMACY"
  | "STAFF"
  | "PATIENT";

export type PermissionKey =
  | "dashboard.read"
  | "patient.read"
  | "patient.write"
  | "appointment.read"
  | "appointment.manage"
  | "prescription.read"
  | "prescription.write"
  | "invoice.read"
  | "invoice.manage"
  | "registration.issue"
  | "hospital.manage"
  | "role.manage";

export const rolePermissions: Record<AppRole, PermissionKey[]> = {
  SUPER_ADMIN: [
    "dashboard.read",
    "patient.read",
    "patient.write",
    "appointment.read",
    "appointment.manage",
    "prescription.read",
    "prescription.write",
    "invoice.read",
    "invoice.manage",
    "registration.issue",
    "hospital.manage",
    "role.manage"
  ],
  HOSPITAL_ADMIN: [
    "dashboard.read",
    "patient.read",
    "patient.write",
    "appointment.read",
    "appointment.manage",
    "prescription.read",
    "prescription.write",
    "invoice.read",
    "invoice.manage",
    "registration.issue",
    "role.manage"
  ],
  ADMIN: [
    "dashboard.read",
    "patient.read",
    "patient.write",
    "appointment.read",
    "appointment.manage",
    "prescription.read",
    "prescription.write",
    "invoice.read",
    "invoice.manage",
    "registration.issue"
  ],
  DOCTOR: [
    "dashboard.read",
    "patient.read",
    "appointment.read",
    "appointment.manage",
    "prescription.read",
    "prescription.write",
    "invoice.read"
  ],
  NURSE: ["dashboard.read", "patient.read", "appointment.read", "appointment.manage", "prescription.read"],
  FRONT_DESK: ["dashboard.read", "patient.read", "patient.write", "appointment.read", "appointment.manage", "registration.issue"],
  BILLING: ["dashboard.read", "patient.read", "invoice.read", "invoice.manage"],
  LAB_TECH: ["dashboard.read", "patient.read", "appointment.read"],
  PHARMACY: ["dashboard.read", "patient.read", "prescription.read", "invoice.read"],
  STAFF: ["dashboard.read", "patient.read", "appointment.read", "appointment.manage", "invoice.read", "registration.issue"],
  PATIENT: ["dashboard.read", "appointment.read", "prescription.read", "invoice.read"]
};

export const dashboardPermissionByPath: Record<string, PermissionKey> = {
  "/dashboard": "dashboard.read",
  "/dashboard/patients": "patient.read",
  "/dashboard/appointments": "appointment.read",
  "/dashboard/prescriptions": "prescription.read",
  "/dashboard/invoices": "invoice.read"
};

export function normalizeRole(role: string | undefined | null): AppRole | null {
  if (!role) return null;

  if (
    role === "SUPER_ADMIN" ||
    role === "HOSPITAL_ADMIN" ||
    role === "ADMIN" ||
    role === "DOCTOR" ||
    role === "NURSE" ||
    role === "FRONT_DESK" ||
    role === "BILLING" ||
    role === "LAB_TECH" ||
    role === "PHARMACY" ||
    role === "STAFF" ||
    role === "PATIENT"
  ) {
    return role;
  }
  return null;
}

export function permissionsForRole(role: string | undefined | null): PermissionKey[] {
  const normalizedRole = normalizeRole(role);
  if (!normalizedRole) return [];
  return rolePermissions[normalizedRole];
}

export function hasPermission(permissionSet: string[] | undefined | null, required: PermissionKey): boolean {
  if (!permissionSet || permissionSet.length === 0) return false;
  return permissionSet.includes(required);
}

export function canAccessDashboardPath(permissions: string[] | undefined | null, path: string): boolean {
  const matchedRoute = Object.keys(dashboardPermissionByPath)
    .sort((a, b) => b.length - a.length)
    .find((route) => path === route || path.startsWith(`${route}/`));

  if (!matchedRoute) return false;
  return hasPermission(permissions, dashboardPermissionByPath[matchedRoute]);
}

export function dashboardLinksForPermissions(permissions: string[] | undefined | null): string[] {
  return Object.entries(dashboardPermissionByPath)
    .filter(([, permission]) => hasPermission(permissions, permission))
    .map(([path]) => path);
}

export function roleHomePath(permissions: string[] | undefined | null): string {
  if (hasPermission(permissions, "patient.read")) return "/dashboard/patients";
  if (hasPermission(permissions, "appointment.read")) return "/dashboard/appointments";
  if (hasPermission(permissions, "prescription.read")) return "/dashboard/prescriptions";
  if (hasPermission(permissions, "invoice.read")) return "/dashboard/invoices";
  return "/dashboard";
}
