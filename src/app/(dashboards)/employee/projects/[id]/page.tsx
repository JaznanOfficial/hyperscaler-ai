import { Save } from "lucide-react";
import { ProjectCalendarCard } from "@/components/employee/project-calendar-card";
import { ProjectMetricGroupCard } from "@/components/employee/project-metric-group-card";
import { Button } from "@/components/ui/button";
import { metricGroups } from "@/data/project-metric-groups";

export default function ProjectDetailPage() {
  return (
    <section className="flex flex-1 flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="order-2 flex flex-col gap-4 lg:order-1">
        <div className="space-y-4">
          {metricGroups.map((group) => (
            <ProjectMetricGroupCard group={group} key={group.id} />
          ))}
        </div>

        <div className="flex justify-end">
          <Button className="gap-2" size="lg">
            <Save className="h-4 w-4" />
            Save metrics
          </Button>
        </div>
      </div>

      <div className="order-1 space-y-4 lg:order-2">
        <ProjectCalendarCard />
      </div>
    </section>
  );
}
