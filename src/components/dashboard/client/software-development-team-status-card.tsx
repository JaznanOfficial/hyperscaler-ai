"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import { teamStatuses } from "./software-development-data";

export function SoftwareDevelopmentTeamStatusCard() {
  const [todayDate, setTodayDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setTodayDate(`${year}-${month}-${day}`);
  }, []);

  const { data: metricsData } = useQuery({
    queryKey: ["software-development-metrics", todayDate],
    queryFn: async () => {
      if (!todayDate) return null;
      const response = await fetch(
        `/api/client/metrics/get?serviceId=SOFTWARE_DEVELOPMENT&date=${todayDate}`
      );
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
    enabled: !!todayDate,
  });

  const dynamicTeamStatuses = useMemo(() => {
    const metricHistory = metricsData?.metricHistories?.[0];
    const history = metricHistory?.history || {};

    const uiuxStatus = (history?.team_uiux_status as string) || "On track";
    const frontendStatus =
      (history?.team_frontend_status as string) || "On track";
    const backendStatus = (history?.team_backend_status as string) || "At risk";
    const qaStatus = (history?.team_qa_status as string) || "On track";

    const statusMap: Record<string, { badgeBg: string; badgeText: string }> = {
      "On track": { badgeBg: "bg-emerald-100", badgeText: "text-emerald-700" },
      Blocked: { badgeBg: "bg-rose-100", badgeText: "text-rose-700" },
      "At risk": { badgeBg: "bg-amber-100", badgeText: "text-amber-700" },
      "In Progress": {
        badgeBg: "bg-violet-100",
        badgeText: "text-violet-700",
      },
    };

    return [
      {
        ...teamStatuses[0],
        status: uiuxStatus,
        ...statusMap[uiuxStatus],
      },
      {
        ...teamStatuses[1],
        status: frontendStatus,
        ...statusMap[frontendStatus],
      },
      {
        ...teamStatuses[2],
        status: backendStatus,
        ...statusMap[backendStatus],
      },
      {
        ...teamStatuses[3],
        status: qaStatus,
        ...statusMap[qaStatus],
      },
    ];
  }, [metricsData]);

  return (
    <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
      <div>
        <p className="font-semibold text-slate-900 text-sm">
          Team Status Overview
        </p>
        <p className="text-slate-500 text-xs">
          Snapshot of ownership across each pod.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {dynamicTeamStatuses.map((status) => (
          <div
            className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
            key={status.label}
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-white text-violet-600 shadow">
                <status.icon className="size-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">
                  {status.label}
                </p>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 font-semibold text-xs ${status.badgeBg} ${status.badgeText}`}
                >
                  {status.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
