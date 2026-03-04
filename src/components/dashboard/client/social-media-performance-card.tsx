"use client";

import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  MousePointerClick,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { useEffect, useState } from "react";
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

export function SocialMediaPerformanceCard({
  data,
}: SocialMediaPerformanceCardProps) {
  const [todayDate, setTodayDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setTodayDate(`${year}-${month}-${day}`);
  }, []);

  const { data: metricsData } = useQuery({
    queryKey: ["social-media-metrics", todayDate],
    queryFn: async () => {
      if (!todayDate) return null;
      const response = await fetch(
        `/api/client/metrics/get?serviceId=SOCIAL_MEDIA&date=${todayDate}`
      );
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
    enabled: !!todayDate,
  });

  // Calculate current month and previous month date ranges
  const today = new Date();
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const currentMonthEnd = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  );
  const previousMonthStart = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  );
  const previousMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

  const formatDateForApi = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const { data: currentMonthData } = useQuery({
    queryKey: ["social-media-metrics-current-month"],
    queryFn: async () => {
      const response = await fetch(
        `/api/client/metrics/get?serviceId=SOCIAL_MEDIA&startDate=${formatDateForApi(currentMonthStart)}&endDate=${formatDateForApi(currentMonthEnd)}`
      );
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
  });

  const { data: previousMonthData } = useQuery({
    queryKey: ["social-media-metrics-previous-month"],
    queryFn: async () => {
      const response = await fetch(
        `/api/client/metrics/get?serviceId=SOCIAL_MEDIA&startDate=${formatDateForApi(previousMonthStart)}&endDate=${formatDateForApi(previousMonthEnd)}`
      );
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
  });

  const metricHistory = metricsData?.metricHistories?.[0];
  const history = metricHistory?.history || {};

  // Calculate month-over-month comparison for follower growth
  const calculateAverageFollowers = (data: Record<string, any>) => {
    const records = data?.metricHistories || [];
    if (records.length === 0) return 0;
    const sum = records.reduce((acc: number, record: Record<string, any>) => {
      const followers = Number(record.history?.followers_gained) || 0;
      return acc + followers;
    }, 0);
    return Math.round(sum / records.length);
  };

  const currentMonthFollowers = calculateAverageFollowers(
    currentMonthData || {}
  );
  const previousMonthFollowers = calculateAverageFollowers(
    previousMonthData || {}
  );
  const monthOverMonthChange = currentMonthFollowers - previousMonthFollowers;
  const isPositive = monthOverMonthChange >= 0;

  const socialMetrics = [
    { label: "Impressions", value: history?.impressions || "0" },
    { label: "Engagements", value: history?.engagements || "0" },
    { label: "Followers Gained", value: history?.followers_gained || "0" },
    { label: "Profile Visits", value: history?.profile_visits || "0" },
    { label: "Shares / Saves", value: history?.shares_saves || "0" },
    { label: "Links Clicked", value: history?.links_clicked || "0" },
    { label: "Engagement Rate", value: `${history?.conversion_rate || "0"}%` },
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
            <p
              className={`font-semibold text-sm ${
                isPositive ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {isPositive ? "↑" : "↓"} {Math.abs(monthOverMonthChange)}% vs last
              month
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
