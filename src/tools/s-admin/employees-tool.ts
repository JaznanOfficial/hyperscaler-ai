import { tool } from "ai";
import z from "zod";

import { userService } from "@/backend/services/user.service";
import { AuthGuard } from "@/backend/utils/auth-guard";

interface NormalizedEmployee {
  id: string;
  name: string;
  email: string;
  role: string;
  title?: string;
  expertise?: string;
  yearsExperience?: number;
  createdAt?: string;
}

const toIsoString = (value?: Date | string | null) => {
  if (!value) {
    return undefined;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
};

const toStringValue = (value: unknown) =>
  typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;

const toPositiveNumber = (value: unknown) => {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed;
    }
  }

  return undefined;
};

export const SuperAdminEmployeesTool = tool({
  description:
    "List every employee for super admins with role and expertise info.",
  inputSchema: z.object({}),
  execute: async () => {
    await AuthGuard.requireAdmin();

    const employees = await userService.getAllEmployees();

    const normalizedEmployees: NormalizedEmployee[] = employees.map(
      (employee) => {
        const generalInfo = employee.generalInfo as Record<
          string,
          unknown
        > | null;

        return {
          id: employee.id,
          name: employee.name ?? "Unnamed employee",
          email: employee.email ?? "Unknown",
          role: employee.role ?? "EMPLOYEE",
          title: toStringValue(generalInfo?.title),
          expertise: toStringValue(generalInfo?.expertise),
          yearsExperience: toPositiveNumber(generalInfo?.yearsExperience),
          createdAt: toIsoString(employee.createdAt),
        };
      }
    );

    const roleCounts = normalizedEmployees.reduce<Record<string, number>>(
      (acc, employee) => {
        const role = employee.role ?? "EMPLOYEE";
        acc[role] = (acc[role] ?? 0) + 1;
        return acc;
      },
      {}
    );

    const totalExperience = normalizedEmployees.reduce((total, employee) => {
      return total + (employee.yearsExperience ?? 0);
    }, 0);

    const averageExperience =
      normalizedEmployees.length > 0
        ? Number((totalExperience / normalizedEmployees.length).toFixed(1))
        : 0;

    return {
      success: true,
      total: normalizedEmployees.length,
      roleCounts,
      averageExperience,
      data: normalizedEmployees,
    };
  },
});
