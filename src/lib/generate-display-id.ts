import { prisma } from "@/backend/config/prisma";

type UserRole = "CLIENT" | "EMPLOYEE" | "MANAGER" | "ADMIN";

const rolePrefixes: Record<UserRole, string> = {
  CLIENT: "CL",
  EMPLOYEE: "EMP",
  MANAGER: "MGR",
  ADMIN: "ADM",
};

export async function generateDisplayId(role: UserRole): Promise<string> {
  const prefix = rolePrefixes[role];

  let counter = (await prisma.user.count({ where: { role } })) + 1;

  while (true) {
    const candidate = `${prefix}-${String(counter).padStart(3, "0")}`;
    const existing = await prisma.user.findUnique({
      where: { displayId: candidate },
    });

    if (!existing) {
      return candidate;
    }

    counter += 1;
  }
}
