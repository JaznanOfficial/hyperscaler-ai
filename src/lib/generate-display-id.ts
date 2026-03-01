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
  
  for (let attempt = 0; attempt < 10; attempt++) {
    const number = String(count + 1 + attempt).padStart(3, "0");
    const displayId = `${prefix}-${number}`;
    
    const existing = await prisma.user.findUnique({
      where: { displayId },
    });
    
    if (!existing) {
      return displayId;
    }
  }
  
  const timestamp = Date.now().toString().slice(-4);
  return `${prefix}-${timestamp}`;
}
