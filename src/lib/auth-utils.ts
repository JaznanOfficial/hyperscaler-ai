import { redirect } from "next/navigation";
import { auth } from "@/backend/config/auth";

export type UserRole = "ADMIN" | "MANAGER" | "EMPLOYEE" | "CLIENT";

/**
 * Get the appropriate dashboard path for a user role
 */
export function getRoleDashboard(role: UserRole): string {
  switch (role) {
    case "ADMIN":
      return "/s-admin";
    case "MANAGER":
      return "/s-admin";
    case "EMPLOYEE":
      return "/employee";
    case "CLIENT":
      return "/client";
    default:
      return "/login";
  }
}

/**
 * Check if user has required role and redirect if not
 */
export async function requireRole(allowedRoles: UserRole[]) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!allowedRoles.includes(session.user.role as UserRole)) {
    redirect(getRoleDashboard(session.user.role as UserRole));
  }

  return session;
}

/**
 * Check if user is authenticated and redirect to their dashboard if they are
 */
export async function redirectIfAuthenticated() {
  const session = await auth();

  if (session?.user) {
    redirect(getRoleDashboard(session.user.role as UserRole));
  }
}
