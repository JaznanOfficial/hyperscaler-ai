"use client";

import { LayoutDashboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
}

export function ActivePlanDetailsCard({
  plan,
  services,
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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <IncludedServiceCard key={service.id} service={service} />
          ))}
        </div>
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
            STATUS_STYLES[tone]
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
          asChild={Boolean(service.dashboardHref)}
          className="w-full justify-center gap-2 border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200"
          variant="secondary"
        >
          {service.dashboardHref ? (
            <a href={service.dashboardHref} rel="noreferrer">
              <ButtonContent label="Dashboard" />
            </a>
          ) : (
            <ButtonContent label="Dashboard" />
          )}
        </Button>
        <Button
          asChild={Boolean(service.detailsHref)}
          className="w-full justify-center font-semibold"
          variant="outline"
        >
          {service.detailsHref ? (
            <a href={service.detailsHref} rel="noreferrer">
              View
            </a>
          ) : (
            <>View</>
          )}
        </Button>
      </div>
    </div>
  );
}

function ButtonContent({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <LayoutDashboard className="size-4" />
      {label}
    </span>
  );
}
