"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

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

const callMeetingData = [
  { week: "Week 1", meetings: 90, noConversion: 120 },
  { week: "Week 2", meetings: 60, noConversion: 100 },
  { week: "Week 3", meetings: 110, noConversion: 120 },
  { week: "Week 4", meetings: 95, noConversion: 105 },
];

const callMeetingConfig = {
  meetings: {
    label: "Calls that resulted in meetings",
    color: "hsl(var(--chart-4))",
  },
  noConversion: {
    label: "Calls that didn't convert",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

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
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle>Cold Calling</CardTitle>
            <CardDescription>Voice-based outreach performance.</CardDescription>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 font-semibold text-emerald-700 text-xs">
            <span aria-hidden className="size-2 rounded-full bg-emerald-500" />
            On Track
          </div>
        </div>
        <div className="flex flex-wrap gap-6 text-center font-semibold text-base text-slate-900">
          {coldMetrics.map((metric) => (
            <div className="min-w-24" key={metric.label}>
              <p>{metric.value}</p>
              <p className="font-normal text-slate-500 text-xs">
                {metric.label}
              </p>
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
                <div className="space-y-1" key={metric.label}>
                  <div className="flex flex-wrap items-center justify-between font-medium text-slate-600 text-sm">
                    <span>{metric.label}</span>
                    <span className="text-slate-500">{metric.detail}</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100">
                    <div
                      aria-hidden
                      className="h-full rounded-full bg-linear-to-r from-violet-700 to-fuchsia-500"
                      style={{ width: `${metric.percent}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-slate-500 text-xs">
                    <span>{metric.change}</span>
                    <span>{metric.valueText}</span>
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
            <ChartContainer className="h-64" config={callMeetingConfig}>
              <ResponsiveContainer height="100%" width="100%">
                <BarChart
                  data={callMeetingData}
                  margin={{ left: 0, right: 16, top: 16, bottom: 8 }}
                >
                  <CartesianGrid
                    stroke="rgba(148, 163, 184, 0.35)"
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    axisLine={false}
                    dataKey="week"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis
                    axisLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    tickLine={false}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    cursor={{ fill: "rgba(148, 163, 184, 0.12)" }}
                  />
                  <Bar
                    dataKey="meetings"
                    fill="var(--color-meetings)"
                    radius={[6, 6, 0, 0]}
                    stackId="a"
                  />
                  <Bar
                    dataKey="noConversion"
                    fill="var(--color-noConversion)"
                    radius={[6, 6, 0, 0]}
                    stackId="a"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex flex-wrap gap-4 text-sm">
              {Object.entries(callMeetingConfig).map(([key, config]) => (
                <div
                  className="inline-flex items-center gap-2 text-slate-600"
                  key={key}
                >
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                  <span>{config.label}</span>
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
