import { tool } from "ai";
import z from "zod";

import { clientService } from "@/backend/services/client-service.service";
import { AuthGuard } from "@/backend/utils/auth-guard";

const PROJECT_STATUS_VALUES = ["APPROVED", "PENDING", "CANCELLED"] as const;

type ProjectStatus = (typeof PROJECT_STATUS_VALUES)[number];

interface NormalizedProject {
  id: string;
  status: ProjectStatus;
  servicesCount: number;
  assignedTeamCount: number;
  createdAt?: string;
  updatedAt?: string;
  isActive: boolean;
}

const toStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
};

const toUnknownArray = (value: unknown): unknown[] =>
  Array.isArray(value) ? value : [];

const toIsoString = (value: Date | string): string | undefined => {
  if (!value) {
    return undefined;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
};

export const ClientProjectsTool = tool({
  description:
    "List every project for the signed-in client, including status and progress summary.",
  inputSchema: z.object({}),
  execute: async () => {
    const session = await AuthGuard.requireClient();

    const rawProjects = await clientService.getClientServices(session.user.id);

    const normalizedProjects: NormalizedProject[] = rawProjects.map(
      (project) => {
        const assignedEmployees = toStringArray(project.assignedEmployees);
        const services = toUnknownArray(project.services);

        return {
          id: project.id,
          status: (project.status as ProjectStatus) ?? "PENDING",
          servicesCount: services.length,
          assignedTeamCount: assignedEmployees.length,
          createdAt: toIsoString(project.createdAt),
          updatedAt: toIsoString(project.updatedAt),
          isActive: project.status !== "CANCELLED",
        };
      }
    );

    const initialStatusCounts = Object.fromEntries(
      PROJECT_STATUS_VALUES.map((status) => [status, 0])
    ) as Record<ProjectStatus, number>;

    const statusCounts = normalizedProjects.reduce((acc, project) => {
      const status = project.status ?? "PENDING";
      acc[status] = (acc[status] ?? 0) + 1;
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
