"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { IncludedService } from "@/components/dashboard/client/active-plan-details-card";
import { ActivePlanPreviewCard } from "@/components/dashboard/client/growth-plan-preview-card";
import { RecommendedPackages } from "@/components/dashboard/client/recommended-packages";
import { ClientSubscriptionList } from "@/components/dashboard/client/subscription-list";
import { SubscriptionUpgradePrompt } from "@/components/dashboard/client/subscription-upgrade-prompt";
import { SubscriptionsPageSkeleton } from "@/components/skeleton/subscriptions/subscriptions-page-skeleton";

interface Project {
  id: string;
  status: string;
  services: unknown;
  createdAt: string;
}

function formatFriendlyDate(dateString?: string | null) {
  if (!dateString) {
    return undefined;
  }

  const date = new Date(dateString);
  return Number.isNaN(date.getTime())
    ? undefined
    : date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
}

function addOneMonthIso(dateString?: string | null) {
  if (!dateString) {
    return undefined;
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  const nextMonth = new Date(date);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  return nextMonth.toISOString();
}

interface ClientPackage {
  status: string;
  packageName: string;
  createdAt?: string;
  amount?: number;
  nextBillingAt?: string | null;
}

export default function ClientSubscriptionsPage() {
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [statisticsServices, setStatisticsServices] = useState<
    RawStatisticsService[]
  >([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [statisticsLoading, setStatisticsLoading] = useState(true);
  const [planStatusReady, setPlanStatusReady] = useState(false);
  const [activePlan, setActivePlan] = useState<ClientPackage | null>(null);

  useEffect(() => {
    const success = searchParams.get("success");
    const payment = searchParams.get("payment");
    const packageName = searchParams.get("package");
    const message = searchParams.get("message");

    if (success === "true") {
      toast.success(
        message || "Payment successful! Your service is pending admin approval."
      );
    } else if (payment === "success" && packageName) {
      toast.success(
        `Payment successful! Your ${packageName} package is now active.`
      );
    } else if (payment === "canceled") {
      toast.error("Payment was canceled. Please try again.");
    }
  }, [searchParams]);

  useEffect(() => {
    fetch("/api/client/projects")
      .then((res) => res.json())
      .then((projectsData) => {
        setProjects(projectsData.projects || []);
        setProjectsLoading(false);
      })
      .catch(() => setProjectsLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/client/statistics")
      .then((res) => res.json())
      .then((statsData) => {
        setStatisticsServices(statsData.data || []);
        setStatisticsLoading(false);
      })
      .catch(() => setStatisticsLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/client/packages")
      .then((res) => res.json())
      .then((data) => {
        const packages: ClientPackage[] = data.packages || [];
        const activePkg = packages.find((pkg) => pkg.status === "PAID");
        setActivePlan(activePkg ?? null);
        setPlanStatusReady(true);
      })
      .catch(() => setPlanStatusReady(true));
  }, []);

  const includedServices = useMemo(
    () => buildIncludedServices(projects, statisticsServices),
    [projects, statisticsServices]
  );

  const planContent = useMemo(() => {
    if (!planStatusReady) {
      return <SubscriptionsPageSkeleton />;
    }

    if (activePlan) {
      const derivedNextBilling =
        activePlan.nextBillingAt ?? addOneMonthIso(activePlan.createdAt);
      const formattedNextBilling =
        formatFriendlyDate(derivedNextBilling) ??
        formatFriendlyDate(activePlan.createdAt) ??
        "Pending";
      return (
        <div className="space-y-6">
          <SubscriptionUpgradePrompt currentPlanName={activePlan.packageName} />
          <ActivePlanPreviewCard
            nextBillingLabel={formattedNextBilling}
            planName={activePlan.packageName}
            services={includedServices}
            servicesLoading={projectsLoading || statisticsLoading}
          />
        </div>
      );
    }

    return <RecommendedPackages />;
  }, [
    activePlan,
    includedServices,
    planStatusReady,
    projectsLoading,
    statisticsLoading,
  ]);

  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6">
          <div className="max-w-xl">
            <h1
              className="font-semibold text-3xl leading-10"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              <span className="inline-block bg-linear-to-r from-violet-800 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                Subscriptions
              </span>
            </h1>
            <p className="text-base text-slate-600 leading-3">
              Track the status, billing, and lifecycle of your services
            </p>
          </div>
          {projectsLoading ? (
            <SubscriptionsPageSkeleton />
          ) : (
            <ClientSubscriptionList projects={projects} />
          )}
          {planContent}
        </div>
      </div>
    </section>
  );
}

type RawProjectService = {
  serviceId?: string;
  serviceName?: string;
  serviceSlug?: string;
  description?: string;
};

type RawStatisticsService = {
  serviceId: string;
  serviceName: string;
};

const SERVICE_STATUS_META: Record<
  string,
  { label: string; tone: IncludedService["statusTone"]; meta: string }
> = {
  APPROVED: {
    label: "On Track",
    tone: "success",
    meta: "Service Running",
  },
  PENDING: {
    label: "Pending",
    tone: "warning",
    meta: "Awaiting kickoff",
  },
  CANCELLED: {
    label: "Cancelled",
    tone: "attention",
    meta: "Service paused",
  },
};

function buildIncludedServices(
  projects: Project[],
  statistics: RawStatisticsService[]
): IncludedService[] {
  if (statistics.length > 0) {
    return statistics.map(
      (service, index) =>
        ({
          id: `${service.serviceId || "stat"}-${index}`,
          name: service.serviceName ?? "Service",
          meta: "Service Running",
          statusLabel: "On Track",
          statusTone: "success",
          dashboardHref: `/client/statistics?service=${service.serviceId}`,
          detailsHref: undefined,
        }) satisfies IncludedService
    );
  }

  const statsServiceMap = new Map(
    statistics.map((service) => [service.serviceId, service.serviceName])
  );

  return projects.flatMap((project) => {
    const services = normalizeProjectServices(project.services);
    if (!services.length) {
      return [];
    }

    const statusMeta =
      SERVICE_STATUS_META[project.status] ?? SERVICE_STATUS_META.APPROVED;

    return services.map((service, index) => {
      const safeId = `${project.id}-${service.serviceId ?? index}`;
      const statsName = service.serviceId
        ? statsServiceMap.get(service.serviceId)
        : undefined;
      return {
        id: safeId,
        name: statsName ?? service.serviceName ?? "Service",
        meta: service.description ?? statusMeta.meta,
        statusLabel: statusMeta.label,
        statusTone: statusMeta.tone,
        dashboardHref: service.serviceId
          ? `/client/statistics?service=${service.serviceId}`
          : undefined,
        detailsHref: `/client/services/${project.id}`,
      } satisfies IncludedService;
    });
  });
}

function normalizeProjectServices(raw: unknown): RawProjectService[] {
  if (!raw) {
    return [];
  }

  if (Array.isArray(raw)) {
    return raw as RawProjectService[];
  }

  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as RawProjectService[]) : [];
    } catch {
      return [];
    }
  }

  return [];
}
