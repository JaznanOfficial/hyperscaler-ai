import { tool } from "ai";
import z from "zod";

import { clientService } from "@/backend/services/client-service.service";
import { AuthGuard } from "@/backend/utils/auth-guard";

const SERVICE_STATUS_VALUES = ["APPROVED", "PENDING", "CANCELLED"] as const;

type ServiceStatus = (typeof SERVICE_STATUS_VALUES)[number];

const toStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
};

const toUnknownArray = (value: unknown): unknown[] =>
  Array.isArray(value) ? value : [];

const toIsoString = (value: Date | string): string => {
  if (value instanceof Date) {
    return value.toISOString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? new Date().toISOString()
    : parsed.toISOString();
};

export const SuperAdminServicesTool = tool({
  description: "List every project in the workspace for super admins.",
  inputSchema: z.object({}),
  execute: async () => {
    await AuthGuard.requireAdmin();

    const rawProjects = await clientService.getAllProjects();

    const normalizedProjects = rawProjects.map((project) => {
      const assignedEmployees = toStringArray(project.assignedEmployees);
      const services = toUnknownArray(project.services);

      return {
        id: project.id,
        clientId: project.clientId,
        status: project.status as ServiceStatus,
        assignedEmployees,
        assignedEmployeesCount: assignedEmployees.length,
        services,
        servicesCount: services.length,
        createdAt: toIsoString(project.createdAt),
        updatedAt: toIsoString(project.updatedAt),
        isActive: project.status !== "CANCELLED",
      };
    });

    const initialStatusCounts = Object.fromEntries(
      SERVICE_STATUS_VALUES.map((status) => [status, 0])
    ) as Record<ServiceStatus, number>;

    const statusCounts = normalizedProjects.reduce((acc, project) => {
      const status = project.status as ServiceStatus;
      if (acc[status] === undefined) {
        acc[status] = 0;
      }

      acc[status] += 1;
      return acc;
    }, initialStatusCounts);

    return {
      success: true,
      total: normalizedProjects.length,
      activeProjects: normalizedProjects.filter((project) => project.isActive)
        .length,
      statusCounts,
      data: normalizedProjects,
    };
  },
});
