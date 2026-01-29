export type ClientServiceStatus = "active" | "monitoring" | "blocked"

export type ClientServiceRequest = {
  id: string
  name: string
  description: string
  status: ClientServiceStatus
  assignedEmployees: string[]
  renewal: string
}

export type ClientDetail = {
  id: string
  name: string
  email: string
  subscriptionId: string
  accountStatus: "Approved" | "Pending" | "Cancelled"
  requestedServices: ClientServiceRequest[]
}

export const employeeDirectory = [
  "Lana Zimmerman",
  "Arjun Patel",
  "Maya Collins",
  "Noah Whitfield",
  "Priya Ramesh",
  "Devon Ellis",
]

export const clientDetails: ClientDetail[] = [
  {
    id: "CL-4821",
    name: "Vivid Analytics",
    email: "ops@vividanalytics.com",
    subscriptionId: "SUB-1981",
    accountStatus: "Approved",
    requestedServices: [
      {
        id: "srv-401",
        name: "Automation Intelligence Suite",
        description: "Scaling revenue automation and telemetry for growth pods.",
        status: "active",
        assignedEmployees: ["Lana Zimmerman", "Arjun Patel"],
        renewal: "Renews Mar 01",
      },
      {
        id: "srv-389",
        name: "Telemetry & Risk Mesh",
        description: "Enterprise telemetry rollout with risk escalation playbooks.",
        status: "monitoring",
        assignedEmployees: ["Maya Collins"],
        renewal: "Discovery wk 2",
      },
    ],
  },
  {
    id: "CL-4816",
    name: "Solstice Labs",
    email: "maya@solstice.io",
    subscriptionId: "SUB-1975",
    accountStatus: "Pending",
    requestedServices: [
      {
        id: "srv-389",
        name: "Telemetry & Risk Mesh",
        description: "Compliance instrumentation + outage war room automations.",
        status: "blocked",
        assignedEmployees: ["Noah Whitfield"],
        renewal: "Needs legal clearance",
      },
      {
        id: "srv-376",
        name: "Revenue Autopilot",
        description: "Autonomous routing for SDR + lifecycle teams.",
        status: "monitoring",
        assignedEmployees: ["Devon Ellis"],
        renewal: "Pilot retro Feb 18",
      },
    ],
  },
  {
    id: "CL-4809",
    name: "Helios Retail",
    email: "emma@heliosretail.com",
    subscriptionId: "SUB-1966",
    accountStatus: "Cancelled",
    requestedServices: [
      {
        id: "srv-376",
        name: "Revenue Autopilot",
        description: "AI-assisted merchandising triggers and replenishment ops.",
        status: "active",
        assignedEmployees: ["Priya Ramesh", "Maya Collins"],
        renewal: "Trial ends Mar 15",
      },
    ],
  },
]

export function getClientDetail(id: string | undefined) {
  if (!id) return undefined
  const normalizedId = id.toUpperCase()
  return clientDetails.find((client) => client.id.toUpperCase() === normalizedId)
}
