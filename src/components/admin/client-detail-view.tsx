"use client";

import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AssignEmployeesPopover } from "@/components/admin/assign-employees-popover";
import { AssignServiceDialog } from "@/components/admin/assign-service-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ClientDetail, ClientServiceStatus } from "@/data/clients";
import { FIXED_SERVICE_IDS, type FixedServiceId } from "@/data/fixed-services";

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

  const assignedServiceIds = useMemo(() => {
    const ids = client.requestedServices
      .map((service) => service.serviceId)
      .filter(
        (id): id is FixedServiceId =>
          Boolean(id) && FIXED_SERVICE_IDS.includes(id as FixedServiceId)
      );
    return Array.from(new Set(ids));
  }, [client.requestedServices]);

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

  const assignEmployees = async (
    serviceId: string,
    nextEmployeeIds: string[]
  ) => {
    try {
      const response = await fetch(
        `/api/admin/client-services/${serviceId}/assign`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ employeeIds: nextEmployeeIds }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update assignment");
      }

      setServices((prev) =>
        prev.map((service) =>
          service.id === serviceId
            ? { ...service, assignedEmployees: nextEmployeeIds }
            : service
        )
      );

      toast.success("Employees updated");
      return true;
    } catch (error) {
      toast.error("Failed to update assignment");
      return false;
    }
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
          <AssignServiceDialog
            assignedServiceIds={assignedServiceIds}
            clientId={clientId}
            clientName={client.name}
          />
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
                    <AssignEmployeesPopover
                      assignedEmployeeIds={service.assignedEmployees}
                      employees={employees}
                      onAssign={(employeeIds) =>
                        assignEmployees(service.id, employeeIds)
                      }
                      serviceName={service.name}
                    />
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
                                assignEmployees(
                                  service.id,
                                  service.assignedEmployees.filter(
                                    (id) => id !== employeeId
                                  )
                                )
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
                        No employees assigned yet.
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
