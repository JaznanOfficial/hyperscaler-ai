"use client";

import { Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [metricGroups, setMetricGroups] = useState<ExtendedMetricGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`/api/projects/${params.id}`);
        if (!response.ok) {
          if (response.status === 403) {
            toast.error("You don't have access to this project");
            router.push("/employee/projects");
            return;
          }
          throw new Error("Failed to fetch project");
        }
        const data = await response.json();
        setProject(data.project);

        // Use static metric groups design with real service data
        if (data.project.services && Array.isArray(data.project.services)) {
          const dynamicGroups = data.project.services.map(
            (service: any, index: number) => {
              // Convert service sections to metrics format
              const sections = Array.isArray(service.sections)
                ? service.sections
                : [];
              
              const metrics = sections.map((section: any) => {
                const fieldName = section.name || section.id;
                const savedValue = service.updates?.[fieldName];
                
                return {
                  id: section.id,
                  label: section.name,
                  enabled: true,
                  value: savedValue !== undefined ? savedValue : (section.type === "boolean" ? false : ""),
                  type: section.type,
                };
              });

              return {
                id: service.serviceId || `service-${index}`,
                title: service.serviceName || "Service",
                description: "Update service metrics and progress",
                metrics,
                updates: service.updates || {},
                serviceId: service.serviceId,
              };
            }
          );

          setMetricGroups(dynamicGroups);
        } else {
          // Fallback to static groups if no services
          setMetricGroups(staticMetricGroups);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        toast.error("Failed to load project");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchProject();
    }
  }, [params.id, router]);

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
    try {
      // Convert back to services format for API
      const services = metricGroups.map((group) => ({
        serviceId: group.serviceId || group.id,
        serviceName: group.title,
        updates: group.updates || {},
      }));

      const response = await fetch(`/api/projects/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          services,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save project");
      }

      toast.success("Project saved successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="flex flex-1 items-center justify-center">
        <p className="text-slate-500">Loading project...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-1 items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="flex flex-1 items-center justify-center">
        <p className="text-slate-500">Project not found</p>
      </section>
    );
  }

  return (
    <section className="flex flex-1 flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="order-2 flex flex-col gap-4 lg:order-1">
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
