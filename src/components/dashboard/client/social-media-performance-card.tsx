"use client";

import {
  Area,
  AreaChart,
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

const engagementData = [
  { day: "Mon", engagement: 420, impressions: 500, reach: 460 },
  { day: "Tue", engagement: 310, impressions: 380, reach: 340 },
  { day: "Wed", engagement: 365, impressions: 420, reach: 370 },
  { day: "Thu", engagement: 450, impressions: 520, reach: 480 },
  { day: "Fri", engagement: 470, impressions: 540, reach: 500 },
  { day: "Sat", engagement: 510, impressions: 600, reach: 560 },
  { day: "Sun", engagement: 330, impressions: 360, reach: 320 },
];

const engagementConfig = {
  engagement: { label: "Engagement", color: "hsl(var(--chart-1))" },
  impressions: { label: "Impressions", color: "hsl(var(--chart-2))" },
  reach: { label: "Reach", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

const followerGrowth = [
  { day: "Day 5", value: 3 },
  { day: "Day 10", value: 8 },
  { day: "Day 15", value: 13 },
  { day: "Day 20", value: 17 },
  { day: "Day 25", value: 22 },
  { day: "Day 30", value: 30 },
];

const socialMetrics = [
  { label: "Impressions", value: "1.2M" },
  { label: "Engagements", value: "1.8K" },
  { label: "Followers Gained", value: "24.5K" },
  { label: "Profile Visits", value: "2,500" },
  { label: "Shares / Saves", value: "3K" },
  { label: "Conversion Rate", value: "18.2%" },
];

const socialInsights = [
  {
    label: "Audience engagement rising",
    detail: "+11% vs last week",
    color: "from-emerald-500/15 to-emerald-500/5",
  },
  {
    label: "Cost per engagement is optimal",
    detail: "$0.75 CPE (Target: <$1.00)",
    color: "from-amber-500/15 to-amber-500/5",
  },
  {
    label: "Profile traffic consistent",
    detail: "2,500 profile visits (Target: >2,000)",
    color: "from-sky-500/15 to-sky-500/5",
  },
  {
    label: "Follower growth accelerating",
    detail: "450 new followers this month",
    color: "from-purple-500/15 to-purple-500/5",
  },
];

export function SocialMediaPerformanceCard() {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle>Social Media Marketing</CardTitle>
            <CardDescription>
              Multi-platform campaigns snapshot.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 font-semibold text-emerald-700 text-xs">
            <span aria-hidden className="size-2 rounded-full bg-emerald-500" />
            On Track
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-center font-semibold text-base text-slate-900">
          {socialMetrics.map((metric) => (
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
                Engagement Metrics
              </p>
              <p className="text-slate-500 text-xs">
                Weekly totals across all platforms.
              </p>
            </div>
            <ChartContainer className="h-64" config={engagementConfig}>
              <ResponsiveContainer height="100%" width="100%">
                <BarChart
                  data={engagementData}
                  margin={{ left: 0, right: 16, top: 16, bottom: 8 }}
                >
                  <CartesianGrid
                    stroke="rgba(148, 163, 184, 0.35)"
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    axisLine={false}
                    dataKey="day"
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
                    dataKey="engagement"
                    fill="var(--color-engagement)"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="impressions"
                    fill="var(--color-impressions)"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="reach"
                    fill="var(--color-reach)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex flex-wrap gap-4 text-sm">
              {Object.entries(engagementConfig).map(([key, config]) => (
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
          <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
            <div>
              <p className="font-semibold text-slate-900 text-sm">
                Follower Growth Trend
              </p>
              <p className="text-slate-500 text-xs">
                Last 30 days growth trend.
              </p>
            </div>
            <ChartContainer
              className="h-64"
              config={{
                growth: { label: "Growth", color: "hsl(var(--chart-3))" },
              }}
            >
              <ResponsiveContainer height="100%" width="100%">
                <AreaChart
                  data={followerGrowth}
                  margin={{ left: 0, right: 16, top: 16, bottom: 8 }}
                >
                  <defs>
                    <linearGradient
                      id="growthGradient"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--chart-3))"
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--chart-3))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="rgba(148, 163, 184, 0.25)"
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    axisLine={false}
                    dataKey="day"
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
                    cursor={{ stroke: "#cbd5f5", strokeWidth: 1 }}
                  />
                  <Area
                    dataKey="value"
                    fill="url(#growthGradient)"
                    stroke="var(--color-growth)"
                    strokeWidth={3}
                    type="monotone"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="font-semibold text-emerald-600 text-sm">
              ↑ 12% vs last month
            </p>
          </div>
        </section>

        <section>
          <p className="mb-4 font-semibold text-slate-900 text-sm">
            Key Insights
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {socialInsights.map((insight) => (
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
