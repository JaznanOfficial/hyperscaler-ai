"use client";

import { useEffect, useState } from "react";
import { ActiveServicesStatusCard } from "@/components/dashboard/client/active-services-status-card";
import { BrandingContentPerformanceCard } from "@/components/dashboard/client/branding-content-performance-card";
import { ColdCallingPerformanceCard } from "@/components/dashboard/client/cold-calling-performance-card";
import { ColdLinkedinPerformanceCard } from "@/components/dashboard/client/cold-linkedin-performance-card";
import { ConversionRateTrendsCard } from "@/components/dashboard/client/conversion-rate-trends-card";
import { OverallProgressCard } from "@/components/dashboard/client/overall-progress-card";
import { PaidAdsPerformanceCard } from "@/components/dashboard/client/paid-ads-performance-card";
import { SocialMediaPerformanceCard } from "@/components/dashboard/client/social-media-performance-card";
import { SoftwareDevelopmentStatusCard } from "@/components/dashboard/client/software-development-status-card";

export default function ClientStatisticsPage() {
  const [serviceData, setServiceData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/client/statistics")
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const dataMap: Record<string, any> = {};
          for (const service of result.data) {
            // Map by service ID
            dataMap[service.serviceId] = {
              serviceName: service.serviceName,
              metrics: service.metrics,
              history: service.history || [], // Add history data
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
        </>
      )}

      {"cmm2b4i9v000010kjjn8gnunc" in serviceData && (
        <PaidAdsPerformanceCard
          data={serviceData["cmm2b4i9v000010kjjn8gnunc"]?.metrics}
        />
      )}

      {"cmm2b4j58000110kj3fouc7wr" in serviceData && (
        <SocialMediaPerformanceCard
          data={serviceData["cmm2b4j58000110kj3fouc7wr"]?.metrics}
        />
      )}

      {"cmm2b4jrx000210kjr0wxdk7s" in serviceData && (
        <ColdCallingPerformanceCard
          data={serviceData["cmm2b4jrx000210kjr0wxdk7s"]?.metrics}
        />
      )}

      {"cmm2b4khh000310kjfskvvs9k" in serviceData && (
        <BrandingContentPerformanceCard
          data={serviceData["cmm2b4khh000310kjfskvvs9k"]?.metrics}
        />
      )}

      {"cmm2b4l4d000410kj1l2q2qkc" in serviceData && (
        <ColdLinkedinPerformanceCard
          data={serviceData["cmm2b4l4d000410kj1l2q2qkc"]?.metrics}
        />
      )}

      {"cmm2b4lr0000510kj84s4g4f3" in serviceData && (
        <SoftwareDevelopmentStatusCard
          data={serviceData["cmm2b4lr0000510kj84s4g4f3"]?.metrics}
        />
      )}
    </div>
  );
}
