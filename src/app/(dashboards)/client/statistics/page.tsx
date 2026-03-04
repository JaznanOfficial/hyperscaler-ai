"use client";

import { useEffect, useState } from "react";
import { ActiveServicesStatusCard } from "@/components/dashboard/client/active-services-status-card";
import { BrandingContentPerformanceCard } from "@/components/dashboard/client/branding-content-performance-card";
import { ColdCallingPerformanceCard } from "@/components/dashboard/client/cold-calling-performance-card";
import { ColdEmailPerformanceCard } from "@/components/dashboard/client/cold-email-performance-card";
import { ColdLinkedinPerformanceCard } from "@/components/dashboard/client/cold-linkedin-performance-card";
import { ConversionRateTrendsCard } from "@/components/dashboard/client/conversion-rate-trends-card";
import { OverallProgressCard } from "@/components/dashboard/client/overall-progress-card";
import { PaidAdsPerformanceCard } from "@/components/dashboard/client/paid-ads-performance-card";
import { SocialMediaPerformanceCard } from "@/components/dashboard/client/social-media-performance-card";
import { SoftwareDevelopmentStatusCard } from "@/components/dashboard/client/software-development-status-card";

type ServiceCardComponent = React.ComponentType<{ data: any }>;

interface ServiceCardConfig {
  name: string;
  component: ServiceCardComponent;
}

const SERVICE_CARD_MAP: Record<string, ServiceCardConfig> = {
  PAID_ADS: {
    name: "Paid Ads",
    component: PaidAdsPerformanceCard,
  },
  COLD_EMAIL: {
    name: "Cold Email",
    component: ColdEmailPerformanceCard,
  },
  SOCIAL_MEDIA: {
    name: "Social Media Marketing",
    component: SocialMediaPerformanceCard,
  },
  COLD_CALLING: {
    name: "Cold Calling",
    component: ColdCallingPerformanceCard,
  },
  BRAND_CONTENT: {
    name: "Branding Content",
    component: BrandingContentPerformanceCard,
  },
  LINKEDIN_OUTREACH: {
    name: "LinkedIn Outreach",
    component: ColdLinkedinPerformanceCard,
  },
  SOFTWARE_DEVELOPMENT: {
    name: "Software Development",
    component: SoftwareDevelopmentStatusCard,
  },
};

export default function ClientStatisticsPage() {
  const [serviceData, setServiceData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/client/statistics")
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const dataMap: Record<string, Record<string, unknown>> = {};
          for (const service of result.data) {
            // Map by serviceId to avoid duplicates, but use serviceName as display key
            const key = service.serviceId || service.serviceName;
            dataMap[key] = {
              serviceName: service.serviceName,
              serviceId: service.serviceId,
              metrics: service.metrics,
              history: service.history || [],
            };
          }
          setServiceData(dataMap);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-slate-500">Loading statistics...</p>
      </div>
    );
  }

  const hasAnyServices = Object.keys(serviceData).length > 0;

  return (
    <div className="space-y-6 p-4">
      <div className="max-w-xl">
        <h1
          className="font-semibold text-3xl leading-10"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          <span className="inline-block bg-linear-to-r from-violet-800 to-fuchsia-500 bg-clip-text text-transparent">
            Statistics
          </span>
        </h1>
        <p className="text-base text-slate-600 leading-3">
          Track your conversations, replies, and lead generation in real time.
        </p>
      </div>

      {!hasAnyServices && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-500">
            No services assigned yet. Your team will update metrics once
            services are active.
          </p>
        </div>
      )}

      {hasAnyServices && (
        <>
          <div className="grid gap-6 xl:grid-cols-2">
            <div className="h-full space-y-3">
              <div>
                <h2 className="font-semibold text-slate-900 text-xl">
                  Overall Progress
                </h2>
                <p className="text-slate-600 text-sm">
                  Combined progress across all active services.
                </p>
              </div>
              <OverallProgressCard />
            </div>
            <div className="h-full space-y-3">
              <div>
                <h2 className="font-semibold text-slate-900 text-xl">
                  Active Services Status
                </h2>
                <p className="text-slate-600 text-sm">
                  Quick highlights that show service health status.
                </p>
              </div>
              <ActiveServicesStatusCard serviceData={serviceData} />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h2 className="font-semibold text-slate-900 text-xl">
                Conversion Rate Trends
              </h2>
              <p className="text-slate-600 text-sm">
                30-day trend comparison across conversion rates.
              </p>
            </div>
            <ConversionRateTrendsCard serviceData={serviceData} />
          </div>

          <div className="space-y-6">
            {Object.entries(serviceData).map(([, data]) => {
              const dataRecord = data as Record<string, unknown>;
              const displayName = dataRecord.serviceName as string;
              const serviceKey = Object.keys(SERVICE_CARD_MAP).find(
                (key) => SERVICE_CARD_MAP[key].name === displayName
              );

              if (!serviceKey) return null;

              const config = SERVICE_CARD_MAP[serviceKey];
              const CardComponent = config.component;

              return (
                <CardComponent data={dataRecord.metrics} key={displayName} />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
