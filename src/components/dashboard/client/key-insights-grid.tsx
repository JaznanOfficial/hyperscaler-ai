"use client";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type KeyInsight = {
  label: string;
  detail: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  detailColor?: string;
};

type KeyInsightsGridProps = {
  insights: ReadonlyArray<KeyInsight>;
};

export function KeyInsightsGrid({ insights }: KeyInsightsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {insights.map((insight) => (
        <div className="flex items-center gap-4" key={insight.label}>
          <div
            className={cn(
              "flex size-12 items-center justify-center rounded-lg",
              insight.iconBg
            )}
          >
            <insight.icon
              aria-hidden
              className={cn("size-5", insight.iconColor)}
            />
          </div>
          <div className="space-y-0.5">
            <p className="font-semibold text-slate-900 text-sm leading-tight">
              {insight.label}
            </p>
            <p
              className={cn(
                "font-medium text-slate-600 text-sm",
                insight.detailColor
              )}
            >
              {insight.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
