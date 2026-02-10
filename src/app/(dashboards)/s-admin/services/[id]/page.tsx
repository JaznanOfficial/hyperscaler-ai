"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ServiceDetailsForm } from "@/components/admin/service-details-form";
import type { ServiceSection } from "@/components/admin/service-details-form";

export default function SuperAdminServiceDetailsPage() {
  const params = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchService() {
      try {
        const response = await fetch(`/api/admin/services/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setService(data.service);
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchService();
    }
  }, [params.id]);

  if (loading) {
    return (
      <section className="flex h-[calc(100vh-6rem)] flex-1 items-center justify-center">
        <p className="text-slate-500">Loading service...</p>
      </section>
    );
  }

  if (!service) {
    return (
      <section className="flex h-[calc(100vh-6rem)] flex-1 items-center justify-center">
        <p className="text-slate-500">Service not found</p>
      </section>
    );
  }

  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-y-auto">
      <ServiceDetailsForm
        initialSections={service.sections as ServiceSection[]}
        initialServiceName={service.serviceName}
        serviceId={service.id}
      />
    </section>
  );
}
