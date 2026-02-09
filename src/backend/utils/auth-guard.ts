import { auth } from "@/backend/config/auth";
import type { UserRole } from "@prisma/client";

export class AuthGuard {
  static async requireAuth() {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    return session;
  }

  static async requireRole(allowedRoles: UserRole[]) {
    const session = await this.requireAuth();

    if (!allowedRoles.includes(session.user.role as UserRole)) {
      throw new Error("Forbidden");
    }

    return session;
  }

  static async requireAdmin() {
    return this.requireRole(["ADMIN"]);
  }

  static async requireEmployee() {
    return this.requireRole(["EMPLOYEE", "MANAGER"]);
  }

  static async requireClient() {
    return this.requireRole(["CLIENT"]);
  }
}
