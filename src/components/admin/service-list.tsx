"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { ServiceListItem } from "@/components/admin/service-list-item";

export type ServiceItem = {
  id: string;
  name: string;
  slug?: string;
};

type ServiceListProps = {
  page: number;
  onPaginationChange?: (page: number, totalPages: number) => void;
};

async function fetchServices(page: number) {
  const response = await fetch(`/api/admin/services?page=${page}&limit=10`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }
  return response.json();
}

export function ServiceList({ page, onPaginationChange }: ServiceListProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["services", page],
    queryFn: () => fetchServices(page),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
  });

  // Update pagination in useEffect to avoid setState during render
  useEffect(() => {
    if (data?.pagination && onPaginationChange) {
      onPaginationChange(data.pagination.page, data.pagination.totalPages);
    }
  }, [data?.pagination, onPaginationChange]);

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-red-600">
          Failed to load services. Please try again.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-500">Loading services...</p>
      </div>
    );
  }

  const services: ServiceItem[] =
    data?.services.map((service: any) => ({
      id: service.id,
      name: service.serviceName,
      slug: service.slug,
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
