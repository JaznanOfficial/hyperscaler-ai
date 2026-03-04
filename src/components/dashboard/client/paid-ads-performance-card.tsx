"use client";

import { useQuery } from "@tanstack/react-query";
import { Activity, AlertTriangle, Target, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
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
import { InsightsDrawer } from "./insights-drawer";
import { KeyInsightsGrid } from "./key-insights-grid";
import { PaidAdsRoasTrendChart } from "./paid-ads-roas-trend-chart";

interface SpendItem {
  name: string;
  value: number;
  color: string;
}

interface PaidAdsPerformanceCardProps {
  data?: Record<string, any>;
}

export function PaidAdsPerformanceCard({ data }: PaidAdsPerformanceCardProps) {
  const [todayDate, setTodayDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setTodayDate(`${year}-${month}-${day}`);
  }, []);

  const { data: metricsData } = useQuery({
    queryKey: ["paid-ads-metrics", todayDate],
    queryFn: async () => {
      if (!todayDate) return null;
      const response = await fetch(
        `/api/client/metrics/get?serviceId=PAID_ADS&date=${todayDate}`
      );
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
    enabled: !!todayDate,
  });

  const metricHistory = metricsData?.metricHistories?.[0];
  const history = metricHistory?.history || {};

  // Combine meta and google data
  const combinedMetrics: Record<string, string | number> = {
    Impressions: "0",
    Clicks: "0",
    Reach: "0",
    "Cost-per-click (CPC)": "$0",
    "Cost-per-lead (CPL)": "$0",
    "Click-Through Rate (CTR)": "0%",
    "Conversion Rate": "0%",
  };

  const fields = [
    "impressions",
    "clicks",
    "reach",
    "cost_per_click",
    "cost_per_lead",
    "click_through_rate",
    "conversion_rate",
  ];

  // Extract meta and google data
  const metaData = history?.meta || {};
  const googleData = history?.google || {};

  // Impressions, Clicks, Reach - sum them
  combinedMetrics.Impressions = (
    (Number(metaData?.impressions) || 0) +
    (Number(googleData?.impressions) || 0)
  ).toString();
  combinedMetrics.Clicks = (
    (Number(metaData?.clicks) || 0) + (Number(googleData?.clicks) || 0)
  ).toString();
  combinedMetrics.Reach = (
    (Number(metaData?.reach) || 0) + (Number(googleData?.reach) || 0)
  ).toString();

  // Cost-per-click and Cost-per-lead - sum them
  const metaCPC = Number(metaData?.cpc) || 0;
  const googleCPC = Number(googleData?.cpc) || 0;
  combinedMetrics["Cost-per-click (CPC)"] =
    metaCPC + googleCPC > 0 ? `$${(metaCPC + googleCPC).toFixed(2)}` : "$0";

  const metaCPL = Number(metaData?.cpl) || 0;
  const googleCPL = Number(googleData?.cpl) || 0;
  combinedMetrics["Cost-per-lead (CPL)"] =
    metaCPL + googleCPL > 0 ? `$${(metaCPL + googleCPL).toFixed(2)}` : "$0";

  // CTR and Conversion Rate - average them
  const metaCTR = Number(metaData?.ctr) || 0;
  const googleCTR = Number(googleData?.ctr) || 0;
  const ctrCount = (metaData?.ctr ? 1 : 0) + (googleData?.ctr ? 1 : 0);
  const avgCTR = ctrCount > 0 ? (metaCTR + googleCTR) / ctrCount : 0;
  combinedMetrics["Click-Through Rate (CTR)"] =
    avgCTR > 0 ? `${avgCTR.toFixed(2)}%` : "0%";

  const metaConv = Number(metaData?.conversion_rate) || 0;
  const googleConv = Number(googleData?.conversion_rate) || 0;
  const convCount =
    (metaData?.conversion_rate ? 1 : 0) + (googleData?.conversion_rate ? 1 : 0);
  const avgConv = convCount > 0 ? (metaConv + googleConv) / convCount : 0;
  combinedMetrics["Conversion Rate"] =
    avgConv > 0 ? `${avgConv.toFixed(2)}%` : "0%";

  // Calculate spend distribution
  const metaCosts = Number(metaData?.costs) || 0;
  const googleCosts = Number(googleData?.costs) || 0;
  const totalSpend = metaCosts + googleCosts;

  const spendDistribution: SpendItem[] = [
    { name: "Google Ads", value: googleCosts, color: "#1e3a8a" },
    { name: "Meta Ads", value: metaCosts, color: "#6b21a8" },
  ];

  const paidMetrics = [
    { label: "Impressions", value: combinedMetrics.Impressions || "0" },
    { label: "Clicks", value: combinedMetrics.Clicks || "0" },
    { label: "Reach", value: combinedMetrics.Reach || "0" },
    {
      label: "Cost-per-click (CPC)",
      value: combinedMetrics["Cost-per-click (CPC)"] || "$0",
    },
    {
      label: "Cost-per-lead (CPL)",
      value: combinedMetrics["Cost-per-lead (CPL)"] || "$0",
    },
    {
      label: "Click-Through Rate (CTR)",
      value: combinedMetrics["Click-Through Rate (CTR)"] || "0%",
    },
    {
      label: "Conversion Rate",
      value: combinedMetrics["Conversion Rate"] || "0%",
    },
  ];

  const paidInsights = [
    {
      label: "Ad relevance improving",
      detail: "+8% vs last period",
      icon: TrendingUp,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "Cost per click is high",
      detail: "$3.20 CPC (Target <$2.50)",
      icon: AlertTriangle,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      detailColor: "text-amber-600",
    },
    {
      label: "ROAS is healthy",
      detail: "3.5x return on ad spend",
      icon: Activity,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
    },
    {
      label: "Conversion Rate strong",
      detail: data?.["Conversion Rate"] || "0%",
      icon: Target,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];
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
        <div className="grid gap-4 border-slate-200 border-b pb-6 text-base text-slate-900 md:grid-cols-3 lg:grid-cols-7">
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
              <p className="text-slate-500 text-xs">30-day performance.</p>
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
                  ${totalSpend.toLocaleString()}
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
                    {totalSpend > 0
                      ? Math.round((item.value / totalSpend) * 100)
                      : 0}
                    %)
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
          <KeyInsightsGrid insights={paidInsights} />
        </section>
      </CardContent>
    </Card>
  );
}
