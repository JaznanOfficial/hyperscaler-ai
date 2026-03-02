"use client";

import { useCallback, useMemo, useState } from "react";

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

export function SoftwareDevelopmentOverallTab({
  defaultValues,
  onChange,
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
                className="grid gap-4 rounded-xl border border-slate-100 p-4 md:grid-cols-3"
                key={`${index}-${item.milestone}-${item.timeframe}`}
              >
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
                className="space-y-4 rounded-xl border border-slate-100 p-4"
                key={`${index}-${blocker.title}-${blocker.waitingOn}`}
              >
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
        <Button className="min-w-[140px]" size="lg" type="button">
          Save overview
        </Button>
      </div>
    </div>
  );
}
