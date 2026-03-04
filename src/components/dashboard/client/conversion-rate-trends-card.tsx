"use client";

import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import type { CSSProperties } from "react";
import { useMemo } from "react";

import { Card, CardContent } from "@/components/ui/card";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const serviceColorMap: Record<string, string> = {
  PAID_ADS: "#0ea5e9",
  SOCIAL_MEDIA: "#f97316",
  COLD_CALLING: "#22c55e",
  BRAND_CONTENT: "#a855f7",
  LINKEDIN_OUTREACH: "#ec4899",
  COLD_EMAIL: "#06b6d4",
  SOFTWARE_DEVELOPMENT: "#14b8a6",
};

export function ConversionRateTrendsCard() {
  // Fetch all active services' metrics for last 30 days
  const { data: metricsData } = useQuery({
    queryKey: ["conversion-rate-trends-30days"],
    queryFn: async () => {
      const response = await fetch("/api/client/metrics/all?lastDays=30");
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
  });

  const { categories, series, colors, legendItems } = useMemo(() => {
    const allMetrics = metricsData?.data || [];

    // 6 periods: Day 5, 10, 15, 20, 25, 30
    const periodDays = [5, 10, 15, 20, 25, 30];
    const periodLabels = [
      "Day 5",
      "Day 10",
      "Day 15",
      "Day 20",
      "Day 25",
      "Day 30",
    ];

    // Group metrics by service and calculate conversion rates for each period
    const serviceData: Record<string, { name: string; periodRates: number[] }> =
      {};

    for (const metric of allMetrics) {
      const serviceId = metric.serviceId;
      const serviceName = metric.serviceName;

      if (!serviceData[serviceId]) {
        serviceData[serviceId] = {
          name: serviceName,
          periodRates: Array(6).fill(0),
        };
      }

      // Group data by period
      const periodData: Record<number, { values: number[]; count: number }> =
        {};
      for (let i = 0; i < 6; i++) {
        periodData[i] = { values: [], count: 0 };
      }

      for (const historyRecord of metric.metricHistories) {
        const date = new Date(historyRecord.entryDate);
        const dayOfMonth = date.getDate();
        const history = historyRecord.history as Record<string, unknown>;
        let conversionRate = 0;

        if (serviceId === "PAID_ADS") {
          const clicks = Number(history?.clicks) || 0;
          const conversions = Number(history?.conversions) || 0;
          conversionRate = clicks > 0 ? (conversions / clicks) * 100 : 0;
        } else if (serviceId === "SOCIAL_MEDIA") {
          const impressions = Number(history?.impressions) || 0;
          const clicks = Number(history?.clicks) || 0;
          conversionRate = impressions > 0 ? (clicks / impressions) * 100 : 0;
        } else if (serviceId === "COLD_EMAIL") {
          const sent = Number(history?.emails_sent) || 0;
          const replies = Number(history?.replies) || 0;
          conversionRate = sent > 0 ? (replies / sent) * 100 : 0;
        } else if (serviceId === "COLD_CALLING") {
          const calls = Number(history?.calls_made) || 0;
          const conversions = Number(history?.conversions) || 0;
          conversionRate = calls > 0 ? (conversions / calls) * 100 : 0;
        } else if (serviceId === "LINKEDIN_OUTREACH") {
          const outreach = Number(history?.outreach_sent) || 0;
          const responses = Number(history?.responses) || 0;
          conversionRate = outreach > 0 ? (responses / outreach) * 100 : 0;
        } else if (serviceId === "BRAND_CONTENT") {
          const impressions = Number(history?.impressions) || 0;
          const clicks = Number(history?.clicks) || 0;
          conversionRate = impressions > 0 ? (clicks / impressions) * 100 : 0;
        }

        // Determine which period this day belongs to
        let periodIndex = -1;
        if (dayOfMonth <= 5) periodIndex = 0;
        else if (dayOfMonth <= 10) periodIndex = 1;
        else if (dayOfMonth <= 15) periodIndex = 2;
        else if (dayOfMonth <= 20) periodIndex = 3;
        else if (dayOfMonth <= 25) periodIndex = 4;
        else periodIndex = 5;

        if (periodIndex >= 0) {
          periodData[periodIndex].values.push(conversionRate);
          periodData[periodIndex].count++;
        }
      }

      // Calculate average for each period
      for (let i = 0; i < 6; i++) {
        const data = periodData[i];
        if (data.count > 0) {
          const avg = data.values.reduce((a, b) => a + b, 0) / data.count;
          serviceData[serviceId].periodRates[i] = Math.round(avg * 10) / 10;
        }
      }
    }

    // Generate series for all services
    const chartSeries = Object.entries(serviceData).map(([serviceId, data]) => {
      return {
        name: data.name,
        data: data.periodRates,
        serviceId,
      };
    });

    const chartColors = chartSeries.map(
      (s) =>
        serviceColorMap[s.serviceId as keyof typeof serviceColorMap] ||
        "#94a3b8"
    );

    const legend = chartSeries.map((s) => ({
      label: s.name,
      color:
        serviceColorMap[s.serviceId as keyof typeof serviceColorMap] ||
        "#94a3b8",
    }));

    return {
      categories: periodLabels,
      series:
        chartSeries.length > 0
          ? chartSeries
          : [
              {
                name: "Paid Ads",
                data: [5, 8, 12, 15, 18, 22],
              },
            ],
      colors: chartColors.length > 0 ? chartColors : ["#0ea5e9"],
      legendItems:
        legend.length > 0 ? legend : [{ label: "Paid Ads", color: "#0ea5e9" }],
    };
  }, [metricsData]);

  const chartOptions: ApexOptions = {
    chart: {
      id: "conversion-rate-trends",
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "var(--font-outfit, 'Inter', sans-serif)",
    },
    stroke: {
      curve: "smooth",
      width: 2.5,
    },
    colors,
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      strokeWidth: 2,
      strokeColors: "#ffffff",
    },
    grid: {
      borderColor: "#e2e8f0",
      strokeDashArray: 4,
    },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: new Array(categories.length).fill("#94a3b8"),
          fontSize: "12px",
        },
      },
      title: {
        text: "Day",
        offsetY: 60,
        style: { color: "#94a3b8", fontWeight: 500 },
      },
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        formatter: (value) => `${value}`,
        style: {
          colors: ["#94a3b8"],
          fontSize: "12px",
        },
      },
      title: {
        text: "Conversion Rate (%)",
        style: { color: "#475569", fontWeight: 500 },
      },
    },
    legend: { show: false },
    tooltip: {
      theme: "light",
      y: {
        formatter: (value) => `${value}%`,
      },
    },
  };

  return (
    <Card className="border-none bg-white shadow-sm">
      <CardContent className="space-y-6 px-1 lg:px-5">
        <div className="h-90 w-full">
          <ApexChart
            height={360}
            options={chartOptions}
            series={series}
            type="line"
            width="100%"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          {legendItems.map((item) => (
            <div className="inline-flex items-center gap-2" key={item.label}>
              <span
                className="size-3 rounded-full"
                style={{ backgroundColor: item.color } as CSSProperties}
              />
              <span className="text-slate-700">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
