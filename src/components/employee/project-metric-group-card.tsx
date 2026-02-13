import { ProjectMetricInput } from "@/components/employee/project-metric-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { MetricGroup } from "@/data/project-metric-groups";

type ProjectMetricGroupCardProps = {
  group: MetricGroup & { updates?: Record<string, any> };
  onMetricChange?: (metricId: string, value: string | boolean) => void;
};

export function ProjectMetricGroupCard({
  group,
  onMetricChange,
}: ProjectMetricGroupCardProps) {
  const activeMetrics = group.metrics.filter((metric) => metric.enabled);
  if (!activeMetrics.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{group.title}</CardTitle>
        <CardDescription>{group.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {activeMetrics.map((metric) => {
          const inputId = `${group.id}-${metric.id}`;
          const value = (metric as any).value || "";
          const type = (metric as any).type || "input";
          return (
            <ProjectMetricInput
              id={inputId}
              key={metric.id}
              label={metric.label}
              onChange={(newValue) => onMetricChange?.(metric.id, newValue)}
              type={type}
              value={value}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
