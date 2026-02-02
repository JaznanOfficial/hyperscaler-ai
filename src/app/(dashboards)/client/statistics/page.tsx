import { HyperscalerStatsGrid } from "@/components/dashboard/hyperscaler-ai/stats-grid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const highlights = [
  {
    title: "Latency",
    body: "Regional tenants are holding steady below 120ms across core workflows.",
  },
  {
    title: "Adoption",
    body: "Usage climbed 8% week-over-week with the new playbook templates.",
  },
]

export default function ClientStatisticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Statistics</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Snapshot of tenant performance and automation throughput.
        </p>
        <Separator className="mt-4" />
      </div>
      <HyperscalerStatsGrid />
      <div className="grid gap-4 lg:grid-cols-2">
        {highlights.map((highlight) => (
          <Card key={highlight.title} className="border-dashed">
            <CardHeader>
              <CardTitle>{highlight.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              {highlight.body}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
