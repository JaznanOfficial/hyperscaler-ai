"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { InsightsDrawer } from "./insights-drawer";
import {
  SocialMediaEngagementChart,
  socialEngagementLegend,
} from "./social-media-engagement-chart";
import { SocialMediaFollowerGrowthChart } from "./social-media-follower-growth-chart";

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
      <CardHeader className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle className="font-semibold text-lg text-slate-900">
                Social Media Marketing
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
              Multi-platform campaigns snapshot.
            </CardDescription>
          </div>
          <InsightsDrawer defaultService="social-media" />
        </div>
        <div className="grid gap-4 border-slate-200 border-b pb-6 text-base text-slate-900 md:grid-cols-6">
          {socialMetrics.map((metric) => (
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
                Engagement Metrics
              </p>
              <p className="text-slate-500 text-xs">
                Weekly totals across all platforms.
              </p>
            </div>
            <SocialMediaEngagementChart />
            <div className="flex flex-wrap gap-4 text-sm">
              {socialEngagementLegend.map((entry) => (
                <div
                  className="inline-flex items-center gap-2 text-slate-600"
                  key={entry.label}
                >
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span>{entry.label}</span>
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
            <SocialMediaFollowerGrowthChart />
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
