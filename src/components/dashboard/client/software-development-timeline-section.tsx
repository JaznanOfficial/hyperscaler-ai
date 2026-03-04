"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const OVERALL_METRIC_ID = "SOFTWARE_DEVELOPMENT_OVERALL";

interface TimelineItem {
  milestone: string;
  status: string;
  timeframe: string;
}

interface BlockerItem {
  title: string;
  description: string;
  waitingOn: string;
}

const statusMap: Record<
  string,
  { pillBg: string; pillDot: string; pillText: string }
> = {
  Upcoming: {
    pillBg: "bg-slate-100",
    pillDot: "bg-slate-300",
    pillText: "text-slate-500",
  },
  "In-progress": {
    pillBg: "bg-violet-50",
    pillDot: "bg-violet-500",
    pillText: "text-violet-700",
  },
  Complete: {
    pillBg: "bg-emerald-50",
    pillDot: "bg-emerald-500",
    pillText: "text-emerald-700",
  },
};

export function SoftwareDevelopmentTimelineSection() {
  const { data: overallData } = useQuery({
    queryKey: ["software-development-overall"],
    queryFn: async () => {
      const response = await fetch(
        `/api/client/metrics/get?serviceId=${OVERALL_METRIC_ID}&metricId=${OVERALL_METRIC_ID}`
      );
      if (!response.ok) throw new Error("Failed to fetch overall data");
      return response.json();
    },
  });

  const { timeline, blockers } = useMemo(() => {
    const metricHistory = overallData?.metricHistories?.[0];
    const history = metricHistory?.history || {};

    // Parse timeline
    let parsedTimeline: TimelineItem[] = [];
    if (history.project_timeline) {
      try {
        const parsed = JSON.parse(history.project_timeline);
        if (Array.isArray(parsed)) {
          parsedTimeline = parsed;
        }
      } catch {
        // Keep empty if parsing fails
      }
    }

    // Parse blockers
    let parsedBlockers: BlockerItem[] = [];
    if (history.active_blockers) {
      try {
        const parsed = JSON.parse(history.active_blockers);
        if (Array.isArray(parsed)) {
          parsedBlockers = parsed;
        }
      } catch {
        // Keep empty if parsing fails
      }
    }

    return {
      timeline: parsedTimeline,
      blockers: parsedBlockers,
    };
  }, [overallData]);

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
        <div>
          <p className="font-semibold text-slate-900 text-sm">
            Project Timeline & Milestones
          </p>
          <p className="text-slate-500 text-xs">
            See where the project stands and what's coming next.
          </p>
        </div>
        <div className="space-y-4">
          {timeline.length > 0 ? (
            timeline.map((milestone, index) => {
              const statusStyle =
                statusMap[milestone.status] || statusMap.Upcoming;
              return (
                <div
                  className="space-y-3"
                  key={`${milestone.milestone}-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900 text-sm">
                      {milestone.milestone}
                    </p>
                    <p className="text-slate-500 text-xs">
                      {milestone.timeframe}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold text-xs ${statusStyle.pillBg} ${statusStyle.pillText}`}
                  >
                    <span
                      className={`size-2 rounded-full ${statusStyle.pillDot}`}
                    />
                    {milestone.status}
                  </span>
                  {index < timeline.length - 1 && (
                    <div className="border-slate-200/70 border-b" />
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-slate-500 text-sm">No milestones added yet.</p>
          )}
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
        <div>
          <p className="font-semibold text-slate-900 text-sm">
            Active Blockers & Risks
          </p>
          <p className="text-slate-500 text-xs">
            Issues that may affect timelines or delivery.
          </p>
        </div>
        <div className="space-y-4">
          {blockers.length > 0 ? (
            blockers.map((blocker) => (
              <div
                className="rounded-xl border border-slate-200/60 bg-white p-5"
                key={blocker.title}
              >
                <p className="font-semibold text-slate-900 text-sm">
                  {blocker.title}
                </p>
                <p className="mt-2 text-slate-600 text-sm">
                  {blocker.description}
                </p>
                <p className="mt-2 text-slate-500 text-sm">
                  Waiting on:{" "}
                  <span className="font-semibold text-slate-900">
                    {blocker.waitingOn}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-slate-500 text-sm">No active blockers.</p>
          )}
        </div>
      </div>
    </section>
  );
}
