"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SoftwareDevelopmentDailyTeamUpdateCard } from "./software-development-daily-team-update-card";
import { SoftwareDevelopmentDailyUpdateCard } from "./software-development-daily-update-card";
import { SoftwareDevelopmentGeneralCard } from "./software-development-general-card";
import { SoftwareDevelopmentOverallTab } from "./software-development-overall-tab";
import { SoftwareDevelopmentTeamStatusCard } from "./software-development-team-status-card";
import type { ServiceInputProps } from "./types";

const OVERALL_METRIC_ID = "SOFTWARE_DEVELOPMENT_OVERALL";

export function SoftwareDevelopmentStatisticsInput({
  defaultValues,
  onChange,
  selectedDate,
  serviceId,
  clientId,
  onTabChange,
}: ServiceInputProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const [metricId, setMetricId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("today");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  useEffect(() => {
    const loadMetrics = async () => {
      if (!serviceId) return;

      if (activeTab === "today") {
        if (!selectedDate) return;

        setIsLoading(true);
        try {
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

            Object.entries(history).forEach(([key, value]) => {
              if (value) {
                onChange?.(key, value);
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
      } else if (activeTab === "all") {
        setIsLoading(true);
        try {
          const response = await fetch(
            `/api/employee/metrics/get?clientId=${clientId}&serviceId=${serviceId}&metricId=${OVERALL_METRIC_ID}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch metrics");
          }

          const data = await response.json();

          if (data.metricHistories && data.metricHistories.length > 0) {
            const metricHistory = data.metricHistories[0];
            setMetricId(metricHistory.id);
            const history = metricHistory.history as Record<string, string>;

            Object.entries(history).forEach(([key, value]) => {
              if (value) {
                onChange?.(key, value);
              }
            });
          } else {
            setMetricId(OVERALL_METRIC_ID);
          }
        } catch (error) {
          console.error("Error loading metrics:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadMetrics();
  }, [selectedDate, serviceId, clientId, onChange, activeTab]);

  const handleSaveMetrics = async () => {
    if (activeTab === "today" && !selectedDate) {
      toast.error("Please select a date");
      return;
    }

    setIsSaving(true);
    try {
      const history: Record<string, string | null> = {};

      Object.entries(defaultValues || {}).forEach(([key, value]) => {
        history[key] = (value as string) || null;
      });

      const method = metricId ? "PUT" : "POST";
      const url = metricId
        ? `/api/employee/metrics/${metricId}`
        : "/api/employee/metrics";

      const entryDate =
        activeTab === "today" && selectedDate
          ? selectedDate.toISOString()
          : new Date().toISOString();

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          serviceId,
          entryDate,
          history,
          ...(activeTab === "all" && { id: OVERALL_METRIC_ID }),
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
      if (activeTab === "today" && selectedDate) {
        const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
        await queryClient.invalidateQueries({
          queryKey: ["employee-metrics", clientId, serviceId, dateStr],
        });
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
    <Tabs
      className="space-y-6"
      defaultValue="today"
      onValueChange={handleTabChange}
      value={activeTab}
    >
      <TabsList className="w-fit justify-start gap-2">
        <TabsTrigger
          className="data-[state=active]:bg-slate-900 data-[state=active]:text-white"
          value="today"
        >
          Today
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-slate-900 data-[state=active]:text-white"
          value="all"
        >
          Overall
        </TabsTrigger>
      </TabsList>

      <TabsContent value="today">
        <div className="space-y-6">
          <SoftwareDevelopmentGeneralCard
            defaultValues={defaultValues}
            onChange={onChange}
          />
          <SoftwareDevelopmentTeamStatusCard
            defaultValues={defaultValues}
            onChange={onChange}
          />
          <SoftwareDevelopmentDailyUpdateCard
            defaultValues={defaultValues}
            onChange={onChange}
          />
          <SoftwareDevelopmentDailyTeamUpdateCard
            defaultValues={defaultValues}
            onChange={onChange}
          />

          <div className="flex justify-end">
            <Button
              className="min-w-35"
              disabled={isSaving}
              onClick={handleSaveMetrics}
              size="lg"
              type="button"
            >
              {isSaving ? "Saving..." : "Save metrics"}
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="all">
        <SoftwareDevelopmentOverallTab
          clientId={clientId}
          defaultValues={defaultValues}
          onChange={onChange}
          serviceId={serviceId}
        />
      </TabsContent>
    </Tabs>
  );
}
