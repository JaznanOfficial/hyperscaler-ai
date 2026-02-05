"use client";

import { UserPlus, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ClientDetail, ClientServiceStatus } from "@/data/clients";
import { employeeDirectory } from "@/data/clients";

const accountStatusStyles: Record<ClientDetail["accountStatus"], string> = {
  Approved: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-rose-100 text-rose-700",
};

const serviceStatusLabels: Record<ClientServiceStatus, string> = {
  Approved: "Approved",
  Pending: "Pending",
  Cancelled: "Cancelled",
};

const serviceStatusStyles: Record<ClientServiceStatus, string> = {
  Approved: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-rose-100 text-rose-700",
};

export function ClientDetailView({ client }: { client: ClientDetail }) {
  const [services, setServices] = useState(client.requestedServices);

  const availableEmployees = useMemo(() => [...employeeDirectory].sort(), []);

  const handleServiceStatusChange = (
    serviceId: string,
    status: ClientServiceStatus
  ) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === serviceId ? { ...service, status } : service
      )
    );
  };

  const toggleEmployeeAssignment = (serviceId: string, employee: string) => {
    setServices((prev) =>
      prev.map((service) => {
        if (service.id !== serviceId) return service;
        const assigned = service.assignedEmployees.includes(employee);
        return {
          ...service,
          assignedEmployees: assigned
            ? service.assignedEmployees.filter((name) => name !== employee)
            : [...service.assignedEmployees, employee],
        };
      })
    );
  };

  const removeEmployee = (serviceId: string, employee: string) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              assignedEmployees: service.assignedEmployees.filter(
                (name) => name !== employee
              ),
            }
          : service
      )
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-900">
            {client.name}
          </CardTitle>
          <CardDescription className="text-slate-500 text-sm">
            {client.email}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4 text-slate-600 text-sm">
          <div>
            <span className="font-semibold text-slate-900">Subscription</span>
            <p>{client.subscriptionId}</p>
          </div>
          <div>
            <span className="font-semibold text-slate-900">Account status</span>
            <p>
              <Badge
                className={`rounded-full px-3 py-1 font-semibold text-xs ${accountStatusStyles[client.accountStatus]}`}
              >
                {client.accountStatus}
              </Badge>
            </p>
          </div>
          <div>
            <span className="font-semibold text-slate-900">
              Requested services
            </span>
            <p>{services.length}</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div>
          <p className="font-semibold text-slate-400 text-xs uppercase tracking-[0.3em]">
            Services
          </p>
          <p className="font-semibold text-base text-slate-900">
            Active workstreams
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Card className="border border-slate-200" key={service.id}>
              <CardHeader className="flex flex-col gap-2">
                <div>
                  <CardTitle className="text-lg text-slate-900">
                    {service.name}
                  </CardTitle>
                  <CardDescription className="text-slate-500 text-sm">
                    {service.description}
                  </CardDescription>
                </div>
                <Badge
                  className={`w-fit rounded-full px-3 py-1 font-semibold text-[11px] ${serviceStatusStyles[service.status]}`}
                >
                  {serviceStatusLabels[service.status]}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">
                    Service status
                  </p>
                  <Select
                    onValueChange={(value) =>
                      handleServiceStatusChange(
                        service.id,
                        value as ClientServiceStatus
                      )
                    }
                    value={service.status}
                  >
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(serviceStatusLabels).map(
                        ([value, label]) => (
                          <SelectItem
                            className="cursor-pointer"
                            key={value}
                            value={value}
                          >
                            {label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">
                      Assigned team
                    </p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="gap-2" size="sm" variant="outline">
                          <UserPlus className="size-4" /> Assign employees
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="min-w-56">
                        <DropdownMenuLabel>Assign teammates</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {availableEmployees.map((employee) => (
                          <DropdownMenuCheckboxItem
                            checked={service.assignedEmployees.includes(
                              employee
                            )}
                            className="cursor-pointer"
                            key={employee}
                            onCheckedChange={() =>
                              toggleEmployeeAssignment(service.id, employee)
                            }
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
                          className="flex items-center gap-1 rounded-full px-3 py-1 text-[11px]"
                          key={employee}
                          variant="secondary"
                        >
                          {employee}
                          <button
                            aria-label={`Remove ${employee}`}
                            className="cursor-pointer text-slate-500 transition hover:text-slate-900"
                            onClick={() => removeEmployee(service.id, employee)}
                            type="button"
                          >
                            <X className="size-3" />
                          </button>
                        </Badge>
                      ))
                    ) : (
                      <p className="text-slate-500 text-sm">
                        No teammates assigned yet.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
