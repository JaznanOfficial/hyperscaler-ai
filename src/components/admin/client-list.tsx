"use client"

import { useState } from "react"

import { ClientListItem } from "@/components/admin/client-list-item"

export type ClientItem = {
  id: string
  name: string
  email: string
  requestedService: string
  subscriptionId: string
  status: "Approved" | "Pending" | "Cancelled"
}

const clientItems: ClientItem[] = [
  {
    id: "CL-4821",
    name: "Vivid Analytics",
    email: "ops@vividanalytics.com",
    requestedService: "Automation Intelligence Suite",
    subscriptionId: "SUB-1981",
    status: "Approved",
  },
  {
    id: "CL-4816",
    name: "Solstice Labs",
    email: "maya@solstice.io",
    requestedService: "Telemetry & Risk Mesh",
    subscriptionId: "SUB-1975",
    status: "Pending",
  },
  {
    id: "CL-4809",
    name: "Helios Retail",
    email: "emma@heliosretail.com",
    requestedService: "Revenue Autopilot",
    subscriptionId: "SUB-1966",
    status: "Cancelled",
  },
]

export function ClientList() {
  const [clients, setClients] = useState(clientItems)

  const handleStatusChange = (id: string, status: ClientItem["status"]) => {
    setClients((previous) =>
      previous.map((client) =>
        client.id === id
          ? {
              ...client,
              status,
            }
          : client
      )
    )
  }

  return (
    <div>
      <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {clients.map((item) => (
          <ClientListItem key={item.id} item={item} onStatusChange={handleStatusChange} />
        ))}
      </ul>
    </div>
  )
}
