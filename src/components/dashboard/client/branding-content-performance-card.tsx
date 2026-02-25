"use client";

import { AlertTriangle, TrendingUp, UsersRound } from "lucide-react";
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
import { BrandingContentEngagementChart } from "./branding-content-engagement-chart";
import { InsightsDrawer } from "./insights-drawer";
import { KeyInsightsGrid } from "./key-insights-grid";

const clickRateData = [
  { name: "Clicked", value: 46, color: "#147638" },
  { name: "Not Clicked", value: 54, color: "#979CA3" },
];

const brandingInsights = [
  {
    label: "Content driving leads",
    detail: "2.6% Content ➜ Lead conversion rate",
    icon: TrendingUp,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Delivery timelines at risk",
    detail: "3.3 days avg delivery",
    icon: AlertTriangle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    detailColor: "text-amber-600",
  },
  {
    label: "Brand interest increasing",
    detail: "+18% brand search volume",
    icon: TrendingUp,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    label: "Direct traffic accelerating",
    detail: "+21% direct visits",
    icon: UsersRound,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

interface BrandingContentPerformanceCardProps {
  data?: Record<string, any>;
}

export function BrandingContentPerformanceCard({ data }: BrandingContentPerformanceCardProps) {
  const brandingMetrics = [
    { label: "Assets Produced", value: data?.["Articles Published"] || "0" },
    { label: "Approval Rate", value: "95.5%" },
    { label: "Content Engagement", value: data?.["Engagement Rate"] || "0" },
    { label: "Brand Search Volume", value: data?.["Total Views"] || "0" },
    { label: "Conversion Rate", value: data?.["Leads Generated"] || "0" },
  ];
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle className="font-semibold text-lg text-slate-900">
                Branding & Content Creation
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
              Voice-based outreach performance snapshot.
            </CardDescription>
          </div>
          <InsightsDrawer defaultService="branding" />
        </div>
        <div className="grid gap-4 border-slate-200 border-b pb-6 text-base text-slate-900 md:grid-cols-4 lg:grid-cols-5">
          {brandingMetrics.map((metric) => (
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
                Content Engagement Rate
              </p>
              <p className="text-slate-500 text-xs">
                Weekly performance comparison.
              </p>
            </div>
            <BrandingContentEngagementChart />
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
            <div>
              <p className="font-semibold text-slate-900 text-sm">
                Content Click Rate
              </p>
              <p className="text-slate-500 text-xs">
                How effectively content drives user clicks.
              </p>
            </div>
            <ChartContainer className="mx-auto h-72 max-w-sm" config={{}}>
              <ResponsiveContainer height="100%" width="100%">
                <PieChart>
                  <Pie
                    data={clickRateData}
                    dataKey="value"
                    innerRadius={90}
                    outerRadius={120}
                    paddingAngle={2}
                    strokeWidth={0}
                  >
                    {clickRateData.map((entry) => (
                      <Cell fill={entry.color} key={entry.name} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-semibold text-3xl text-slate-900">
                  46%
                </span>
                <span className="text-slate-500 text-xs">Click Rate</span>
              </div>
            </ChartContainer>
            <div className="space-y-2 text-sm">
              {clickRateData.map((item) => (
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
                    {item.value}%
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
          <KeyInsightsGrid insights={brandingInsights} />
        </section>
      </CardContent>
    </Card>
  );
}
