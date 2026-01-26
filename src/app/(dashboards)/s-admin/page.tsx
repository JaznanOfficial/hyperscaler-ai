import { StatsGrid } from "@/components/dashboard/s-admin/stats-grid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function SuperAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Control Tower</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Real-time signals pulled from your tenant orchestration layer.
        </p>
        <Separator className="mt-4" />
      </div>
      <StatsGrid />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>Recent escalations</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Hook up the incidents feed to surface severity-one threads.
          </CardContent>
        </Card>
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>Automation backlog</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Drop workflow cards here once the runbooks are wired in.
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
