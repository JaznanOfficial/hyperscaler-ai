import { ActiveServicesStatusCard } from "@/components/dashboard/client/active-services-status-card";
import { BrandingContentPerformanceCard } from "@/components/dashboard/client/branding-content-performance-card";
import { ColdCallingPerformanceCard } from "@/components/dashboard/client/cold-calling-performance-card";
import { ColdLinkedinPerformanceCard } from "@/components/dashboard/client/cold-linkedin-performance-card";
import { ConversionRateTrendsCard } from "@/components/dashboard/client/conversion-rate-trends-card";
import { OverallProgressCard } from "@/components/dashboard/client/overall-progress-card";
import { PaidAdsPerformanceCard } from "@/components/dashboard/client/paid-ads-performance-card";
import { ServicesOverviewCard } from "@/components/dashboard/client/services-overview-card";
import { SocialMediaPerformanceCard } from "@/components/dashboard/client/social-media-performance-card";

export default function ClientStatisticsPage() {
  return (
    <div className="space-y-6 p-4">
      <div className="max-w-xl">
        <h1
          className="font-semibold text-3xl leading-10"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          <span className="inline-block bg-linear-to-r from-violet-800 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            Statistics
          </span>
        </h1>
        <p className="text-base text-slate-600 leading-3">
          Track your conversations, replies, and lead generation in real time.
        </p>
      </div>

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
          <ActiveServicesStatusCard />
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
        <ConversionRateTrendsCard />
      </div>

      <div className="space-y-3">
        <div>
          <h2 className="font-semibold text-slate-900 text-xl">
            Services Overview
          </h2>
          <p className="text-slate-600 text-sm">
            Individual performance of each subscribed service.
          </p>
        </div>
        <ServicesOverviewCard />
      </div>

      <PaidAdsPerformanceCard />

      <SocialMediaPerformanceCard />

      <ColdCallingPerformanceCard />

      <BrandingContentPerformanceCard />

      <ColdLinkedinPerformanceCard />
    </div>
  );
}
