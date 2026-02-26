"use client";

import { UserPlus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { AssignServiceDialog } from "@/components/admin/assign-service-dialog";
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

interface Package {
  id: string;
  packageName: string;
  amount: number;
  status: string;
  createdAt: string;
}

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

export function ClientDetailView({
  client,
  clientId,
}: {
  client: ClientDetail;
  clientId: string;
}) {
  const [services, setServices] = useState(client.requestedServices);
  const [packages, setPackages] = useState<Package[]>([]);
  const [employees, setEmployees] = useState<
    Array<{ id: string; name: string }>
  >([]);

  useEffect(() => {
    setServices(client.requestedServices);
  }, [client.requestedServices]);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/employees").then((res) => res.json()),
      fetch(`/api/admin/clients/${clientId}/packages`).then((res) =>
        res.json()
      ),
    ])
      .then(([employeesData, packagesData]) => {
        setEmployees(employeesData.employees || []);
        setPackages(packagesData.packages || []);
      })
      .catch(() => {});
  }, [clientId]);

  const availableEmployees = useMemo(
    () => employees.map((e) => e.name).sort(),
    [employees]
  );

  const handleServiceStatusChange = async (
    serviceId: string,
    status: ClientServiceStatus
  ) => {
    try {
      const response = await fetch(`/api/admin/projects/${serviceId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status:
            status === "Approved"
              ? "APPROVED"
              : status === "Cancelled"
                ? "CANCELLED"
                : "PENDING",
        }),
      });

      if (!response.ok) throw new Error("Failed to update");

      setServices((prev) =>
        prev.map((service) =>
          service.id === serviceId ? { ...service, status } : service
        )
      );

      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const toggleEmployeeAssignment = async (
    serviceId: string,
    employeeId: string
  ) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    const isAssigned = service.assignedEmployees.includes(employeeId);
    const newAssignedEmployees = isAssigned
      ? service.assignedEmployees.filter((id) => id !== employeeId)
      : [...service.assignedEmployees, employeeId];

    try {
      const response = await fetch(`/api/admin/projects/${serviceId}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeIds: newAssignedEmployees }),
      });

      if (!response.ok) throw new Error("Failed to assign");

      setServices((prev) =>
        prev.map((s) =>
          s.id === serviceId
            ? { ...s, assignedEmployees: newAssignedEmployees }
            : s
        )
      );

      toast.success(isAssigned ? "Employee removed" : "Employee assigned");
    } catch (error) {
      toast.error("Failed to update assignment");
    }
  };

  const removeEmployee = (serviceId: string, employeeId: string) => {
    toggleEmployeeAssignment(serviceId, employeeId);
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
            <span className="font-semibold text-slate-900">Client ID</span>
            <p>{`CL-${client.id.slice(0, 4).toUpperCase()}`}</p>
          </div>
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

      {packages.length > 0 && (
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-slate-400 text-xs uppercase tracking-[0.3em]">
              Packages
            </p>
            <p className="font-semibold text-base text-slate-900">
              Purchased packages
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((pkg) => (
              <Card className="border border-slate-200 p-6" key={pkg.id}>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">
                      {pkg.packageName}
                    </h3>
                    <p className="text-slate-500 text-sm">
                      Purchased on{" "}
                      {new Date(pkg.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-2xl text-slate-900">
                      ${(pkg.amount / 100).toFixed(2)}
                    </span>
                    <span className="text-slate-500 text-sm">/month</span>
                  </div>
                  <div>
                    <Badge
                      className={`rounded-full px-3 py-1 font-semibold text-xs ${
                        pkg.status === "PAID"
                          ? "bg-emerald-100 text-emerald-700"
                          : pkg.status === "UNPAID"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {pkg.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-400 text-xs uppercase tracking-[0.3em]">
              Services
            </p>
            <p className="font-semibold text-base text-slate-900">
              Active workstreams
            </p>
          </div>
          <AssignServiceDialog clientId={clientId} clientName={client.name} />
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
                        {employees.map((employee) => (
                          <DropdownMenuCheckboxItem
                            checked={service.assignedEmployees.includes(
                              employee.id
                            )}
                            className="cursor-pointer"
                            key={employee.id}
                            onCheckedChange={() =>
                              toggleEmployeeAssignment(service.id, employee.id)
                            }
                          >
                            {employee.name}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.assignedEmployees.length ? (
                      service.assignedEmployees.map((employeeId) => {
                        const employee = employees.find(
                          (e) => e.id === employeeId
                        );
                        return (
                          <Badge
                            className="flex items-center gap-1 rounded-full px-3 py-1 text-[11px]"
                            key={employeeId}
                            variant="secondary"
                          >
                            {employee?.name || "Unknown"}
                            <button
                              aria-label={`Remove ${employee?.name}`}
                              className="cursor-pointer text-slate-500 transition hover:text-slate-900"
                              onClick={() =>
                                removeEmployee(service.id, employeeId)
                              }
                              type="button"
                            >
                              <X className="size-3" />
                            </button>
                          </Badge>
                        );
                      })
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
