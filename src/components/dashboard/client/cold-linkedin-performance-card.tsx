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
import { ColdLinkedinConversionChart } from "./cold-linkedin-conversion-chart";
import { InsightsDrawer } from "./insights-drawer";

const linkedinMetrics = [
  { label: "Connection Request Sent", value: "42" },
  { label: "Messages Sent", value: "38" },
  { label: "Positive Reply Rates", value: "6%" },
  { label: "Meetings Booked", value: "7" },
];

const clickRateData = [
  { name: "Accepted Requests", value: 46, color: "hsl(var(--chart-2))" },
  { name: "Ignored Requests", value: 54, color: "#cfd8df" },
];

const linkedinInsights = [
  {
    label: "Engaging social media posts",
    detail: "3.1% Engagement ➜ Lead conversion rate",
    color: "from-emerald-500/15 to-emerald-500/5",
  },
  {
    label: "Personalized email campaigns",
    detail: "4.5% Email ➜ Lead conversion rate",
    color: "from-amber-500/15 to-amber-500/5",
  },
  {
    label: "Informative webinars",
    detail: "5.0% Webinar ➜ Lead conversion rate",
    color: "from-sky-500/15 to-sky-500/5",
  },
  {
    label: "Targeted online ads",
    detail: "3.8% Ad ➜ Lead conversion rate",
    color: "from-purple-500/15 to-purple-500/5",
  },
];

export function ColdLinkedinPerformanceCard() {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle className="font-semibold text-lg text-slate-900">
                Cold LinkedIn Outreach
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
          <InsightsDrawer defaultService="cold-linkedin" />
        </div>
        <div className="grid gap-4 border-slate-200 border-b pb-6 text-base text-slate-900 md:grid-cols-4">
          {linkedinMetrics.map((metric) => (
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
              <p className="font-semibold text-slate-900 text-smowered">
                Conversion Rate Growth Trend
              </p>
              <p className="text-slate-500 text-xs">
                Last 30 days connection to lead conversion trend.
              </p>
            </div>
            <ColdLinkedinConversionChart />
            <p className="font-semibold text-emerald-600 text-sm">
              ↑ 12% vs last month
            </p>
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
            <div>
              <p className="font-semibold text-slate-900 text-sm">
                Content Click Rate
              </p>
              <p className="text-slate-500 text-xs">
                How effectively outreach drives responses.
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
                <span className="text-slate-500 text-xs">Accepted</span>
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
          <div className="grid gap-4 md:grid-cols-2">
            {linkedinInsights.map((insight) => (
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
