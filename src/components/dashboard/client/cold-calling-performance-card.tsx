"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, PhoneCall, TrendingUp, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ColdCallingCallMeetingChart,
  callMeetingLegend,
} from "./cold-calling-call-meeting-chart";
import { InsightsDrawer } from "./insights-drawer";
import { KeyInsightsGrid } from "./key-insights-grid";

const callInsights = [
  {
    label: "Call activity steady",
    detail: "+8% vs last week",
    icon: TrendingUp,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Call duration optimal",
    detail: "3.6 mins avg",
    icon: AlertTriangle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    label: "Pick-up rate healthy",
    detail: "22% pick-up rate",
    icon: PhoneCall,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    label: "Conversions qualifying well",
    detail: "48 qualified calls",
    icon: UsersRound,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

interface ColdCallingPerformanceCardProps {
  data?: Record<string, any>;
}

export function ColdCallingPerformanceCard({
  data,
}: ColdCallingPerformanceCardProps) {
  const [todayDate, setTodayDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setTodayDate(`${year}-${month}-${day}`);
  }, []);

  const { data: metricsData } = useQuery({
    queryKey: ["cold-calling-metrics", todayDate],
    queryFn: async () => {
      if (!todayDate) return null;
      const response = await fetch(
        `/api/client/metrics/get?serviceId=COLD_CALLING&date=${todayDate}`
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
    queryKey: ["cold-calling-metrics-current-month"],
    queryFn: async () => {
      const response = await fetch(
        `/api/client/metrics/get?serviceId=COLD_CALLING&startDate=${formatDateForApi(currentMonthStart)}&endDate=${formatDateForApi(currentMonthEnd)}`
      );
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
  });

  const { data: previousMonthData } = useQuery({
    queryKey: ["cold-calling-metrics-previous-month"],
    queryFn: async () => {
      const response = await fetch(
        `/api/client/metrics/get?serviceId=COLD_CALLING&startDate=${formatDateForApi(previousMonthStart)}&endDate=${formatDateForApi(previousMonthEnd)}`
      );
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
  });

  const metricHistory = metricsData?.metricHistories?.[0];
  const history = metricHistory?.history || {};

  // Calculate pick-up rate
  const callsMade = Number(history?.calls_made) || 0;
  const callsPickedUp = Number(history?.calls_picked_up) || 0;
  const pickUpRate =
    callsMade > 0 ? Math.round((callsPickedUp / callsMade) * 100) : 0;

  // Calculate month-over-month comparison for calls made
  const calculateTotalCalls = (data: Record<string, any>) => {
    const records = data?.metricHistories || [];
    if (records.length === 0) return 0;
    const sum = records.reduce((acc: number, record: Record<string, any>) => {
      const calls = Number(record.history?.calls_made) || 0;
      return acc + calls;
    }, 0);
    return sum;
  };

  // Calculate average pick-up rate for the month
  const calculateAveragePickUpRate = (data: Record<string, any>) => {
    const records = data?.metricHistories || [];
    if (records.length === 0) return 0;
    const rates = records.map((record: Record<string, any>) => {
      const callsMade = Number(record.history?.calls_made) || 0;
      const callsPickedUp = Number(record.history?.calls_picked_up) || 0;
      return callsMade > 0 ? Math.round((callsPickedUp / callsMade) * 100) : 0;
    });
    return Math.round(rates.reduce((a, b) => a + b, 0) / rates.length);
  };

  // Calculate average meetings booked for the month
  const calculateAverageMeetings = (data: Record<string, any>) => {
    const records = data?.metricHistories || [];
    if (records.length === 0) return 0;
    const sum = records.reduce((acc: number, record: Record<string, any>) => {
      const meetings = Number(record.history?.meetings_booked) || 0;
      return acc + meetings;
    }, 0);
    return Math.round(sum / records.length);
  };

  const currentMonthCalls = calculateTotalCalls(currentMonthData || {});
  const previousMonthCalls = calculateTotalCalls(previousMonthData || {});
  const callsChange = currentMonthCalls - previousMonthCalls;
  const callsIsPositive = callsChange >= 0;

  const currentMonthPickUpRate = calculateAveragePickUpRate(
    currentMonthData || {}
  );
  const previousMonthPickUpRate = calculateAveragePickUpRate(
    previousMonthData || {}
  );
  const pickUpRateChange = currentMonthPickUpRate - previousMonthPickUpRate;
  const pickUpIsPositive = pickUpRateChange >= 0;

  const currentMonthMeetings = calculateAverageMeetings(currentMonthData || {});
  const previousMonthMeetings = calculateAverageMeetings(
    previousMonthData || {}
  );
  const meetingsChange = currentMonthMeetings - previousMonthMeetings;
  const meetingsIsPositive = meetingsChange >= 0;

  const callsPercent = Math.round((currentMonthCalls / 1000) * 100);
  const meetingsPercent = currentMonthMeetings;

  const callQualityMetrics = [
    {
      label: "Calls Made",
      change: callsIsPositive
        ? `↑ ${callsChange}% vs last month`
        : `↓ ${Math.abs(callsChange)}% vs last month`,
      detail: `${callsMade} calls`,
      percent: callsPercent,
    },
    {
      label: "Pick-Up Rate",
      change: pickUpIsPositive
        ? `↑ ${pickUpRateChange}% vs last month`
        : `↓ ${Math.abs(pickUpRateChange)}% vs last month`,
      detail: `${callsPickedUp} picked up`,
      percent: currentMonthPickUpRate,
    },
    {
      label: "Meetings Booked",
      change: meetingsIsPositive
        ? `↑ ${meetingsChange}% vs last month`
        : `↓ ${Math.abs(meetingsChange)}% vs last month`,
      detail: `${history?.meetings_booked || "0"} meetings`,
      percent: meetingsPercent,
    },
  ];

  const coldMetrics = [
    { label: "Calls Made", value: history?.calls_made || "0" },
    {
      label: "Follow Up Scheduled",
      value: history?.follow_ups_scheduled || "0",
    },
    { label: "Meetings Booked", value: history?.meetings_booked || "0" },
    { label: "Pick Up", value: history?.calls_picked_up || "0" },
  ];
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle className="font-semibold text-lg text-slate-900">
                Cold Calling
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
          <InsightsDrawer defaultService="cold-calling" />
        </div>
        <div className="grid gap-4 border-slate-200 border-b pb-6 text-base text-slate-900 md:grid-cols-4 lg:grid-cols-4">
          {coldMetrics.map((metric) => (
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
                Call Quality Metrics
              </p>
              <p className="text-slate-500 text-xs">
                Duration, qualification rate, and follow-ups.
              </p>
            </div>
            <div className="space-y-4">
              {callQualityMetrics.map((metric) => (
                <div className="space-y-2" key={metric.label}>
                  <p className="font-semibold text-slate-900 text-sm">
                    {metric.label}
                  </p>
                  <div className="flex items-center gap-3">
                    <Progress
                      className="h-3 flex-1 rounded-full bg-slate-200"
                      indicatorClassName="rounded-full bg-[#68A1F1]"
                      value={metric.percent}
                    />
                    <span className="font-medium text-slate-500 text-xs">
                      {metric.detail}
                    </span>
                  </div>
                  <div className="font-medium text-emerald-600 text-xs">
                    <span className="font-medium text-emerald-600">
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
            <div>
              <p className="font-semibold text-slate-900 text-sm">
                Call-to-Meeting Performance
              </p>
              <p className="text-slate-500 text-xs">
                Weekly performance comparison.
              </p>
            </div>
            <ColdCallingCallMeetingChart />
            <div className="flex flex-wrap gap-4 text-sm">
              {callMeetingLegend.map((legend) => (
                <div
                  className="inline-flex items-center gap-2 text-slate-600"
                  key={legend.label}
                >
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: legend.color }}
                  />
                  <span>{legend.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <p className="mb-4 font-semibold text-slate-900 text-sm">
            Key Insights
          </p>
          <KeyInsightsGrid insights={callInsights} />
        </section>
      </CardContent>
    </Card>
  );
}
