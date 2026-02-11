"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  ColdCallingCallMeetingChart,
  callMeetingLegend,
} from "./cold-calling-call-meeting-chart";
import { InsightsDrawer } from "./insights-drawer";

const coldMetrics = [
  { label: "Calls Made", value: "240" },
  { label: "Pick-Up Rate", value: "56%" },
  { label: "Meetings Booked", value: "24" },
  { label: "Conversion Rate", value: "18.2%" },
];

const callQualityMetrics = [
  {
    label: "Average call duration",
    change: "↑ 18% vs last period",
    detail: "4:32 minutes",
    valueText: "Ideal: 3–5 mins",
    percent: 72,
  },
  {
    label: "Qualified Conversions",
    change: "↑ 8% vs last period",
    detail: "246 (76% of pick-ups)",
    valueText: "Goal: 250",
    percent: 76,
  },
  {
    label: "Follow-Up Scheduled",
    change: "↑ 8% vs last period",
    detail: "153 (62% of qualified)",
    valueText: "Goal: 65%",
    percent: 62,
  },
];

const callInsights = [
  {
    label: "Call activity steady",
    detail: "+8% vs last week",
    color: "from-emerald-500/15 to-emerald-500/5",
  },
  {
    label: "Call duration optimal",
    detail: "3.6 mins avg (Ideal: 3–5 mins)",
    color: "from-amber-500/15 to-amber-500/5",
  },
  {
    label: "Pick-up rate healthy",
    detail: "22% pick-up rate (Target: >20%)",
    color: "from-sky-500/15 to-sky-500/5",
  },
  {
    label: "Conversions qualifying well",
    detail: "48 qualified conversations identified",
    color: "from-purple-500/15 to-purple-500/5",
  },
];

export function ColdCallingPerformanceCard() {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle className="font-semibold text-lg text-slate-900">
                Cold Calling
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
              Voice-based outreach performance.
            </CardDescription>
          </div>
          <InsightsDrawer defaultService="cold-calling" />
        </div>
        <div className="grid gap-4 border-slate-200 border-b pb-6 text-base text-slate-900 md:grid-cols-4">
          {coldMetrics.map((metric) => (
            <div className="space-y-1 text-left" key={metric.label}>
              <p className="font-medium text-gray-600 text-xs">
                {metric.label}
              </p>
              <p className="font-semibold text-lg leading-5">{metric.value}</p>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
            <div>
              <p className="font-semibold text-slate-900 text-sm">
                Call Quality Metrics
              </p>
              <p className="text-slate-500 text-xs">
                Duration, qualification rate, and follow-ups.
              </p>
            </div>
            <div className="space-y-4">
              {callQualityMetrics.map((metric) => (
                <div className="space-y-2" key={metric.label}>
                  <div className="flex flex-wrap items-center justify-between font-semibold text-slate-900 text-sm">
                    <span>{metric.label}</span>
                    <span className="font-medium text-slate-500">
                      {metric.detail}
                    </span>
                  </div>
                  <Progress
                    className="h-3 rounded-full bg-slate-200"
                    indicatorClassName="rounded-full bg-sky-500"
                    value={metric.percent}
                  />
                  <div className="flex flex-wrap items-center justify-between text-slate-500 text-xs">
                    <span className="font-medium text-emerald-600">
                      {metric.change}
                    </span>
                    <span className="font-medium text-slate-600">
                      {metric.valueText}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
            <div>
              <p className="font-semibold text-slate-900 text-sm">
                Call-to-Meeting Performance
              </p>
              <p className="text-slate-500 text-xs">
                Weekly performance comparison.
              </p>
            </div>
            <ColdCallingCallMeetingChart />
            <div className="flex flex-wrap gap-4 text-sm">
              {callMeetingLegend.map((legend) => (
                <div
                  className="inline-flex items-center gap-2 text-slate-600"
                  key={legend.label}
                >
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: legend.color }}
                  />
                  <span>{legend.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <p className="mb-4 font-semibold text-slate-900 text-sm">
            Key Insights
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {callInsights.map((insight) => (
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
