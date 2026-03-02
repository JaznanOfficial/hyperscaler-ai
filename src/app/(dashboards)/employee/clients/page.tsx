"use client";

import { useEffect, useState } from "react";
import { EmployeeClientList } from "@/components/employee/client-service-list";

interface ApiServicePayload {
  id: string;
  clientId: string;
  clientName?: string;
  services?: Array<{
    serviceId?: string;
    serviceName?: string;
    serviceSlug?: string;
  }>;
  createdAt?: string;
}

export interface EmployeeClientSummary {
  clientId: string;
  clientName: string;
  createdAt?: string;
  services: Array<{
    id: string;
    name: string;
  }>;
}

export default function EmployeeClientsPage() {
  const [clients, setClients] = useState<EmployeeClientSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClientServices() {
      try {
        const response = await fetch("/api/client-services");
        if (!response.ok) {
          throw new Error("Failed to fetch client services");
        }
        const data = await response.json();
        const payload: ApiServicePayload[] = Array.isArray(data.client_services)
          ? data.client_services
          : [];

        const grouped = payload.reduce<Record<string, EmployeeClientSummary>>(
          (acc, entry) => {
            const services = Array.isArray(entry.services)
              ? entry.services.map((service) => ({
                  id: service.serviceId || service.serviceSlug || entry.id,
                  name:
                    service.serviceName ||
                    service.serviceSlug ||
                    "Client service",
                }))
              : [];

            if (acc[entry.clientId]) {
              acc[entry.clientId].services.push(...services);
            } else {
              acc[entry.clientId] = {
                clientId: entry.clientId,
                clientName: entry.clientName || "Client",
                createdAt: entry.createdAt,
                services: [...services],
              };
            }

            return acc;
          },
          {}
        );

        setClients(Object.values(grouped));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchClientServices();
  }, []);

  if (loading) {
    return (
      <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-slate-500">Loading clients...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <EmployeeClientList clients={clients} />
      </div>
    </section>
  );
}
