"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KeyInsightsGrid } from "./key-insights-grid";
import { SoftwareDevelopmentChartSection } from "./software-development-chart-section";
import { SoftwareDevelopmentClickRateCard } from "./software-development-click-rate-card";
import { softwareInsights } from "./software-development-data";
import { SoftwareDevelopmentMetricsRow } from "./software-development-metrics-row";
import { SoftwareDevelopmentTeamStatusCard } from "./software-development-team-status-card";
import { SoftwareDevelopmentTimelineSection } from "./software-development-timeline-section";

interface SoftwareDevelopmentStatusCardProps {
  data?: Record<string, any>;
}

export function SoftwareDevelopmentStatusCard({ data }: SoftwareDevelopmentStatusCardProps) {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle className="font-semibold text-lg text-slate-900">
                Software Development
              </CardTitle>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 text-xs">
                <span
                  aria-hidden
                  className="size-2 rounded-full bg-emerald-500"
                />
                On Track
              </span>
            </div>
            <CardDescription className="text-slate-500 text-sm">
              Voice-based outreach
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* <SoftwareDevelopmentOverviewSection /> */}

        <section className="grid gap-6 lg:grid-cols-2">
          <SoftwareDevelopmentClickRateCard />
          <SoftwareDevelopmentTeamStatusCard />
        </section>
        <SoftwareDevelopmentMetricsRow />

        <SoftwareDevelopmentChartSection />

        <SoftwareDevelopmentTimelineSection />

        <section>
          <p className="mb-4 font-semibold text-slate-900 text-sm">
            Key Insights
          </p>
          <KeyInsightsGrid insights={softwareInsights} />
        </section>
      </CardContent>
    </Card>
  );
}
