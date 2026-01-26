import { HyperscalerStatsGrid } from "@/components/dashboard/hyperscaler-ai/stats-grid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const incidentNotes = [
  {
    title: "Recent escalations",
    body: "Hook up the incidents feed to surface severity-one threads.",
  },
  {
    title: "Automation backlog",
    body: "Drop workflow cards here once the runbooks are wired in.",
  },
]

export function HyperscalerAIDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Hyperscaler AI</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Real-time signals from your tenant orchestration layer.
        </p>
        <Separator className="mt-4" />
      </div>
      <HyperscalerStatsGrid />
      <div className="grid gap-4 lg:grid-cols-2">
        {incidentNotes.map((note) => (
          <Card key={note.title} className="border-dashed">
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              {note.body}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
