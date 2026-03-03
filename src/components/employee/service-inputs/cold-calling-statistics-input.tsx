"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ServiceInputProps } from "./types";

const FIELDS: Array<{ id: string; label: string; suffix?: string }> = [
  { id: "calls_made", label: "Calls made" },
  { id: "calls_picked_up", label: "Calls picked up" },
  { id: "meetings_booked", label: "Meetings booked" },
  { id: "conversion_rate", label: "Conversion rate", suffix: "%" },
  { id: "average_call_duration", label: "Avg. call duration (min)" },
  { id: "qualified_conversions", label: "Qualified conversions" },
  { id: "follow_ups_scheduled", label: "Follow-ups scheduled" },
];

export function ColdCallingStatisticsInput({
  defaultValues,
  onChange,
  selectedDate,
  serviceId,
  clientId,
}: ServiceInputProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [metricId, setMetricId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const loadMetrics = async () => {
      if (!(selectedDate && serviceId)) return;

      setIsLoading(true);
      try {
        // Clear all input values first
        FIELDS.forEach((field) => {
          onChange?.(`${field.id}`, "");
        });

        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const day = String(selectedDate.getDate()).padStart(2, "0");
        const dateStr = `${year}-${month}-${day}`;
        const response = await fetch(
          `/api/employee/metrics/get?clientId=${clientId}&serviceId=${serviceId}&date=${dateStr}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch metrics");
        }

        const data = await response.json();

        if (data.metricHistories && data.metricHistories.length > 0) {
          const metricHistory = data.metricHistories[0];
          setMetricId(metricHistory.id);
          const history = metricHistory.history as Record<string, string>;

          FIELDS.forEach((field) => {
            const value = history[field.id];
            if (value) {
              onChange?.(`${field.id}`, value);
            }
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
  }, [selectedDate, serviceId, clientId, onChange]);

  const handleChange = (fieldId: string) => (value: string) => {
    onChange?.(fieldId, value);
  };

  const handleSaveMetrics = async () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    setIsSaving(true);
    try {
      const history: Record<string, string | null> = {};

      FIELDS.forEach((field) => {
        const value = (defaultValues?.[field.id] as string | undefined) ?? "";
        history[field.id] = value || null;
      });

      const method = metricId ? "PUT" : "POST";
      const url = metricId
        ? `/api/employee/metrics/${metricId}`
        : "/api/employee/metrics";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
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

      // Invalidate the query to refetch fresh data
      const dateStr = selectedDate
        ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
        : null;
      await queryClient.invalidateQueries({
        queryKey: ["employee-metrics", clientId, serviceId, dateStr],
      });

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
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {FIELDS.map((field) => (
            <div className="space-y-1.5" key={field.id}>
              <Label className="font-medium text-slate-700 text-sm">
                {field.label}
              </Label>
              <div className="relative">
                <Input
                  className={field.suffix ? "pr-10" : undefined}
                  onChange={(event) =>
                    handleChange(field.id)(event.target.value)
                  }
                  placeholder={field.suffix ? `0${field.suffix}` : "0"}
                  step="0.01"
                  type="number"
                  value={
                    (defaultValues?.[field.id] as string | undefined) ?? ""
                  }
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
