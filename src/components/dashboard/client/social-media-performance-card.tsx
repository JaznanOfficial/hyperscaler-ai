"use client";

import {
  AlertTriangle,
  MousePointerClick,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InsightsDrawer } from "./insights-drawer";
import { KeyInsightsGrid } from "./key-insights-grid";
import {
  SocialMediaEngagementChart,
  socialEngagementLegend,
} from "./social-media-engagement-chart";
import { SocialMediaFollowerGrowthChart } from "./social-media-follower-growth-chart";

const socialInsights = [
  {
    label: "Audience engagement rising",
    detail: "+11% vs last week",
    icon: TrendingUp,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Cost per engagement optimal",
    detail: "$0.75 CPE (Target <$1.00)",
    icon: AlertTriangle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    label: "Profile traffic consistent",
    detail: "2,500 profile visits (Target >2,000)",
    icon: MousePointerClick,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    label: "Follower growth accelerating",
    detail: "450 new followers this month",
    icon: UserPlus,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

interface SocialMediaPerformanceCardProps {
  data?: Record<string, any>;
}

export function SocialMediaPerformanceCard({ data }: SocialMediaPerformanceCardProps) {
  const socialMetrics = [
    { label: "Impressions", value: data?.Impressions || "0" },
    { label: "Engagements", value: data?.["Engagement Rate"] || "0" },
    { label: "Followers Gained", value: data?.Followers || "0" },
    { label: "Profile Visits", value: data?.Reach || "0" },
    { label: "Shares / Saves", value: "0" },
    { label: "Links Clicked", value: data?.["Link Clicks"] || "0" },
    { label: "Conversion Rate", value: data?.["Posts Published"] || "0" },
  ];
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
        <div className="grid gap-4 border-slate-200 border-b pb-6 text-base text-slate-900 md:grid-cols-3 lg:grid-cols-7">
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
          <KeyInsightsGrid insights={socialInsights} />
        </section>
      </CardContent>
    </Card>
  );
}
