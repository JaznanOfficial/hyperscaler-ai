"use client";

import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type ActivePlanSummary = {
  name: string;
  statusLabel: string;
  description: string;
  priceLabel?: string;
  cadenceLabel?: string;
  nextBillingLabel: string;
};

export type IncludedService = {
  id: string;
  name: string;
  meta: string;
  statusLabel: string;
  statusTone: "success" | "warning" | "attention";
  dashboardHref?: string;
  detailsHref?: string;
};

const STATUS_STYLES: Record<IncludedService["statusTone"], string> = {
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  attention: "bg-rose-100 text-rose-700",
};

const STATUS_DOT_STYLES: Record<IncludedService["statusTone"], string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  attention: "bg-rose-500",
};

interface ActivePlanDetailsCardProps {
  plan: ActivePlanSummary;
  services: IncludedService[];
  servicesLoading?: boolean;
}

export function ActivePlanDetailsCard({
  plan,
  services,
  servicesLoading,
}: ActivePlanDetailsCardProps) {
  return (
    <Card className="space-y-6 border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-3">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-4">
            <h3
              className="font-['Outfit'] font-semibold text-2xl text-slate-900"
              data-testid="active-plan-name"
            >
              {plan.name}
            </h3>
            <Badge
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-800 text-xs"
              variant="secondary"
            >
              <span className="size-2 rounded-full bg-emerald-500" />
              {plan.statusLabel}
            </Badge>
          </div>
          <p className="text-slate-600 text-sm">{plan.description}</p>
        </div>
        <div className="flex flex-col gap-3 text-slate-600 text-sm md:flex-row md:items-center md:gap-10">
          <div className="flex items-baseline gap-2">
            <p className="font-['Outfit'] font-semibold text-3xl text-slate-900">
              {plan.priceLabel}
            </p>
            <span className="text-slate-500">{plan.cadenceLabel}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Next billing:</span>
            <span className="font-medium text-slate-900">
              {plan.nextBillingLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="h-px w-full border-slate-200 border-t" />

      <div className="space-y-3">
        <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">
          Included services ~
        </p>
        {servicesLoading ? (
          <ServiceSkeletonGrid />
        ) : services.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <IncludedServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <ActivationPendingCard />
        )}
      </div>
    </Card>
  );
}

function IncludedServiceCard({ service }: { service: IncludedService }) {
  const tone = service.statusTone;
  return (
    <div className="flex h-full flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="font-semibold text-base text-slate-900">
            {service.name}
          </p>
          <p className="font-medium text-slate-500 text-sm">{service.meta}</p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold text-xs",
            STATUS_STYLES[tone],
          )}
        >
          <span
            className={cn("size-2 rounded-full", STATUS_DOT_STYLES[tone])}
          />
          {service.statusLabel}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          asChild
          className="w-full justify-center font-semibold"
          variant="outline"
        >
          <a
            href={service.detailsHref || "/client/statistics"}
            rel="noreferrer"
          >
            View
          </a>
        </Button>
      </div>
    </div>
  );
}

function ServiceSkeletonGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((id) => (
        <div
          className="flex h-full flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          key={id}
        >
          <div className="space-y-3">
            <Skeleton className="h-5 w-40 rounded-full" />
            <Skeleton className="h-4 w-32 rounded-full" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-11 w-full rounded-md" />
            <Skeleton className="h-11 w-full rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ActivationPendingCard() {
  return (
    <div className="relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-slate-200 bg-purple-50 p-6 text-left shadow-sm">
      <div className="relative z-10 space-y-2">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-purple-200/70 p-3 text-purple-800">
            <Rocket className="size-5" />
          </div>
          <p className="font-semibold text-base text-slate-900">
            Your Plan Is Being Activated
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-slate-600 text-sm">
            We’re reviewing your subscription and will reach out shortly to help
            you select your services and schedule your strategy session.
          </p>
          <p className="font-semibold text-purple-600 text-sm">
            Prefer to move faster? You can book a call with our experts anytime.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              className="w-full sm:w-auto"
              href="/onboarding/book-a-demo/"
              target="_blank"
            >
              <Button
                className="group inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                variant={"gradient"}
              >
                Book a Strategy Session
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <TalkToSalesDrawer
              buttonClassName="w-full border border-slate-200 bg-white text-slate-700 sm:w-auto"
              buttonLabel="Contact Support"
              buttonVariant="outline"
            />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-purple-100" />
      <div className="pointer-events-none absolute -top-16 -right-5 h-28 w-28 rounded-full bg-purple-200/80" />
    </div>
  );
}
