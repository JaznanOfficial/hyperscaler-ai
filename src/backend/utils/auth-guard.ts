import type { UserRole } from "@prisma/client";
import { auth } from "@/backend/config/auth";

export class AuthGuard {
  static async requireAuth() {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    return session;
  }

  static async requireRole(allowedRoles: UserRole[]) {
    const session = await AuthGuard.requireAuth();

    if (!allowedRoles.includes(session.user.role as UserRole)) {
      throw new Error("Forbidden");
    }

    return session;
  }

  static async requireAdmin() {
    return AuthGuard.requireRole(["ADMIN", "MANAGER"]);
  }

  static async requireEmployee() {
    return AuthGuard.requireRole(["EMPLOYEE", "MANAGER"]);
  }

  static async requireClient() {
    return AuthGuard.requireRole(["CLIENT"]);
  }
}
