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
  services: IncludedService[];
};

const DEFAULT_SERVICES: IncludedService[] = [
  {
    id: "default-service-1",
    name: "Managed Campaign",
    meta: "Service Running",
    statusLabel: "On Track",
    statusTone: "success",
  },
  {
    id: "default-service-2",
    name: "Growth Strategy",
    meta: "Service Running",
    statusLabel: "On Track",
    statusTone: "success",
  },
  {
    id: "default-service-3",
    name: "Creative Optimization",
    meta: "Service Running",
    statusLabel: "On Track",
    statusTone: "success",
  },
];

const PLAN_LIBRARY: Record<PlanKey, PlanDefinition> = {
  starter: {
    description:
      "One channel, full automation. Perfect for testing the waters.",
    priceLabel: "$1,000",
    cadenceLabel: "/month",
    nextBillingLabel: "3 Mar 2026",
    services: [
      {
        id: "starter-email",
        name: "Cold Email Setup",
        meta: "Service Running",
        statusLabel: "On Track",
        statusTone: "success",
      },
      {
        id: "starter-reporting",
        name: "Performance Reporting",
        meta: "Weekly Recap",
        statusLabel: "On Track",
        statusTone: "success",
      },
      {
        id: "starter-support",
        name: "Email Support",
        meta: "24/7",
        statusLabel: "On Track",
        statusTone: "success",
      },
    ],
  },
  growth: {
    description: "Multi-channel acquisition with human oversight baked in.",
    priceLabel: "$2,500",
    cadenceLabel: "/month",
    nextBillingLabel: "3 Mar 2026",
    services: [
      {
        id: "growth-email",
        name: "Cold Email Campaign",
        meta: "Service Running",
        statusLabel: "On Track",
        statusTone: "success",
      },
      {
        id: "growth-social",
        name: "Social Media Strategy",
        meta: "Service Running",
        statusLabel: "On Track",
        statusTone: "success",
      },
      {
        id: "growth-web",
        name: "Website Redesign",
        meta: "Service Running",
        statusLabel: "On Track",
        statusTone: "success",
      },
    ],
  },
  pro: {
    description: "Full-stack growth engine for serious scale.",
    priceLabel: "$5,000",
    cadenceLabel: "/month",
    nextBillingLabel: "3 Mar 2026",
    services: [
      {
        id: "pro-paid",
        name: "Paid Media Pods",
        meta: "Service Running",
        statusLabel: "On Track",
        statusTone: "success",
      },
      {
        id: "pro-funnel",
        name: "Funnel Experiments",
        meta: "Weekly Sprints",
        statusLabel: "On Track",
        statusTone: "success",
      },
      {
        id: "pro-success",
        name: "Dedicated Strategist",
        meta: "Bi-weekly Calls",
        statusLabel: "On Track",
        statusTone: "success",
      },
    ],
  },
  enterprise: {
    description: "Custom programs, bespoke automation, and embedded teams.",
    priceLabel: "Custom",
    cadenceLabel: "",
    nextBillingLabel: "On proposal",
    services: [
      {
        id: "enterprise-workshops",
        name: "On-site Workshops",
        meta: "Planned",
        statusLabel: "Scoped",
        statusTone: "warning",
      },
      {
        id: "enterprise-coe",
        name: "Center of Excellence",
        meta: "In rollout",
        statusLabel: "On Track",
        statusTone: "success",
      },
      {
        id: "enterprise-dash",
        name: "Custom Dashboards",
        meta: "In development",
        statusLabel: "Attention",
        statusTone: "attention",
      },
    ],
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

  const renderedServices =
    services && services.length > 0
      ? services
      : (planDefinition?.services ?? DEFAULT_SERVICES);

  return (
    <ActivePlanDetailsCard
      plan={summary}
      services={renderedServices}
      servicesLoading={servicesLoading}
    />
  );
}
