"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ConversionFunnelSection } from "./conversion-funnel-section";
import { InsightsDrawer } from "./insights-drawer";
import { PerformanceTimelineSection } from "./performance-timeline-section";
import { ResponseQualitySection } from "./response-quality-section";

const insights = [
  {
    label: "Reply quality improving",
    detail: "+5% vs last period",
    color: "from-emerald-500/15 to-emerald-500/5",
  },
  {
    label: "Deliverability needs attention",
    detail: "32% bounce rate (target < 5%)",
    color: "from-amber-500/15 to-amber-500/5",
  },
  {
    label: "Inbox reputation healthy",
    detail: "0.5% complaint rate (industry <1%)",
    color: "from-sky-500/15 to-sky-500/5",
  },
  {
    label: "Conversion Rate strong",
    detail: "2% email-to-meeting conversion",
    color: "from-purple-500/15 to-purple-500/5",
  },
];

export function ServicesOverviewCard() {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardContent className="space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-semibold text-lg text-slate-900">
                Cold Email Campaign
              </p>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 text-xs">
                <span
                  aria-hidden
                  className="size-2 rounded-full bg-emerald-500"
                />
                On Track
              </span>
            </div>
            <p className="text-slate-500 text-sm">Outbound prospecting</p>
          </div>
          <InsightsDrawer />
        </div>
        <div className="mt-6 grid gap-4 border-slate-200 border-b pb-6 text-base text-slate-900 md:grid-cols-5">
          {[
            { label: "Emails Sent", value: "12,450" },
            { label: "Open Rate", value: "34.2%" },
            { label: "Reply Rate", value: "8.5%" },
            { label: "Meetings", value: "12" },
            { label: "Conversion", value: "12%" },
          ].map((metric) => (
            <div className="space-y-1 text-left" key={metric.label}>
              <p className="font-medium text-gray-600 text-xs">
                {metric.label}
              </p>
              <p className="font-semibold text-lg leading-5">{metric.value}</p>
            </div>
          ))}
        </div>

        <PerformanceTimelineSection />

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 lg:col-span-1">
            <div>
              <p className="font-semibold text-slate-900 text-sm">
                Conversion Funnel
              </p>
              <p className="text-slate-500 text-xs">
                Track how prospects move from outreach to booked meetings.
              </p>
            </div>
            <ConversionFunnelSection />
          </div>
          <div className="space-y-4 lg:col-span-1">
            <div>
              <p className="font-semibold text-slate-900 text-sm">
                Response Quality Breakdown
              </p>
              <p className="text-slate-500 text-xs">
                Quality of response based on positive and negative responses
              </p>
            </div>
            <ResponseQualitySection />
          </div>
        </section>

        <section>
          <p className="mb-4 font-semibold text-slate-900 text-sm">
            Key Insights
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {insights.map((insight) => (
              <div
                className={cn(
                  "rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm",
                  "bg-linear-to-r",
                  insight.color
                )}
                key={insight.label}
              >
                <p className="font-semibold text-slate-900 text-sm">
                  {insight.label}
                </p>
                <p className="text-slate-600 text-xs">{insight.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
