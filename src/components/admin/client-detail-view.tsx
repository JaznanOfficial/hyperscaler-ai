"use client"

import { useMemo, useState } from "react"
import { UserPlus, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ClientDetail, ClientServiceStatus } from "@/data/clients"
import { employeeDirectory } from "@/data/clients"

const accountStatusStyles: Record<ClientDetail["accountStatus"], string> = {
  Approved: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-rose-100 text-rose-700",
}

const serviceStatusLabels: Record<ClientServiceStatus, string> = {
  active: "Active",
  monitoring: "Monitoring",
  blocked: "Blocked",
}

const serviceStatusStyles: Record<ClientServiceStatus, string> = {
  active: "bg-emerald-50 text-emerald-700",
  monitoring: "bg-amber-50 text-amber-800",
  blocked: "bg-rose-50 text-rose-700",
}

export function ClientDetailView({ client }: { client: ClientDetail }) {
  const [services, setServices] = useState(client.requestedServices)

  const availableEmployees = useMemo(() => [...employeeDirectory].sort(), [])

  const handleServiceStatusChange = (serviceId: string, status: ClientServiceStatus) => {
    setServices((prev) => prev.map((service) => (service.id === serviceId ? { ...service, status } : service)))
  }

  const toggleEmployeeAssignment = (serviceId: string, employee: string) => {
    setServices((prev) =>
      prev.map((service) => {
        if (service.id !== serviceId) return service
        const assigned = service.assignedEmployees.includes(employee)
        return {
          ...service,
          assignedEmployees: assigned
            ? service.assignedEmployees.filter((name) => name !== employee)
            : [...service.assignedEmployees, employee],
        }
      })
    )
  }

  const removeEmployee = (serviceId: string, employee: string) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              assignedEmployees: service.assignedEmployees.filter((name) => name !== employee),
            }
          : service
      )
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-900">{client.name}</CardTitle>
          <CardDescription className="text-sm text-slate-500">{client.email}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4 text-sm text-slate-600">
          <div>
            <span className="font-semibold text-slate-900">Subscription</span>
            <p>{client.subscriptionId}</p>
          </div>
          <div>
            <span className="font-semibold text-slate-900">Account status</span>
            <p>
              <Badge className={`rounded-full px-3 py-1 text-xs font-semibold ${accountStatusStyles[client.accountStatus]}`}>
                {client.accountStatus}
              </Badge>
            </p>
          </div>
          <div>
            <span className="font-semibold text-slate-900">Requested services</span>
            <p>{services.length}</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {services.map((service) => (
          <Card key={service.id} className="border border-slate-200">
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="text-lg text-slate-900">{service.name}</CardTitle>
                <CardDescription className="text-sm text-slate-500">{service.description}</CardDescription>
              </div>
              <Badge className={`rounded-full px-3 py-1 text-xs font-semibold ${serviceStatusStyles[service.status]}`}>
                {serviceStatusLabels[service.status]}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Service status</p>
                  <Select value={service.status} onValueChange={(value) => handleServiceStatusChange(service.id, value as ClientServiceStatus)}>
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(serviceStatusLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value} className="cursor-pointer">
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Renewal</p>
                  <p className="text-sm text-slate-900">{service.renewal}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Assigned team</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <UserPlus className="size-4" /> Assign employees
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-56">
                      <DropdownMenuLabel>Assign teammates</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {availableEmployees.map((employee) => (
                        <DropdownMenuCheckboxItem
                          key={employee}
                          checked={service.assignedEmployees.includes(employee)}
                          onCheckedChange={() => toggleEmployeeAssignment(service.id, employee)}
                          className="cursor-pointer"
                        >
                          {employee}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.assignedEmployees.length ? (
                    service.assignedEmployees.map((employee) => (
                      <Badge
                        key={employee}
                        variant="secondary"
                        className="flex items-center gap-1 rounded-full px-3 py-1 text-[11px]"
                      >
                        {employee}
                        <button
                          type="button"
                          onClick={() => removeEmployee(service.id, employee)}
                          className="cursor-pointer text-slate-500 transition hover:text-slate-900"
                          aria-label={`Remove ${employee}`}
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No teammates assigned yet.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
