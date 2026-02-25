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
  
  // Get the count of users with this role
  const count = await prisma.user.count({
    where: { role },
  });
  
  // Generate ID like CL-001, EMP-001, etc.
  const number = String(count + 1).padStart(3, "0");
  const displayId = `${prefix}-${number}`;
  
  // Check if it already exists (in case of race condition)
  const existing = await prisma.user.findUnique({
    where: { displayId },
  });
  
  if (existing) {
    // If exists, try with next number
    const nextNumber = String(count + 2).padStart(3, "0");
    return `${prefix}-${nextNumber}`;
  }
  
  return displayId;
}
