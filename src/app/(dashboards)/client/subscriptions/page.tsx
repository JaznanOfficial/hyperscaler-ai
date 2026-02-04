import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const subscriptions = [
  {
    tier: "Core",
    description: "Baseline automations with 99.5% SLA",
    seats: "150 seats",
    spend: "$18,500 / mo",
    enabled: true,
  },
  {
    tier: "Copilot+",
    description: "Guided workflows and adaptive copilots",
    seats: "50 seats",
    spend: "$6,200 / mo",
    enabled: true,
  },
  {
    tier: "Labs",
    description: "Early access to orchestrator experiments",
    seats: "10 seats",
    spend: "$1,400 / mo",
    enabled: false,
  },
]

export default function ClientSubscriptionsPage() {
  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Subscriptions</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage entitlements, seat allocations, and feature toggles.
        </p>
        <Separator className="mt-4" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {subscriptions.map((subscription) => (
          <Card key={subscription.tier}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>
                  <p>{subscription.tier}</p>
                  <CardDescription>{subscription.description}</CardDescription>
                </div>
                <Switch defaultChecked={subscription.enabled} aria-label={`Toggle ${subscription.tier}`} />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{subscription.seats}</p>
              <p>{subscription.spend}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
