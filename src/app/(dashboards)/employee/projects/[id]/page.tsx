"use client";

import { Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ProjectCalendarCard } from "@/components/employee/project-calendar-card";
import { ProjectMetricGroupCard } from "@/components/employee/project-metric-group-card";
import { Button } from "@/components/ui/button";
import type { MetricGroup } from "@/data/project-metric-groups";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [metricGroups, setMetricGroups] = useState<MetricGroup[]>([]);
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

        if (data.project.services && Array.isArray(data.project.services)) {
          setMetricGroups(data.project.services);
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

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/projects/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          services: metricGroups,
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
              <ProjectMetricGroupCard group={group} key={group.id} />
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
