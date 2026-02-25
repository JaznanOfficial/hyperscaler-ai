"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import type { CSSProperties } from "react";

import { Card, CardContent } from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const conversionConfig = {
  "cmm2b4i9v000010kjjn8gnunc": { // Paid Ads
    label: "Paid Ads",
    color: "#0ea5e9",
  },
  "cmm2b4j58000110kj3fouc7wr": { // Social Media
    label: "Social Media Marketing",
    color: "#f97316",
  },
  "cmm2b4jrx000210kjr0wxdk7s": { // Cold Calling
    label: "Cold Calling",
    color: "#22c55e",
  },
  "cmm2b4khh000310kjfskvvs9k": { // Branding Content
    label: "Branding & Content Creation",
    color: "#a855f7",
  },
  "cmm2b4l4d000410kj1l2q2qkc": { // Cold Linkedin
    label: "Cold LinkedIn Outreach",
    color: "#ec4899",
  },
  "cmm2b4lr0000510kj84s4g4f3": { // Software Development
    label: "Software Development",
    color: "#14b8a6",
  },
} satisfies Record<string, { label: string; color: string }>;

const conversionData = [
  { day: 2 },
  { day: 4 },
  { day: 6 },
  { day: 8 },
  { day: 10 },
  { day: 12 },
  { day: 16 },
  { day: 20 },
  { day: 24 },
  { day: 28 },
  { day: 30 },
];

const dayCategories = conversionData.map((point) => point.day);

interface ConversionRateTrendsCardProps {
  serviceData: Record<string, { serviceName: string; metrics: any; history: any[] }>;
}

export function ConversionRateTrendsCard({ serviceData }: ConversionRateTrendsCardProps) {
  // Filter to only active services
  const activeServiceIds = Object.keys(serviceData).filter(id => conversionConfig[id]);
  
  if (activeServiceIds.length === 0) {
    return (
      <Card className="border-none bg-white shadow-sm">
        <CardContent className="py-8 text-center">
          <p className="text-slate-500 text-sm">No active services to display</p>
        </CardContent>
      </Card>
    );
  }

  // Collect all unique dates from all services
  const allDates = new Set<string>();
  activeServiceIds.forEach(serviceId => {
    const history = serviceData[serviceId]?.history || [];
    history.forEach((record: any) => {
      const date = new Date(record.date);
      allDates.add(date.toISOString().split('T')[0]); // YYYY-MM-DD format
    });
  });

  // Sort dates
  const sortedDates = Array.from(allDates).sort();
  
  // Use dates as categories, or fallback to day numbers if no history
  const categories = sortedDates.length > 0 
    ? sortedDates.map(date => new Date(date).getDate()) 
    : [1];

  // Generate series with real historical data
  const conversionSeries = activeServiceIds.map(serviceId => {
    const history = serviceData[serviceId]?.history || [];
    
    // Map history to conversion rate values
    const dataPoints = sortedDates.map(date => {
      const record = history.find((h: any) => {
        const recordDate = new Date(h.date).toISOString().split('T')[0];
        return recordDate === date;
      });
      
      if (record?.metrics?.["Conversion Rate"]) {
        const value = parseFloat(String(record.metrics["Conversion Rate"]).replace(/[^0-9.-]/g, ''));
        return isNaN(value) ? 0 : value;
      }
      return 0;
    });

    return {
      name: conversionConfig[serviceId].label,
      data: dataPoints.length > 0 ? dataPoints : [0],
    };
  });

  // Generate legend items
  const legendItems = activeServiceIds.map(serviceId => ({
    key: serviceId,
    label: conversionConfig[serviceId].label,
    color: conversionConfig[serviceId].color,
  }));

  // Get colors for active services
  const activeColors = activeServiceIds.map(id => conversionConfig[id].color);

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
    colors: activeColors,
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
      categories: categories,
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
            options={conversionChartOptions}
            series={conversionSeries}
            type="line"
            width="100%"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-center text-sm">
          {legendItems.map((item) => (
            <div
              className="inline-flex items-center gap-2 text-slate-600"
              key={item.key}
            >
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: item.color } as CSSProperties}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
