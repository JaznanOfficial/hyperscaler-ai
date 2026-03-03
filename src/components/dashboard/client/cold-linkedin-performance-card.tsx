"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Presentation, Target, TrendingUp } from "lucide-react";
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
import { ColdLinkedinConversionChart } from "./cold-linkedin-conversion-chart";
import { InsightsDrawer } from "./insights-drawer";
import { KeyInsightsGrid } from "./key-insights-grid";

// This will be calculated dynamically based on actual data

const linkedinInsights = [
  {
    label: "Engaging social media posts",
    detail: "3.1% Engagement ➜ Lead",
    icon: TrendingUp,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Personalized email campaigns",
    detail: "4.5% Email ➜ Lead",
    icon: AlertTriangle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    label: "Informative webinars",
    detail: "5.0% Webinar ➜ Lead",
    icon: Presentation,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    label: "Targeted online ads",
    detail: "3.8% Ads ➜ Lead",
    icon: Target,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

interface ColdLinkedinPerformanceCardProps {
  data?: Record<string, any>;
}

export function ColdLinkedinPerformanceCard({
  data,
}: ColdLinkedinPerformanceCardProps) {
  const [todayDate, setTodayDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setTodayDate(`${year}-${month}-${day}`);
  }, []);

  const { data: metricsData } = useQuery({
    queryKey: ["linkedin-metrics", todayDate],
    queryFn: async () => {
      if (!todayDate) return null;
      const response = await fetch(
        `/api/client/metrics/get?serviceId=LINKEDIN_OUTREACH&date=${todayDate}`
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
    queryKey: ["linkedin-metrics-current-month"],
    queryFn: async () => {
      const response = await fetch(
        `/api/client/metrics/get?serviceId=LINKEDIN_OUTREACH&startDate=${formatDateForApi(currentMonthStart)}&endDate=${formatDateForApi(currentMonthEnd)}`
      );
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
  });

  const { data: previousMonthData } = useQuery({
    queryKey: ["linkedin-metrics-previous-month"],
    queryFn: async () => {
      const response = await fetch(
        `/api/client/metrics/get?serviceId=LINKEDIN_OUTREACH&startDate=${formatDateForApi(previousMonthStart)}&endDate=${formatDateForApi(previousMonthEnd)}`
      );
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
  });

  const metricHistory = metricsData?.metricHistories?.[0];
  const history = metricHistory?.history || {};

  // Calculate acceptance rate
  const connectionsSent = Number(history?.connections_sent) || 0;
  const connectionsAccepted = Number(history?.connections_accepted) || 0;
  const acceptanceRate =
    connectionsSent > 0
      ? Math.round((connectionsAccepted / connectionsSent) * 100)
      : 0;

  // Calculate month-over-month comparison
  const calculateAverageRate = (data: Record<string, any>) => {
    const records = data?.metricHistories || [];
    if (records.length === 0) return 0;
    const sum = records.reduce((acc: number, record: Record<string, any>) => {
      const rate = Number(record.history?.positive_reply_rate) || 0;
      return acc + rate;
    }, 0);
    return Math.round(sum / records.length);
  };

  const currentMonthRate = calculateAverageRate(currentMonthData || {});
  const previousMonthRate = calculateAverageRate(previousMonthData || {});
  const monthOverMonthChange = currentMonthRate - previousMonthRate;
  const isPositive = monthOverMonthChange >= 0;

  const clickRateData = [
    { name: "Accepted Requests", value: acceptanceRate, color: "#147638" },
    {
      name: "Ignored Requests",
      value: 100 - acceptanceRate,
      color: "#979CA3",
    },
  ];

  const linkedinMetrics = [
    {
      label: "Connection Request Sent",
      value: history?.connections_sent || "0",
    },
    { label: "Messages Sent", value: history?.messages_sent || "0" },
    { label: "Reply Rate", value: history?.reply_rate || "0%" },
    {
      label: "Positive Reply Rates",
      value: history?.positive_reply_rate || "0%",
    },
    { label: "Qualified Leads", value: history?.qualified_leads || "0" },
    { label: "Meetings Booked", value: history?.meetings_booked || "0" },
  ];
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
        <div className="grid gap-4 border-slate-200 border-b pb-6 text-base text-slate-900 md:grid-cols-3 lg:grid-cols-6">
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
            <p
              className={`font-semibold text-sm ${
                isPositive ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {isPositive ? "↑" : "↓"} {Math.abs(monthOverMonthChange)}% vs last
              month
            </p>
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
            <div>
              <p className="font-semibold text-slate-900 text-sm">
                Connection Acceptance Rate
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
                  {acceptanceRate}%
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
          <KeyInsightsGrid insights={linkedinInsights} />
        </section>
      </CardContent>
    </Card>
  );
}
