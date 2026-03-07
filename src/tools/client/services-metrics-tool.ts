import { tool } from "ai";
import z from "zod";

import { clientService } from "@/backend/services/client-service.service";
import { AuthGuard } from "@/backend/utils/auth-guard";

const CLIENT_SERVICE_STATUS_VALUES = [
  "APPROVED",
  "PENDING",
  "CANCELLED",
] as const;

type ClientServiceStatus = (typeof CLIENT_SERVICE_STATUS_VALUES)[number];

interface NormalizedClientService {
  id: string;
  status: ClientServiceStatus;
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

export const ClientServicesTool = tool({
  description:
    "List every client service for the signed-in client, including status and progress summary.",
  inputSchema: z.object({}),
  execute: async () => {
    const session = await AuthGuard.requireClient();

    const rawClientServices = await clientService.getClientServices(
      session.user.id
    );

    const normalizedClientServices: NormalizedClientService[] =
      rawClientServices.map((clientService) => {
        const assignedEmployees = toStringArray(
          clientService.assignedEmployees
        );
        const services = toUnknownArray(clientService.services);

        return {
          id: clientService.id,
          status: (clientService.status as ClientServiceStatus) ?? "PENDING",
          servicesCount: services.length,
          assignedTeamCount: assignedEmployees.length,
          createdAt: toIsoString(clientService.createdAt),
          updatedAt: toIsoString(clientService.updatedAt),
          isActive: clientService.status !== "CANCELLED",
        };
      });

    const initialStatusCounts = Object.fromEntries(
      CLIENT_SERVICE_STATUS_VALUES.map((status) => [status, 0])
    ) as Record<ClientServiceStatus, number>;

    const statusCounts = normalizedClientServices.reduce(
      (acc, clientService) => {
        const status = clientService.status ?? "PENDING";
        acc[status] = (acc[status] ?? 0) + 1;
        return acc;
      },
      initialStatusCounts
    );

    return {
      success: true,
      total: normalizedClientServices.length,
      activeProjects: normalizedClientServices.filter(
        (clientService) => clientService.isActive
      ).length,
      statusCounts,
      data: normalizedClientServices,
    };
  },
});
