"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { BrandContentCreationStatisticsInput } from "@/components/employee/service-inputs/brand-content-creation-statistics-input";
import { ColdCallingStatisticsInput } from "@/components/employee/service-inputs/cold-calling-statistics-input";
import { ColdEmailCampaignStatisticsInput } from "@/components/employee/service-inputs/cold-email-campaign-statistics-input";
import { LinkedinOutreachStatisticsInput } from "@/components/employee/service-inputs/linkedin-outreach-statistics-input";
import { PaidAdsStatisticsInput } from "@/components/employee/service-inputs/paid-ads-statistics-input";
import { SocialMediaMarketingStatisticsInput } from "@/components/employee/service-inputs/social-media-marketing-statistics-input";
import { SoftwareDevelopmentStatisticsInput } from "@/components/employee/service-inputs/software-development-statistics-input";
import type { ServiceInputProps } from "@/components/employee/service-inputs/types";
import { Calendar } from "@/components/ui/calendar";
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
  PAID_ADS: PaidAdsStatisticsInput,
  SOCIAL_MEDIA: SocialMediaMarketingStatisticsInput,
  COLD_CALLING: ColdCallingStatisticsInput,
  BRAND_CONTENT: BrandContentCreationStatisticsInput,
  LINKEDIN_OUTREACH: LinkedinOutreachStatisticsInput,
  SOFTWARE_DEVELOPMENT: SoftwareDevelopmentStatisticsInput,
};

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const [inputValues, setInputValues] = useState<
    Record<string, string | boolean>
  >({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState("today");

  const { serviceName, serviceId } = useMemo(() => {
    const rawId = params?.id?.toUpperCase();
    if (rawId && isFixedServiceId(rawId)) {
      const definition = getFixedService(rawId);
      return { serviceName: definition.title, serviceId: definition.id };
    }
    return { serviceName: rawId || FALLBACK_TITLE, serviceId: null };
  }, [params]);

  const ServiceComponent = serviceId ? SERVICE_COMPONENTS[serviceId] : null;

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setInputValues({});
  };

  const handleInputChange = (fieldId: string, value: string | boolean) => {
    setInputValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const showCalendar =
    serviceId !== "SOFTWARE_DEVELOPMENT" || activeTab === "today";

  return (
    <section
      className={`flex flex-1 flex-col gap-4 ${
        showCalendar ? "lg:grid lg:grid-cols-[minmax(0,1fr)_320px]" : ""
      }`}
    >
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
            onTabChange={
              serviceId === "SOFTWARE_DEVELOPMENT" ? setActiveTab : undefined
            }
            selectedDate={selectedDate}
            serviceId={serviceId}
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

      {showCalendar && (
        <div className="order-1 space-y-4 lg:order-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="mb-4 text-slate-400 text-xs uppercase tracking-[0.3em]">
              Entry Date
            </p>
            <Calendar
              className="w-full rounded-lg border"
              disabled={(date: Date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date > today;
              }}
              fullWidth
              mode="single"
              onSelect={(date) => {
                if (date) handleDateChange(date);
              }}
              selected={selectedDate}
            />
          </div>
        </div>
      )}
    </section>
  );
}
