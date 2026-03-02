"use client";

import { useRouter } from "next/navigation";
import type { EmployeeClientSummary } from "@/app/(dashboards)/employee/clients/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EmployeeClientListProps {
  clients: EmployeeClientSummary[];
}

export function EmployeeClientList({ clients }: EmployeeClientListProps) {
  if (clients.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
        <p className="text-slate-600">No clients found</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {clients.map((client) => (
        <EmployeeClientListItem client={client} key={client.clientId} />
      ))}
    </ul>
  );
}

function EmployeeClientListItem({ client }: { client: EmployeeClientSummary }) {
  const router = useRouter();

  const goToService = (serviceId: string) => {
    router.push(`/employee/clients/service/${serviceId}`);
  };

  return (
    <li className="px-4 py-4">
      <div className="flex w-full flex-col gap-4 rounded-xl text-left sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-semibold text-lg text-slate-900">
              {client.clientName}
            </p>
            <Badge
              className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-[11px] text-emerald-700"
              variant="secondary"
            >
              Active
            </Badge>
          </div>
          <p className="text-slate-500 text-sm">
            Member since {formatDate(client.createdAt)} · CL-
            {client.clientId.slice(0, 4).toUpperCase()}
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <div className="flex flex-wrap gap-2">
            {client.services.length === 0 ? (
              <Badge variant="outline">No services</Badge>
            ) : (
              client.services.map((service) => (
                <Button
                  className="cursor-pointer"
                  key={service.id}
                  onClick={() => goToService(service.id)}
                  size="sm"
                  variant="outline"
                >
                  {service.name}
                </Button>
              ))
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

function formatDate(value?: string) {
  if (!value) {
    return "recently";
  }
  try {
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return "recently";
  }
}
