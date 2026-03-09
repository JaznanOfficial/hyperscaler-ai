import {
  ActivePlanDetailsCard,
  type ActivePlanSummary,
  type IncludedService,
} from "@/components/dashboard/client/active-plan-details-card";

type PlanKey = "starter" | "growth" | "pro" | "enterprise";

type PlanDefinition = {
  description: string;
  priceLabel: string;
  cadenceLabel: string;
  nextBillingLabel: string;
};

const PLAN_LIBRARY: Record<PlanKey, PlanDefinition> = {
  starter: {
    description:
      "One channel, full automation. Perfect for testing the waters.",
    priceLabel: "$1,000",
    cadenceLabel: "/month",
    nextBillingLabel: "3 Mar 2026",
  },
  growth: {
    description: "Multi-channel acquisition with human oversight baked in.",
    priceLabel: "$2,500",
    cadenceLabel: "/month",
    nextBillingLabel: "3 Mar 2026",
  },
  pro: {
    description: "Full-stack growth engine for serious scale.",
    priceLabel: "$5,000",
    cadenceLabel: "/month",
    nextBillingLabel: "3 Mar 2026",
  },
  enterprise: {
    description: "Custom programs, bespoke automation, and embedded teams.",
    priceLabel: "Custom",
    cadenceLabel: "",
    nextBillingLabel: "On proposal",
  },
};

interface ActivePlanPreviewCardProps {
  planName: string;
  nextBillingLabel?: string;
  services?: IncludedService[];
  servicesLoading?: boolean;
}

export function ActivePlanPreviewCard({
  planName,
  nextBillingLabel,
  services,
  servicesLoading,
}: ActivePlanPreviewCardProps) {
  const normalizedPlan = planName.trim().toLowerCase() as PlanKey;
  const planDefinition = PLAN_LIBRARY[normalizedPlan];

  const summary: ActivePlanSummary = {
    name: planName,
    statusLabel: "Active",
    description:
      planDefinition?.description ??
      "Full-service execution with human oversight baked in.",
    priceLabel: planDefinition?.priceLabel ?? "—",
    cadenceLabel: planDefinition?.cadenceLabel ?? "/month",
    nextBillingLabel:
      nextBillingLabel ?? planDefinition?.nextBillingLabel ?? "Pending",
  };

  return (
    <ActivePlanDetailsCard
      plan={summary}
      services={services ?? []}
      servicesLoading={servicesLoading}
    />
  );
}
