"use client";

import { Save } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ProjectCalendarCard } from "@/components/employee/project-calendar-card";
import { ProjectMetricGroupCard } from "@/components/employee/project-metric-group-card";
import { Button } from "@/components/ui/button";
import type { MetricGroup } from "@/data/project-metric-groups";
import { metricGroups as staticMetricGroups } from "@/data/project-metric-groups";

type ExtendedMetricGroup = MetricGroup & {
  updates?: Record<string, any>;
  serviceId?: string;
};

const DEMO_SERVICE_TITLE = "Brand & Content Creation";

const buildDemoMetricGroups = (): ExtendedMetricGroup[] =>
  staticMetricGroups.map((group) => ({
    ...group,
    updates: {},
    serviceId: group.id,
  }));

export default function ProjectDetailPage() {
  const searchParams = useSearchParams();
  const serviceName = useMemo(() => {
    const name = searchParams.get("name");
    return name || DEMO_SERVICE_TITLE;
  }, [searchParams]);
  const [metricGroups, setMetricGroups] = useState<ExtendedMetricGroup[]>(
    buildDemoMetricGroups
  );
  const [saving, setSaving] = useState(false);

  const handleMetricChange = (
    groupId: string,
    metricId: string,
    value: string | boolean
  ) => {
    setMetricGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          const updatedMetrics = group.metrics.map((metric) =>
            metric.id === metricId ? { ...metric, value } : metric
          );

          // Update the updates object with field name as key
          const metric = group.metrics.find((m) => m.id === metricId);
          const fieldName = metric?.label || metricId;
          const updatedUpdates = {
            ...group.updates,
            [fieldName]: value,
          };

          return {
            ...group,
            metrics: updatedMetrics,
            updates: updatedUpdates,
          };
        }
        return group;
      })
    );
  };

  const handleSave = async () => {
    setSaving(true);
    toast.info("API integration coming soon—design-only preview.");
    setSaving(false);
  };

  return (
    <section className="flex flex-1 flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="order-2 flex flex-col gap-4 lg:order-1">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-slate-400 text-xs uppercase tracking-[0.3em]">
            Service
          </p>
          <p className="font-semibold text-2xl text-slate-900">{serviceName}</p>
          <p className="text-slate-500 text-sm">
            This is a static preview. Final data wiring will happen after the
            design refresh.
          </p>
        </div>
        {metricGroups.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-500">
              No services assigned to this project yet
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {metricGroups.map((group) => (
              <ProjectMetricGroupCard
                group={group}
                key={group.id}
                onMetricChange={(metricId: string, value: string | boolean) =>
                  handleMetricChange(group.id, metricId, value)
                }
              />
            ))}
          </div>
        )}

        {metricGroups.length > 0 && (
          <div className="flex justify-end">
            <Button
              className="gap-2"
              disabled={saving}
              onClick={handleSave}
              size="lg"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save metrics"}
            </Button>
          </div>
        )}
      </div>

      <div className="order-1 space-y-4 lg:order-2">
        <ProjectCalendarCard />
      </div>
    </section>
  );
}
