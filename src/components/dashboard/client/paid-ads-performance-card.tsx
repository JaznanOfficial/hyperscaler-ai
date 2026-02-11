"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { InsightsDrawer } from "./insights-drawer";
import { PaidAdsRoasTrendChart } from "./paid-ads-roas-trend-chart";

const spendDistribution = [
  { name: "Google Ads", value: 3000, color: "#1e3a8a" },
  { name: "Meta Ads", value: 2000, color: "#6b21a8" },
];

const paidMetrics = [
  { label: "Impressions", value: "1.2M" },
  { label: "Ad Spend", value: "$5,000" },
  { label: "Clicks", value: "24.5K" },
  { label: "CTR", value: "2.4%" },
  { label: "ROAS", value: "3.2x" },
  { label: "Conversion", value: "18.2%" },
];

const paidInsights = [
  {
    label: "Ad relevance improving",
    detail: "+8% vs last period",
    color: "from-emerald-500/15 to-emerald-500/5",
  },
  {
    label: "Cost per click is high",
    detail: "$3.20 CPC (Target: <$2.50)",
    color: "from-amber-500/15 to-amber-500/5",
  },
  {
    label: "ROAS is healthy",
    detail: "3.5x return on ad spend",
    color: "from-sky-500/15 to-sky-500/5",
  },
  {
    label: "Conversion Rate strong",
    detail: "18.2% conversion rate",
    color: "from-purple-500/15 to-purple-500/5",
  },
];

export function PaidAdsPerformanceCard() {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle className="font-semibold text-lg text-slate-900">
                Paid Ads
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
              Google & Meta Ads performance snapshot.
            </CardDescription>
          </div>
          <InsightsDrawer defaultService="paid-ads" />
        </div>
        <div className="grid gap-4 border-slate-200 border-b pb-6 text-base text-slate-900 md:grid-cols-6">
          {paidMetrics.map((metric) => (
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
                ROAS Performance Trend
              </p>
              <p className="text-slate-500 text-xs">
                30-day performance vs target (3.0x).
              </p>
            </div>
            <PaidAdsRoasTrendChart />
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
            <div>
              <p className="font-semibold text-slate-900 text-sm">
                Spend Distribution
              </p>
              <p className="text-slate-500 text-xs">
                Total spend across channels.
              </p>
            </div>
            <ChartContainer className="mx-auto h-72 max-w-sm" config={{}}>
              <ResponsiveContainer height="100%" width="100%">
                <PieChart>
                  <Pie
                    data={spendDistribution}
                    dataKey="value"
                    innerRadius={90}
                    outerRadius={120}
                    paddingAngle={2}
                    strokeWidth={0}
                  >
                    {spendDistribution.map((entry) => (
                      <Cell fill={entry.color} key={entry.name} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-semibold text-3xl text-slate-900">
                  $5,000
                </span>
                <span className="text-slate-500 text-xs">Total Spend</span>
              </div>
            </ChartContainer>
            <div className="space-y-2 text-sm">
              {spendDistribution.map((item) => (
                <div
                  className="flex items-center justify-between text-slate-600"
                  key={item.name}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name}
                  </div>
                  <span className="font-semibold text-slate-900">
                    ${item.value.toLocaleString()} (
                    {Math.round((item.value / 5000) * 100)}%)
                  </span>
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
            {paidInsights.map((insight) => (
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
