"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
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
import { ClientServiceKeyInsights } from "./client-service-key-insights";
import { InsightsDrawer } from "./insights-drawer";

interface BrandingContentPerformanceCardProps {
  data?: Record<string, any>;
}

export function BrandingContentPerformanceCard({
  data,
}: BrandingContentPerformanceCardProps) {
  const [todayDate, setTodayDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setTodayDate(`${year}-${month}-${day}`);
  }, []);

  const { data: metricsData } = useQuery({
    queryKey: ["branding-content-metrics", todayDate],
    queryFn: async () => {
      if (!todayDate) return null;
      const response = await fetch(
        `/api/client/metrics/get?serviceId=BRAND_CONTENT&date=${todayDate}`
      );
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
    enabled: !!todayDate,
  });

  const { brandingMetrics, clickRateData } = useMemo(() => {
    const metricHistory = metricsData?.metricHistories?.[0];
    const history = metricHistory?.history || {};

    const assetsProduced = Number(history?.assets_produced) || 0;
    const approvalRate = Number(history?.approval_rate) || 0;
    const contentEngagementRate = Number(history?.content_engagement_rate) || 0;
    const brandSearchVolume = Number(history?.brand_search_volume) || 0;
    const conversionRate = Number(history?.conversion_rate) || 0;
    const contentClickedRate = Number(history?.content_clicked_rate) || 0;

    const metrics = [
      { label: "Assets Produced", value: assetsProduced.toString() },
      { label: "Approval Rate", value: `${approvalRate.toFixed(1)}%` },
      {
        label: "Content Engagement Rate",
        value: `${contentEngagementRate.toFixed(1)}%`,
      },
      {
        label: "Brand Search Volume",
        value: `${brandSearchVolume.toFixed(1)}%`,
      },
      { label: "Conversion Rate", value: `${conversionRate.toFixed(1)}%` },
    ];

    // Calculate click rate data from content_clicked_rate
    const clickedPercentage = contentClickedRate;
    const notClickedPercentage = 100 - contentClickedRate;

    const clickData = [
      { name: "Clicked", value: clickedPercentage, color: "#147638" },
      { name: "Not Clicked", value: notClickedPercentage, color: "#979CA3" },
    ];

    return {
      brandingMetrics: metrics,
      clickRateData: clickData,
    };
  }, [metricsData]);
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
                  {clickRateData[0]?.value.toFixed(1)}%
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
          <ClientServiceKeyInsights
            serviceId="BRAND_CONTENT"
            serviceName="Branding & Content Creation"
          />
        </section>
      </CardContent>
    </Card>
  );
}
