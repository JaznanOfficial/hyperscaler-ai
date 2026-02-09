"use client";

import { useQuery } from "@tanstack/react-query";
import { ServiceListItem } from "@/components/admin/service-list-item";

export type ServiceItem = {
  id: string;
  name: string;
};

async function fetchServices() {
  const response = await fetch("/api/admin/services", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }
  return response.json();
}

export function ServiceList() {
  const { data, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    staleTime: 0,
  });

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-500">Loading services...</p>
      </div>
    );
  }

  const services: ServiceItem[] = data?.services.map((service: any) => ({
    id: service.id,
    name: service.serviceName,
  })) || [];

  if (services.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-500">No services created yet</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {services.map((item) => (
          <ServiceListItem item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
