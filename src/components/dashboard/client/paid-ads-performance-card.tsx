"use client";

import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
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

const roasData = [
  { day: "Day 5", actual: 1.2, target: 3 },
  { day: "Day 10", actual: 1.6, target: 3 },
  { day: "Day 15", actual: 2.4, target: 3 },
  { day: "Day 20", actual: 3.1, target: 3 },
  { day: "Day 25", actual: 2.8, target: 3 },
  { day: "Day 30", actual: 2.1, target: 3 },
];

const roasConfig = {
  actual: { label: "Actual", color: "hsl(var(--chart-4))" },
  target: { label: "Target", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

const spendDistribution = [
  { name: "Google Ads", value: 3000, color: "hsl(var(--chart-2))" },
  { name: "Meta Ads", value: 2000, color: "hsl(var(--chart-3))" },
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
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle>Paid Ads</CardTitle>
            <CardDescription>
              Google & Meta Ads performance snapshot.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 font-semibold text-emerald-700 text-xs">
            <span aria-hidden className="size-2 rounded-full bg-emerald-500" />
            On Track
          </div>
        </div>
        <div className="w-full border-slate-100 border-t" />
        <div className="flex flex-wrap gap-4 text-center font-semibold text-base text-slate-900">
          {paidMetrics.map((metric) => (
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
                ROAS Performance Trend
              </p>
              <p className="text-slate-500 text-xs">
                30-day performance vs target (3.0x).
              </p>
            </div>
            <ChartContainer className="h-64" config={roasConfig}>
              <ResponsiveContainer height="100%" width="100%">
                <LineChart
                  data={roasData}
                  margin={{ top: 16, right: 16, bottom: 8, left: 8 }}
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
                    domain={[0, 6]}
                    label={{
                      value: "ROAS",
                      angle: -90,
                      position: "insideLeft",
                      fill: "#94a3b8",
                    }}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    tickLine={false}
                  />
                  <ReferenceLine
                    stroke="var(--color-target)"
                    strokeDasharray="4 4"
                    y={3}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    cursor={{ stroke: "#cbd5f5", strokeWidth: 1 }}
                  />
                  <Line
                    dataKey="actual"
                    dot={false}
                    stroke="var(--color-actual)"
                    strokeWidth={3}
                    type="monotone"
                  />
                  <Line
                    dataKey="target"
                    dot={false}
                    stroke="var(--color-target)"
                    strokeDasharray="6 6"
                    strokeWidth={2}
                    type="monotone"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
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
            <ChartContainer
              className="mx-auto h-64 max-w-xs"
              config={{ spend: { color: "hsl(var(--chart-4))" } }}
            >
              <ResponsiveContainer height="100%" width="100%">
                <PieChart>
                  <Pie
                    data={spendDistribution}
                    dataKey="value"
                    innerRadius={70}
                    outerRadius={90}
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
