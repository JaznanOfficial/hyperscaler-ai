"use client";

import type { ApexOptions } from "apexcharts";
import { Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const weeklyPerformance = [
  { day: "Sun", emailSent: 40, replies: 8, meetings: 1 },
  { day: "Mon", emailSent: 80, replies: 20, meetings: 4 },
  { day: "Tue", emailSent: 110, replies: 32, meetings: 6 },
  { day: "Wed", emailSent: 140, replies: 56, meetings: 8 },
  { day: "Thu", emailSent: 160, replies: 70, meetings: 10 },
  { day: "Fri", emailSent: 180, replies: 85, meetings: 12 },
  { day: "Sat", emailSent: 190, replies: 92, meetings: 14 },
];

const performanceConfig = {
  emailSent: { label: "Email Sent", color: "#7c3aed" },
  replies: { label: "Reply Generated", color: "#0ea5e9" },
  meetings: { label: "Meetings Booked", color: "#22c55e" },
} satisfies ChartConfig;

const timelineCategories = weeklyPerformance.map((point) => point.day);

const timelineSeries = [
  {
    name: performanceConfig.emailSent.label,
    data: weeklyPerformance.map((point) => point.emailSent),
  },
  {
    name: performanceConfig.replies.label,
    data: weeklyPerformance.map((point) => point.replies),
  },
  {
    name: performanceConfig.meetings.label,
    data: weeklyPerformance.map((point) => point.meetings),
  },
];

const timelineChartOptions: ApexOptions = {
  chart: {
    id: "performance-timeline",
    type: "line",
    toolbar: { show: false },
    zoom: { enabled: false },
    fontFamily: "var(--font-outfit, 'Inter', sans-serif)",
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  colors: Object.values(performanceConfig).map((config) => config.color),
  dataLabels: { enabled: false },
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
    categories: timelineCategories,
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: {
        colors: new Array(timelineCategories.length).fill("#94a3b8"),
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
      style: {
        color: "#94a3b8",
        fontSize: "12px",
      },
    },
    title: {
      text: "Volume",
      style: { color: "#475569", fontWeight: 500 },
    },
  },
  legend: { show: false },
  tooltip: {
    theme: "light",
  },
};

const funnelStages = [
  { label: "Email Sent Rate", value: "100% (5,000 sent)", width: "100%" },
  { label: "Delivery Rate", value: "68% (3,400 delivered)", width: "78%" },
  { label: "Open Rate", value: "22% (1,100 opened)", width: "56%" },
  { label: "Reply Rate", value: "5% (250 replied)", width: "34%" },
  { label: "Meetings", value: "2% (100 meetings)", width: "20%" },
];

const responseQualityData = [
  { name: "Positive", value: 70, color: "hsl(var(--chart-2))" },
  { name: "Negative", value: 30, color: "hsl(var(--chart-5))" },
];

const insights = [
  {
    label: "Reply quality improving",
    detail: "+5% vs last period",
    color: "from-emerald-500/15 to-emerald-500/5",
  },
  {
    label: "Deliverability needs attention",
    detail: "32% bounce rate (target < 5%)",
    color: "from-amber-500/15 to-amber-500/5",
  },
  {
    label: "Inbox reputation healthy",
    detail: "0.5% complaint rate (industry <1%)",
    color: "from-sky-500/15 to-sky-500/5",
  },
  {
    label: "Conversion Rate strong",
    detail: "2% email-to-meeting conversion",
    color: "from-purple-500/15 to-purple-500/5",
  },
];

export function ServicesOverviewCard() {
  const [selectedMetric, setSelectedMetric] = useState("all");

  return (
    <Card className="border-none bg-white shadow-sm">
      <CardContent className="space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-semibold text-lg text-slate-900">
                Cold Email Campaign
              </p>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 text-xs">
                <span
                  aria-hidden
                  className="size-2 rounded-full bg-emerald-500"
                />
                On Track
              </span>
            </div>
            <p className="text-slate-500 text-sm">Outbound prospecting</p>
          </div>
          <Button size={"icon"} variant={"gradient"}>
            <Sparkles className="size-5" />
          </Button>
        </div>
        <div className="mt-6 grid gap-4 border-slate-200 border-b pb-6 text-base text-slate-900 md:grid-cols-5">
          {[
            { label: "Emails Sent", value: "12,450" },
            { label: "Open Rate", value: "34.2%" },
            { label: "Reply Rate", value: "8.5%" },
            { label: "Meetings", value: "12" },
            { label: "Conversion", value: "12%" },
          ].map((metric) => (
            <div className="space-y-1 text-left" key={metric.label}>
              <p className="font-medium text-gray-600 text-xs">
                {metric.label}
              </p>
              <p className="font-semibold text-lg leading-5">{metric.value}</p>
            </div>
          ))}
        </div>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-slate-900 text-sm">
                Performance Timeline
              </p>
              <p className="text-slate-500 text-xs">
                7-day trend comparison across key metrics.
              </p>
            </div>
            <Select onValueChange={setSelectedMetric} value={selectedMetric}>
              <SelectTrigger className="border-slate-200 px-3 py-1 font-medium text-slate-700 text-xs shadow-sm">
                <SelectValue placeholder="All key metrics" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="all">All key metrics</SelectItem>
                <SelectItem value="email">Email Sent</SelectItem>
                <SelectItem value="reply">Reply Generated</SelectItem>
                <SelectItem value="meetings">Meetings Booked</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-72 w-full">
            <ApexChart
              height={288}
              options={timelineChartOptions}
              series={timelineSeries}
              type="line"
              width="100%"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-center text-sm">
            {Object.entries(performanceConfig).map(([key, config]) => (
              <div
                className="inline-flex items-center gap-2 text-slate-600"
                key={key}
              >
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                <span>{config.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <FunnelPanel />
          <ResponseQualityPanel />
        </section>

        <section>
          <p className="mb-4 font-semibold text-slate-900 text-sm">
            Key Insights
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {insights.map((insight) => (
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

function FunnelPanel() {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
      <div>
        <p className="font-semibold text-slate-900 text-sm">
          Conversion Funnel
        </p>
        <p className="text-slate-500 text-xs">
          Track how prospects move from outreach to booked meetings.
        </p>
      </div>
      <div className="space-y-3">
        {funnelStages.map((stage) => (
          <div className="space-y-1" key={stage.label}>
            <div className="flex items-center justify-between font-medium text-slate-500 text-xs">
              <span>{stage.label}</span>
              <span>{stage.value}</span>
            </div>
            <div className="h-4 rounded-full bg-slate-100">
              <div
                aria-hidden
                className="h-full rounded-full bg-linear-to-r from-violet-600 to-fuchsia-500"
                style={{ width: stage.width }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResponseQualityPanel() {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
      <div>
        <p className="font-semibold text-slate-900 text-sm">
          Response Quality Breakdown
        </p>
        <p className="text-slate-500 text-xs">
          Share of positive vs negative replies.
        </p>
      </div>
      <ChartContainer
        className="mx-auto h-56 max-w-xs"
        config={{
          positive: { label: "Positive", color: "hsl(var(--chart-2))" },
        }}
      >
        <ResponsiveContainer height="100%" width="100%">
          <PieChart>
            <Pie
              data={responseQualityData}
              dataKey="value"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={2}
              strokeWidth={0}
            >
              {responseQualityData.map((entry) => (
                <Cell fill={entry.color} key={entry.name} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-semibold text-3xl text-slate-900">70%</span>
          <span className="text-slate-500 text-xs">Positive Response</span>
        </div>
      </ChartContainer>
      <div className="space-y-2 text-sm">
        {responseQualityData.map((item) => (
          <div
            className="flex items-center justify-between text-slate-600"
            key={item.name}
          >
            <div className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name} Response
            </div>
            <span className="font-semibold text-slate-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
