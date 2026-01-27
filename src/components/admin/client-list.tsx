"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

const statusStyles: Record<ClientItem["status"], string> = {
  Approved: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Cancelled: "bg-rose-50 text-rose-700",
}

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
          <li key={item.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-slate-900">{item.name}</p>
              <p className="text-sm text-slate-500">{item.email}</p>
              <p className="text-sm text-slate-500">Service: {item.requestedService}</p>
            </div>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="secondary"
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold ${statusStyles[item.status]}`}
                >
                  {item.status}
                </Badge>
                <span className="text-xs font-semibold text-slate-900">{item.subscriptionId}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" className="cursor-pointer">
                  View
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="sm" className="cursor-pointer">
                      Update status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-48">
                    <DropdownMenuLabel>Set status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={item.status}
                      onValueChange={(value) =>
                        handleStatusChange(item.id, value as ClientItem["status"])
                      }
                    >
                      {(["Approved", "Pending", "Cancelled"] as const).map((status) => (
                        <DropdownMenuRadioItem key={status} value={status}>
                          {status}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
