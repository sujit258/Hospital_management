export type AppRole =
  | "SUPER_ADMIN"
  | "CLINIC_ADMIN"
  | "DOCTOR"
  | "RECEPTIONIST"
  | "PATIENT";

export type PermissionKey =
  | "dashboard.read"
  | "patient.read"
  | "patient.write"
  | "appointment.read"
  | "appointment.manage"
  | "consultation.read"
  | "consultation.write"
  | "prescription.read"
  | "prescription.write"
  | "followup.read"
  | "followup.manage"
  | "clinic.manage"
  | "role.manage";

export const rolePermissions: Record<AppRole, PermissionKey[]> = {
  SUPER_ADMIN: [
    "dashboard.read",
    "patient.read",
    "patient.write",
    "appointment.read",
    "appointment.manage",
    "consultation.read",
    "consultation.write",
    "prescription.read",
    "prescription.write",
    "followup.read",
    "followup.manage",
    "clinic.manage",
    "role.manage"
  ],
  CLINIC_ADMIN: [
    "dashboard.read",
    "patient.read",
    "patient.write",
    "appointment.read",
    "appointment.manage",
    "consultation.read",
    "consultation.write",
    "prescription.read",
    "prescription.write",
    "followup.read",
    "followup.manage",
    "role.manage"
  ],
  DOCTOR: [
    "dashboard.read",
    "patient.read",
    "appointment.read",
    "appointment.manage",
    "consultation.read",
    "consultation.write",
    "prescription.read",
    "prescription.write",
    "followup.read",
    "followup.manage"
  ],
  RECEPTIONIST: [
    "dashboard.read",
    "patient.read",
    "patient.write",
    "appointment.read",
    "appointment.manage",
    "followup.read"
  ],
  PATIENT: [
    "dashboard.read",
    "appointment.read",
    "consultation.read",
    "prescription.read",
    "followup.read"
  ]
};

export const dashboardPermissionByPath: Record<string, PermissionKey> = {
  "/dashboard": "dashboard.read",
  "/dashboard/patients": "patient.read",
  "/dashboard/appointments": "appointment.read",
  "/dashboard/consultations": "consultation.read",
  "/dashboard/prescriptions": "prescription.read",
  "/dashboard/followups": "followup.read"
};

export function normalizeRole(role: string | undefined | null): AppRole | null {
  if (!role) return null;

  if (
    role === "SUPER_ADMIN" ||
    role === "CLINIC_ADMIN" ||
    role === "DOCTOR" ||
    role === "RECEPTIONIST" ||
    role === "PATIENT"
  ) {
    return role;
  }
  
  // Handle legacy role mappings
  if (role === "HOSPITAL_ADMIN") return "CLINIC_ADMIN";
  if (role === "FRONT_DESK") return "RECEPTIONIST";
  if (role === "ADMIN") return "CLINIC_ADMIN";
  
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
  if (hasPermission(permissions, "consultation.read")) return "/dashboard/consultations";
  if (hasPermission(permissions, "prescription.read")) return "/dashboard/prescriptions";
  if (hasPermission(permissions, "followup.read")) return "/dashboard/followups";
  return "/dashboard";
}
