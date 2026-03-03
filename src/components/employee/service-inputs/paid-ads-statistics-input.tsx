"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ServiceInputProps } from "./types";

const BASE_FIELDS: Array<{
  id: string;
  label: string;
  suffix?: string;
  prefix?: string;
}> = [
  { id: "impressions", label: "Impressions" },
  { id: "clicks", label: "Clicks" },
  { id: "reach", label: "Reach" },
  { id: "cpc", label: "Cost per click (CPC)", prefix: "$" },
  { id: "cpl", label: "Cost per lead (CPL)", prefix: "$" },
  { id: "ctr", label: "Click-through rate (CTR)", suffix: "%" },
  { id: "conversion_rate", label: "Conversion rate", suffix: "%" },
  { id: "costs", label: "Costs", prefix: "$" },
];

const CHANNELS = [
  { id: "meta", title: "Meta Ads" },
  { id: "google", title: "Google Ads" },
];

export function PaidAdsStatisticsInput({
  defaultValues,
  onChange,
  selectedDate,
  onDateChange,
  serviceId,
}: ServiceInputProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [metricId, setMetricId] = useState<string | null>(null);

  useEffect(() => {
    const loadMetrics = async () => {
      if (!(selectedDate && serviceId)) return;

      setIsLoading(true);
      try {
        // Clear all input values first
        BASE_FIELDS.forEach((field) => {
          CHANNELS.forEach((channel) => {
            onChange?.(`${channel.id}_${field.id}`, "");
          });
        });

        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const day = String(selectedDate.getDate()).padStart(2, "0");
        const dateStr = `${year}-${month}-${day}`;
        const response = await fetch(
          `/api/employee/metrics/get?serviceId=${serviceId}&date=${dateStr}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch metrics");
        }

        const data = await response.json();

        if (data.metricHistories && data.metricHistories.length > 0) {
          const metricHistory = data.metricHistories[0];
          setMetricId(metricHistory.id);
          const history = metricHistory.history as Record<
            string,
            Record<string, string>
          >;

          CHANNELS.forEach((channel) => {
            const channelData = history[channel.id] || {};
            BASE_FIELDS.forEach((field) => {
              const value = channelData[field.id];
              if (value) {
                onChange?.(`${channel.id}_${field.id}`, value);
              }
            });
          });
        } else {
          setMetricId(null);
        }
      } catch (error) {
        console.error("Error loading metrics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMetrics();
  }, [selectedDate, serviceId, onChange]);

  const getValue = (channelId: string, fieldId: string) =>
    (defaultValues?.[`${channelId}_${fieldId}`] as string | undefined) ?? "";

  const handleChange =
    (channelId: string, fieldId: string) => (value: string) => {
      onChange?.(`${channelId}_${fieldId}`, value);
    };

  const handleSaveMetrics = async () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    setIsSaving(true);
    try {
      const history: Record<string, Record<string, string | null>> = {
        meta: {},
        google: {},
      };

      CHANNELS.forEach((channel) => {
        BASE_FIELDS.forEach((field) => {
          const value = getValue(channel.id, field.id);
          if (channel.id === "meta") {
            (history.meta as Record<string, string | null>)[field.id] =
              value || null;
          } else if (channel.id === "google") {
            (history.google as Record<string, string | null>)[field.id] =
              value || null;
          }
        });
      });

      const method = metricId ? "PUT" : "POST";
      const url = metricId
        ? `/api/employee/metrics/${metricId}`
        : "/api/employee/metrics";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          entryDate: selectedDate.toISOString(),
          history,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save metrics");
      }

      const data = await response.json();
      if (!metricId && data.metricHistory) {
        setMetricId(data.metricHistory.id);
      }

      toast.success(
        metricId ? "Metrics updated successfully" : "Metrics saved successfully"
      );
    } catch (error) {
      toast.error("Error saving metrics");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="space-y-8">
        <div className="space-y-1">
          <p className="text-slate-400 text-xs uppercase tracking-[0.3em]">
            Paid ads overview
          </p>
          <p className="font-semibold text-2xl text-slate-900">
            Meta & Google performance snapshot
          </p>
          <p className="text-slate-500 text-sm">
            Capture the latest acquisition metrics per channel before
            submitting.
          </p>
        </div>

        <div className="grid gap-6">
          {CHANNELS.map((channel) => (
            <div
              className="space-y-4 rounded-xl border border-slate-100 p-4"
              key={channel.id}
            >
              <div>
                <p className="font-semibold text-slate-900 text-sm">
                  {channel.title}
                </p>
                <p className="text-slate-500 text-xs">
                  Enter this week&apos;s delivery, engagement, and cost figures.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {BASE_FIELDS.map((field) => (
                  <div
                    className="space-y-1.5"
                    key={`${channel.id}_${field.id}`}
                  >
                    <Label className="font-medium text-slate-700 text-sm">
                      {field.label}
                    </Label>
                    <div className="relative">
                      {field.prefix && (
                        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center font-semibold text-slate-500 text-xs">
                          {field.prefix}
                        </span>
                      )}
                      <Input
                        className={(() => {
                          if (field.prefix && field.suffix) {
                            return "pr-10 pl-8";
                          }
                          if (field.prefix) {
                            return "pl-8";
                          }
                          if (field.suffix) {
                            return "pr-10";
                          }
                          return undefined;
                        })()}
                        onChange={(event) =>
                          handleChange(channel.id, field.id)(event.target.value)
                        }
                        placeholder={(() => {
                          if (field.prefix) {
                            return `${field.prefix}0`;
                          }
                          if (field.suffix) {
                            return `0${field.suffix}`;
                          }
                          return "0";
                        })()}
                        step="0.01"
                        type="number"
                        value={getValue(channel.id, field.id)}
                      />
                      {field.suffix && (
                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center font-semibold text-slate-500 text-xs">
                          {field.suffix}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button
            className="min-w-[140px]"
            disabled={isSaving}
            onClick={handleSaveMetrics}
            size="lg"
            type="button"
          >
            {isSaving ? "Saving..." : "Save metrics"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
