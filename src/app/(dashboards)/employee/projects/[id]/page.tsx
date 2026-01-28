import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProjectMetricGroupCard } from "@/components/employee/project-metric-group-card"
import { ProjectMetricsHeader } from "@/components/employee/project-metrics-header"
import { metricGroups } from "@/data/project-metric-groups"

export default function ProjectDetailPage() {
  return (
    <section className="flex flex-1 flex-col gap-4">
      <ProjectMetricsHeader title="Metrics" description="Configure the signals you want to capture for this project." />

      <div className="space-y-4">
        {metricGroups.map((group) => (
          <ProjectMetricGroupCard key={group.id} group={group} />
        ))}
      </div>

      <div className="flex justify-end">
        <Button size="lg" className="gap-2">
          <Save className="h-4 w-4" />
          Save metrics
        </Button>
      </div>
    </section>
  )
}
