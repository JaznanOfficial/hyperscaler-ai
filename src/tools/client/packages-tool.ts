import { tool } from "ai";
import z from "zod";

import { subscriptionService } from "@/backend/services/subscription.service";
import { AuthGuard } from "@/backend/utils/auth-guard";

const PACKAGE_STATUS_VALUES = ["PAID", "UNPAID", "CANCELLED"] as const;

type PackageStatus = (typeof PACKAGE_STATUS_VALUES)[number];

interface NormalizedPackage {
  id: string;
  subscriptionId: string | null;
  packageName: string;
  status: PackageStatus;
  amountCents: number;
  amountFormatted: string;
  createdAt?: string;
}

const toIsoString = (value: Date | string | null | undefined) => {
  if (!value) {
    return undefined;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
};

const formatAmount = (amountCents: number): string => {
  const dollars = amountCents / 100;
  return `$${dollars.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const ClientPackagesTool = tool({
  description:
    "List every package subscription for the signed-in client, including billing status and spend totals.",
  inputSchema: z.object({}),
  execute: async () => {
    const session = await AuthGuard.requireClient();

    const rawPackages = await subscriptionService.getClientPackages(
      session.user.id
    );

    const normalizedPackages: NormalizedPackage[] = rawPackages.map((pkg) => {
      const amountCents = typeof pkg.amount === "number" ? pkg.amount : 0;

      return {
        id: pkg.id,
        subscriptionId: pkg.subscriptionId ?? null,
        packageName: pkg.packageName ?? "Unknown package",
        status: (pkg.status as PackageStatus) ?? "UNPAID",
        amountCents,
        amountFormatted: formatAmount(amountCents),
        createdAt: toIsoString(pkg.createdAt),
      };
    });

    const initialCounts = Object.fromEntries(
      PACKAGE_STATUS_VALUES.map((status) => [status, 0])
    ) as Record<PackageStatus, number>;

    const statusCounts = normalizedPackages.reduce((acc, pkg) => {
      const status = pkg.status ?? "UNPAID";
      acc[status] = (acc[status] ?? 0) + 1;
      return acc;
    }, initialCounts);

    const totalActive = normalizedPackages.filter(
      (pkg) => pkg.status === "PAID"
    ).length;
    const totalSpendCents = normalizedPackages.reduce(
      (sum, pkg) => sum + pkg.amountCents,
      0
    );

    return {
      success: true,
      total: normalizedPackages.length,
      activePackages: totalActive,
      statusCounts,
      totalMonthlySpend: formatAmount(totalSpendCents),
      data: normalizedPackages,
    };
  },
});
