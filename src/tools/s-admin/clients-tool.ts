import { tool } from "ai";
import z from "zod";

import { clientService } from "@/backend/services/client.service";
import { AuthGuard } from "@/backend/utils/auth-guard";

interface NormalizedClient {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  companyName?: string;
  subscriptionPlan?: string;
  subscriptionStatus?: string;
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

export const SuperAdminClientsTool = tool({
  description: "List every client in the workspace for super admins.",
  inputSchema: z.object({}),
  execute: async () => {
    await AuthGuard.requireAdmin();

    const clients = await clientService.getAllClients();

    const normalizedClients: NormalizedClient[] = clients.map((client) => {
      const generalInfo = client.generalInfo as Record<string, unknown> | null;

      return {
        id: client.id,
        name: client.name ?? "Unnamed client",
        email: client.email ?? "Unknown",
        createdAt: toIsoString(client.createdAt),
        companyName: toStringValue(generalInfo?.companyName),
        subscriptionPlan: toStringValue(generalInfo?.subscriptionPlan),
        subscriptionStatus:
          toStringValue(generalInfo?.subscriptionStatus) ?? "UNKNOWN",
      };
    });

    const statusCounts = normalizedClients.reduce<Record<string, number>>(
      (acc, client) => {
        const status = client.subscriptionStatus ?? "UNKNOWN";
        acc[status] = (acc[status] ?? 0) + 1;
        return acc;
      },
      {}
    );

    return {
      success: true,
      total: normalizedClients.length,
      statusCounts,
      data: normalizedClients,
    };
  },
});
