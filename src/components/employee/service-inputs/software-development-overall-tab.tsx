"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ServiceInputProps } from "./types";

const TIMELINE_STATUS_OPTIONS = ["Upcoming", "In-progress", "Complete"];

type TimelineItem = {
  milestone: string;
  status: string;
  timeframe: string;
};

type BlockerItem = {
  title: string;
  description: string;
  waitingOn: string;
};

const EMPTY_TIMELINE_ITEM: TimelineItem = {
  milestone: "",
  status: "Upcoming",
  timeframe: "",
};

const EMPTY_BLOCKER_ITEM: BlockerItem = {
  title: "",
  description: "",
  waitingOn: "",
};

function parseList<T>(raw: unknown, fallback: T): T[] {
  if (typeof raw !== "string" || raw.trim() === "") return [fallback];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed as T[];
    }
    return [fallback];
  } catch {
    return [fallback];
  }
}

const OVERALL_METRIC_ID = "SOFTWARE_DEVELOPMENT_OVERALL";

export function SoftwareDevelopmentOverallTab({
  defaultValues,
  onChange,
  serviceId,
}: ServiceInputProps) {
  const initialTimeline = useMemo(
    () =>
      parseList<TimelineItem>(
        defaultValues?.project_timeline,
        EMPTY_TIMELINE_ITEM
      ),
    [defaultValues?.project_timeline]
  );

  const initialBlockers = useMemo(
    () =>
      parseList<BlockerItem>(
        defaultValues?.active_blockers,
        EMPTY_BLOCKER_ITEM
      ),
    [defaultValues?.active_blockers]
  );

  const [timeline, setTimeline] = useState<TimelineItem[]>(initialTimeline);
  const [blockers, setBlockers] = useState<BlockerItem[]>(initialBlockers);
  const [isSaving, setIsSaving] = useState(false);
  const [metricId, setMetricId] = useState<string | null>(null);

  useEffect(() => {
    const loadOverallData = async () => {
      try {
        const response = await fetch(
          `/api/employee/metrics/get?serviceId=${OVERALL_METRIC_ID}&metricId=${OVERALL_METRIC_ID}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch overall data");
        }

        const data = await response.json();

        if (data.metricHistories && data.metricHistories.length > 0) {
          const metricHistory = data.metricHistories[0];
          setMetricId(metricHistory.id);
          const history = metricHistory.history as Record<string, string>;

          if (history.project_timeline) {
            try {
              const parsedTimeline = JSON.parse(history.project_timeline);
              if (Array.isArray(parsedTimeline) && parsedTimeline.length > 0) {
                setTimeline(parsedTimeline);
              }
            } catch {
              // Keep initial timeline if parsing fails
            }
          }

          if (history.active_blockers) {
            try {
              const parsedBlockers = JSON.parse(history.active_blockers);
              if (Array.isArray(parsedBlockers) && parsedBlockers.length > 0) {
                setBlockers(parsedBlockers);
              }
            } catch {
              // Keep initial blockers if parsing fails
            }
          }
        }
      } catch (error) {
        console.error("Error loading overall data:", error);
      }
    };

    loadOverallData();
  }, []);

  const persist = useCallback(
    (field: string, value: unknown) => {
      onChange?.(field, JSON.stringify(value));
    },
    [onChange]
  );

  const updateTimeline = (next: TimelineItem[]) => {
    setTimeline(next);
    persist("project_timeline", next);
  };

  const updateBlockers = (next: BlockerItem[]) => {
    setBlockers(next);
    persist("active_blockers", next);
  };

  const handleTimelineChange = (
    index: number,
    key: keyof TimelineItem,
    value: string
  ) => {
    const next = timeline.map((item, idx) =>
      idx === index ? { ...item, [key]: value } : item
    );
    updateTimeline(next);
  };

  const handleBlockerChange = (
    index: number,
    key: keyof BlockerItem,
    value: string
  ) => {
    const next = blockers.map((item, idx) =>
      idx === index ? { ...item, [key]: value } : item
    );
    updateBlockers(next);
  };

  const handleDeleteTimeline = (index: number) => {
    const next = timeline.filter((_, idx) => idx !== index);
    updateTimeline(next);
  };

  const handleDeleteBlocker = (index: number) => {
    const next = blockers.filter((_, idx) => idx !== index);
    updateBlockers(next);
  };

  const handleSaveOverview = async () => {
    setIsSaving(true);
    try {
      const history = {
        project_timeline: JSON.stringify(timeline),
        active_blockers: JSON.stringify(blockers),
      };

      const method = metricId ? "PUT" : "POST";
      const url = metricId
        ? `/api/employee/metrics/${metricId}`
        : "/api/employee/metrics";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: OVERALL_METRIC_ID,
          entryDate: new Date().toISOString(),
          history,
          id: OVERALL_METRIC_ID,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save overview");
      }

      const data = await response.json();
      if (!metricId && data.metricHistory) {
        setMetricId(data.metricHistory.id);
      }

      toast.success(
        metricId
          ? "Overview updated successfully"
          : "Overview saved successfully"
      );
    } catch (error) {
      toast.error("Error saving overview");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border border-slate-200 bg-white p-6">
        <section className="space-y-5">
          <header className="space-y-2">
            <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">
              Project timeline & milestones
            </p>
            <p className="text-slate-600 text-sm">
              Capture the macro roadmap so leadership can scan upcoming work.
            </p>
          </header>

          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div
                className="relative grid gap-4 rounded-xl border border-slate-100 p-4 md:grid-cols-3"
                key={index}
              >
                <button
                  className="absolute top-2 right-2 rounded-md p-1 hover:bg-slate-100"
                  onClick={() => handleDeleteTimeline(index)}
                  type="button"
                >
                  <X className="h-4 w-4 text-slate-500" />
                </button>

                <div className="space-y-1.5">
                  <Label className="font-medium text-slate-700 text-sm">
                    Milestone name
                  </Label>
                  <Input
                    onChange={(event) =>
                      handleTimelineChange(
                        index,
                        "milestone",
                        event.target.value
                      )
                    }
                    placeholder="eg. MVP beta"
                    value={item.milestone}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="font-medium text-slate-700 text-sm">
                    Status
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleTimelineChange(index, "status", value)
                    }
                    value={item.status}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIMELINE_STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="font-medium text-slate-700 text-sm">
                    Timeframe
                  </Label>
                  <Input
                    onChange={(event) =>
                      handleTimelineChange(
                        index,
                        "timeframe",
                        event.target.value
                      )
                    }
                    placeholder="eg. Apr 1 – Apr 28"
                    value={item.timeframe}
                  />
                </div>
              </div>
            ))}

            <Button
              className="w-full md:w-auto"
              onClick={() =>
                updateTimeline([...timeline, { ...EMPTY_TIMELINE_ITEM }])
              }
              type="button"
              variant="outline"
            >
              + Add milestone
            </Button>
          </div>
        </section>
      </Card>

      <Card className="rounded-2xl border border-slate-200 bg-white p-6">
        <section className="space-y-5">
          <header className="space-y-2">
            <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">
              Active blockers & risks
            </p>
            <p className="text-slate-600 text-sm">
              Highlight issues slowing the build and who can unblock them.
            </p>
          </header>

          <div className="space-y-4">
            {blockers.map((blocker, index) => (
              <div
                className="relative space-y-4 rounded-xl border border-slate-100 p-4"
                key={index}
              >
                <button
                  className="absolute top-2 right-2 rounded-md p-1 hover:bg-slate-100"
                  onClick={() => handleDeleteBlocker(index)}
                  type="button"
                >
                  <X className="h-4 w-4 text-slate-500" />
                </button>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="font-medium text-slate-700 text-sm">
                      Title
                    </Label>
                    <Input
                      onChange={(event) =>
                        handleBlockerChange(index, "title", event.target.value)
                      }
                      placeholder="eg. API quota limits"
                      value={blocker.title}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-medium text-slate-700 text-sm">
                      Waiting on
                    </Label>
                    <Input
                      onChange={(event) =>
                        handleBlockerChange(
                          index,
                          "waitingOn",
                          event.target.value
                        )
                      }
                      placeholder="eg. Infra team"
                      value={blocker.waitingOn}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="font-medium text-slate-700 text-sm">
                    Description
                  </Label>
                  <Textarea
                    onChange={(event) =>
                      handleBlockerChange(
                        index,
                        "description",
                        event.target.value
                      )
                    }
                    placeholder="Give context, remediation steps, or links."
                    rows={3}
                    value={blocker.description}
                  />
                </div>
              </div>
            ))}

            <Button
              className="w-full md:w-auto"
              onClick={() =>
                updateBlockers([...blockers, { ...EMPTY_BLOCKER_ITEM }])
              }
              type="button"
              variant="outline"
            >
              + Add blocker
            </Button>
          </div>
        </section>
      </Card>

      <div className="flex justify-end">
        <Button
          className="min-w-[140px]"
          disabled={isSaving}
          onClick={handleSaveOverview}
          size="lg"
          type="button"
        >
          {isSaving ? "Saving..." : "Save overview"}
        </Button>
      </div>
    </div>
  );
}
