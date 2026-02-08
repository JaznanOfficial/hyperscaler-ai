"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import type { CSSProperties } from "react";

import { Card, CardContent } from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const conversionConfig = {
  coldEmail: {
    label: "Cold Email Campaign",
    color: "#7c3aed",
  },
  paidAds: {
    label: "Paid Ads",
    color: "#0ea5e9",
  },
  socialMedia: {
    label: "Social Media Marketing",
    color: "#f97316",
  },
  linkedin: {
    label: "LinkedIn Outreach",
    color: "#22c55e",
  },
} satisfies ChartConfig;

const conversionData = [
  { day: 2, coldEmail: 2, paidAds: 1, socialMedia: 0.5, linkedin: 0.2 },
  { day: 4, coldEmail: 4, paidAds: 2, socialMedia: 1.5, linkedin: 1 },
  { day: 6, coldEmail: 6, paidAds: 4, socialMedia: 3, linkedin: 2 },
  { day: 8, coldEmail: 8, paidAds: 5, socialMedia: 6, linkedin: 4 },
  { day: 10, coldEmail: 10, paidAds: 6, socialMedia: 8, linkedin: 7 },
  { day: 12, coldEmail: 11, paidAds: 8, socialMedia: 9, linkedin: 9 },
  { day: 16, coldEmail: 12, paidAds: 10, socialMedia: 12, linkedin: 12 },
  { day: 20, coldEmail: 13, paidAds: 11, socialMedia: 14, linkedin: 15 },
  { day: 24, coldEmail: 14, paidAds: 12, socialMedia: 16, linkedin: 18 },
  { day: 28, coldEmail: 15, paidAds: 13, socialMedia: 18, linkedin: 20 },
  { day: 30, coldEmail: 16, paidAds: 14, socialMedia: 19, linkedin: 22 },
];

const legendItems = [
  { key: "coldEmail", label: "Cold Email Campaign" },
  { key: "paidAds", label: "Paid Ads" },
  { key: "socialMedia", label: "Social Media Marketing" },
  { key: "linkedin", label: "LinkedIn Outreach" },
];

const dayCategories = conversionData.map((point) => point.day);

const conversionSeries = [
  {
    name: conversionConfig.coldEmail.label,
    data: conversionData.map((point) => point.coldEmail),
  },
  {
    name: conversionConfig.paidAds.label,
    data: conversionData.map((point) => point.paidAds),
  },
  {
    name: conversionConfig.socialMedia.label,
    data: conversionData.map((point) => point.socialMedia),
  },
  {
    name: conversionConfig.linkedin.label,
    data: conversionData.map((point) => point.linkedin),
  },
];

const conversionChartOptions: ApexOptions = {
  chart: {
    id: "conversion-rate-trends",
    type: "line",
    toolbar: { show: false },
    zoom: { enabled: false },
    fontFamily: "var(--font-outfit, 'Inter', sans-serif)",
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  colors: Object.values(conversionConfig).map((config) => config.color),
  dataLabels: {
    enabled: true,
    offsetY: -6,
    style: {
      fontSize: "11px",
      fontWeight: 600,
      colors: ["#0f172a"],
    },
    background: {
      enabled: true,
      borderRadius: 999,
      borderWidth: 0,
      opacity: 0.85,
    },
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
    categories: dayCategories,
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: {
        colors: new Array(dayCategories.length).fill("#94a3b8"),
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
      formatter: (value) => `${value}%`,
      style: {
        color: "#94a3b8",
        fontSize: "12px",
      },
    },
    title: {
      text: "Conversion Rate (%)",
      style: { color: "#94a3b8", fontWeight: 500 },
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

export function ConversionRateTrendsCard() {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardContent className="space-y-6">
        <div className="h-90 w-full">
          <ApexChart
            height={360}
            options={conversionChartOptions}
            series={conversionSeries}
            type="line"
            width="100%"
          />
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          {legendItems.map((item) => (
            <div
              className="inline-flex items-center gap-2 text-slate-600"
              key={item.key}
            >
              <span
                className="size-2.5 rounded-full"
                style={
                  {
                    backgroundColor: `var(--color-${item.key})`,
                  } as CSSProperties
                }
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
