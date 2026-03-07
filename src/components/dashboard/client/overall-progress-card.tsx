"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DEFAULT_OVERVIEW = {
  overallProgress: "0%",
  activeServices: "0",
  onTrackServices: "0",
  needsAttentionServices: "0",
  timeSaved: "0hrs/week",
};

const parsePercentageValue = (value?: string) => {
  if (!value) {
    return 0;
  }

  const numeric = Number.parseFloat(value.replace(/[^\d.]/g, ""));
  if (Number.isNaN(numeric)) {
    return 0;
  }

  return Math.min(Math.max(numeric, 0), 100);
};

const splitTimeSaved = (value?: string) => {
  if (!value) {
    return { primary: "0", sub: "" };
  }
  const slashIndex = value.indexOf("/");
  if (slashIndex === -1) {
    return { primary: value.trim(), sub: "" };
  }
  return {
    primary: value.slice(0, slashIndex).trim(),
    sub: value.slice(slashIndex).trim(),
  };
};

export function OverallProgressCard() {
  const [overview, setOverview] = useState(DEFAULT_OVERVIEW);
  const [chartValue, setChartValue] = useState(() =>
    parsePercentageValue(DEFAULT_OVERVIEW.overallProgress)
  );

  useEffect(() => {
    let isMounted = true;

    const loadOverview = async () => {
      try {
        const response = await fetch("/api/client/overall-progress");
        if (!response.ok) {
          throw new Error("Failed to fetch overall progress");
        }

        const data = await response.json();
        if (!(data?.success && data?.data && isMounted)) {
          return;
        }

        setOverview((prev) => ({ ...prev, ...data.data }));
        setChartValue(parsePercentageValue(data.data.overallProgress));
      } catch (error) {
        console.error("Client overall progress error", error);
      }
    };

    loadOverview();

    return () => {
      isMounted = false;
    };
  }, []);

  const statusCards = useMemo(() => {
    const timeSaved = splitTimeSaved(overview.timeSaved);
    return [
      {
        label: "Active Services",
        value: overview.activeServices || "0",
        color: "text-sky-600",
        bgColor: "bg-sky-50",
        borderColor: "border-sky-100",
      },
      {
        label: "On Track",
        value: overview.onTrackServices || "0",
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-100",
      },
      {
        label: "Needs Attention",
        value: overview.needsAttentionServices || "0",
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-100",
      },
      {
        label: "Time saved due to AI",
        value: timeSaved.primary || "0",
        subValue: timeSaved.sub,
        color: "text-fuchsia-600",
        bgColor: "bg-fuchsia-50",
        borderColor: "border-fuchsia-100",
        isTimeSaved: true,
      },
    ];
  }, [overview]);
  const chartOptions: ApexOptions = {
    chart: {
      type: "radialBar" as const,
      sparkline: { enabled: true },
      animations: { enabled: true },
    },
    colors: ["#9E32DD"],
    labels: ["Growth"],
    stroke: {
      lineCap: "round",
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#e5e7eb",
          strokeWidth: "50%",
        },
        dataLabels: {
          show: true,
          value: {
            formatter: (val) => `${Math.round(Number(val))}%`,
            fontSize: "36px",
            fontWeight: 700,
            color: "#0f172a",
            offsetY: -10,
          },
          name: {
            show: true,
            offsetY: 20,
            color: "#475569",
            fontSize: "14px",
            fontWeight: 600,
          },
        },
      },
    },
  };

  return (
    <Card className="rounded-3xl border border-slate-100 bg-white">
      <CardContent className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Left side - Main chart (hidden on mobile) */}
        <div className="flex-col items-center justify-center lg:flex lg:w-1/2">
          <div className="w-full">
            <ApexChart
              height={320}
              options={chartOptions}
              series={[chartValue]}
              type="radialBar"
              width="100%"
            />
          </div>
          <div className="mx-auto flex w-70 items-center justify-between font-semibold text-slate-900 text-sm md:w-70 lg:w-70 xl:w-70">
            <span>0</span>
            <span>100</span>
          </div>
        </div>

        {/* Right side - Status cards grid */}
        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-2 gap-4">
            {statusCards.map((card) => (
              <div
                className={`rounded-2xl border ${card.borderColor} ${card.bgColor} p-4`}
                key={card.label}
              >
                <p className="mb-3 font-medium text-slate-700 text-xs">
                  {card.label}
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className={`font-bold text-3xl ${card.color}`}>
                      {card.value}
                    </p>
                    {card.subValue && (
                      <p className={`text-xs ${card.color}`}>{card.subValue}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
