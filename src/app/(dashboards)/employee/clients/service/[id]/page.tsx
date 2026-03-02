"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ProjectCalendarCard } from "@/components/employee/project-calendar-card";
import { ColdEmailCampaignStatisticsInput } from "@/components/employee/service-inputs/cold-email-campaign-statistics-input";
import type { ServiceInputProps } from "@/components/employee/service-inputs/types";
import {
  type FixedServiceId,
  getFixedService,
  isFixedServiceId,
} from "@/data/fixed-services";

const FALLBACK_TITLE = "Client Service";

const SERVICE_COMPONENTS: Partial<
  Record<FixedServiceId, React.ComponentType<ServiceInputProps>>
> = {
  COLD_EMAIL: ColdEmailCampaignStatisticsInput,
};

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const [inputValues, setInputValues] = useState<
    Record<string, string | boolean>
  >({});

  const { serviceName, serviceId } = useMemo(() => {
    const rawId = params?.id?.toUpperCase();
    if (rawId && isFixedServiceId(rawId)) {
      const definition = getFixedService(rawId);
      return { serviceName: definition.title, serviceId: definition.id };
    }
    return { serviceName: rawId || FALLBACK_TITLE, serviceId: null };
  }, [params]);

  const ServiceComponent = serviceId ? SERVICE_COMPONENTS[serviceId] : null;

  const handleInputChange = (fieldId: string, value: string | boolean) => {
    setInputValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  return (
    <section className="flex flex-1 flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="order-2 flex flex-col gap-4 lg:order-1">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-slate-400 text-xs uppercase tracking-[0.3em]">
            Service
          </p>
          <p className="font-semibold text-2xl text-slate-900">{serviceName}</p>
          {/* <p className="text-slate-500 text-sm">
            Calendar and coordination tools will remain here while inputs move
            into service-specific experiences.
          </p> */}
        </div>
        {ServiceComponent ? (
          <ServiceComponent
            defaultValues={inputValues}
            onChange={handleInputChange}
          />
        ) : (
          <div className="rounded-2xl border border-slate-200 border-dashed bg-slate-50 p-8 text-center">
            <p className="font-semibold text-lg text-slate-900">
              Service-specific inputs are coming soon
            </p>
            <p className="text-slate-500 text-sm">
              This page will only host scheduling utilities and updates. Input
              forms are being moved into dedicated layouts per service type.
            </p>
          </div>
        )}
      </div>

      <div className="order-1 space-y-4 lg:order-2">
        <ProjectCalendarCard />
      </div>
    </section>
  );
}
