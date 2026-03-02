import { tool } from "ai";
import z from "zod";
import { clientService } from "@/backend/services/client-service.service";
import { AuthGuard } from "@/backend/utils/auth-guard";

const SERVICE_STATUS_VALUES = ["APPROVED", "PENDING", "CANCELLED"] as const;

const serviceStatusSchema = z.enum(SERVICE_STATUS_VALUES);

type ServiceStatus = (typeof SERVICE_STATUS_VALUES)[number];

interface ProjectSummary {
  id: string;
  clientId: string;
  status: ServiceStatus;
  assignedEmployees: string[];
  assignedEmployeesCount: number;
  services: unknown[];
  servicesCount: number;
  createdAt: string;
  updatedAt: string;
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

const toIsoString = (value: Date | string): string => {
  if (value instanceof Date) {
    return value.toISOString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? new Date().toISOString()
    : parsed.toISOString();
};

export const EmployeeServicesTool = tool({
  description:
    "List every project assigned to the current employee with optional filters.",
  inputSchema: z.object({
    status: serviceStatusSchema
      .describe("Filter projects by status, e.g. APPROVED")
      .optional(),
    includeCancelled: z
      .boolean()
      .describe(
        "If false (default) cancelled projects are hidden. Set true to include them."
      )
      .optional(),
  }),
  execute: async ({ status, includeCancelled = true }) => {
    const session = await AuthGuard.requireEmployee();

    const rawServices = await clientService.getEmployeeServices(
      session.user.id
    );

    const normalizedServices: ProjectSummary[] = rawServices.map((project) => {
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

    const filteredProjects = normalizedServices.filter((project) => {
      if (status && project.status !== status) {
        return false;
      }

      if (!includeCancelled && project.status === "CANCELLED") {
        return false;
      }

      return true;
    });

    const statusCounts = normalizedServices.reduce<
      Record<ServiceStatus, number>
    >(
      (acc, project) => {
        acc[project.status] = (acc[project.status] ?? 0) + 1;
        return acc;
      },
      Object.fromEntries(
        SERVICE_STATUS_VALUES.map((option) => [option, 0])
      ) as Record<ServiceStatus, number>
    );

    return {
      success: true,
      total: filteredProjects.length,
      activeProjects: filteredProjects.filter((project) => project.isActive)
        .length,
      statusCounts,
      data: filteredProjects,
      filtersApplied: {
        status: status ?? "ALL",
        includeCancelled,
      },
    };
  },
});
