import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const workstreams = [
  {
    title: "Delivery sprints",
    summary: "Wire your project tracker to surface upcoming drops and blockers.",
  },
  {
    title: "Knowledge hub",
    summary: "Hook into Notion or Confluence for the team playbooks and specs.",
  },
]

export default function EmployeeDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Your runway</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Ship status, upcoming drops, and references curated for the employee
          pod.
        </p>
        <Separator className="mt-4" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {workstreams.map((stream) => (
          <Card key={stream.title} className="border-dashed">
            <CardHeader>
              <CardTitle>{stream.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              {stream.summary}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
