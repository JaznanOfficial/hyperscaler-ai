import { ProjectMetricInput } from "@/components/employee/project-metric-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { MetricGroup } from "@/data/project-metric-groups";

export function ProjectMetricGroupCard({ group }: { group: MetricGroup }) {
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
          return (
            <ProjectMetricInput
              id={inputId}
              key={metric.id}
              label={metric.label}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
