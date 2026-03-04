"use client";

import { useQuery } from "@tanstack/react-query";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function ConversionFunnelSection() {
  const { data: metricsData } = useQuery({
    queryKey: ["cold-email-conversion-funnel"],
    queryFn: async () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;

      const response = await fetch(
        `/api/client/metrics/get?serviceId=COLD_EMAIL&date=${dateStr}`
      );
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
  });

  const { funnelStages, funnelPercentages } = useMemo(() => {
    const metricHistory = metricsData?.metricHistories?.[0];
    const history = metricHistory?.history || {};

    const emailsSent = Number(history?.emails_sent) || 5000;
    const openRate = Number(history?.open_rate) || 22;
    const replyRate = Number(history?.reply_rate) || 5;
    const conversionRate = Number(history?.conversion_rate) || 2;
    const bounceRate = Number(history?.bounce_rate) || 10;

    // Calculate delivery rate (100% - bounce rate)
    const deliveryRate = 100 - bounceRate;

    // Calculate actual numbers based on rates
    const emailsDelivered = Math.round((emailsSent * deliveryRate) / 100);
    const emailsOpened = Math.round((emailsDelivered * openRate) / 100);
    const emailsReplied = Math.round((emailsOpened * replyRate) / 100);
    const meetingsBooked = Math.round((emailsReplied * conversionRate) / 100);

    const stages = [
      {
        label: "Email Sent Rate",
        value: `100% (${emailsSent.toLocaleString()} sent)`,
        width: "100%",
      },
      {
        label: "Delivery Rate",
        value: `${deliveryRate.toFixed(0)}% (${emailsDelivered.toLocaleString()} delivered)`,
        width: `${deliveryRate}%`,
      },
      {
        label: "Open Rate",
        value: `${openRate.toFixed(0)}% (${emailsOpened.toLocaleString()} opened)`,
        width: `${(deliveryRate * openRate) / 100}%`,
      },
      {
        label: "Reply Rate",
        value: `${replyRate.toFixed(0)}% (${emailsReplied.toLocaleString()} replied)`,
        width: `${(deliveryRate * openRate * replyRate) / 10_000}%`,
      },
      {
        label: "Meetings",
        value: `${conversionRate.toFixed(0)}% (${meetingsBooked.toLocaleString()} meetings)`,
        width: `${(deliveryRate * openRate * replyRate * conversionRate) / 1_000_000}%`,
      },
    ];

    const percentages = stages.map((stage) =>
      Number(stage.width.replace(/[^0-9.]/g, ""))
    );

    return {
      funnelStages: stages,
      funnelPercentages: percentages,
    };
  }, [metricsData]);

  const funnelChartSeries = [
    {
      name: "Conversion",
      data: funnelStages.map((stage, index) => ({
        x: stage.label,
        y: funnelPercentages[index],
      })),
    },
  ];

  const funnelChartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "var(--font-outfit, 'Inter', sans-serif)",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "75%",
        isFunnel: true,
        distributed: true,
      },
    },
    grid: { show: false },
    colors: ["#9518DD", "#AA3FE8", "#BC68ED", "#C887ED", "#D5AEEB"],
    fill: {
      type: "solid",
    },
    dataLabels: {
      enabled: true,
      offsetX: -10,
      style: {
        colors: ["#0f172a"],
        fontSize: "12px",
        fontWeight: 600,
      },
      formatter: (_, opts) => funnelStages[opts.dataPointIndex]?.value ?? "",
    },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: ["#0f172a"], fontSize: "13px", fontWeight: 600 },
      },
    },
    tooltip: {
      y: {
        formatter: (_, opts) => funnelStages[opts.dataPointIndex]?.value ?? "",
      },
    },
  };

  return (
    <div className="rounded-2xl border border-slate-100 p-4">
      <div className="w-full">
        <ApexChart
          height={320}
          options={funnelChartOptions}
          series={funnelChartSeries}
          type="bar"
          width="100%"
        />
      </div>
    </div>
  );
}
