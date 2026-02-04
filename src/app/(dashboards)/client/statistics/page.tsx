import { ActiveServicesStatusCard } from "@/components/dashboard/client/active-services-status-card"
import { ConversionRateTrendsCard } from "@/components/dashboard/client/conversion-rate-trends-card"
import { OverallProgressCard } from "@/components/dashboard/client/overall-progress-card"
import { PaidAdsPerformanceCard } from "@/components/dashboard/client/paid-ads-performance-card"
import { ColdCallingPerformanceCard } from "@/components/dashboard/client/cold-calling-performance-card"
import { ColdLinkedinPerformanceCard } from "@/components/dashboard/client/cold-linkedin-performance-card"
import { BrandingContentPerformanceCard } from "@/components/dashboard/client/branding-content-performance-card"
import { ServicesOverviewCard } from "@/components/dashboard/client/services-overview-card"
import { SocialMediaPerformanceCard } from "@/components/dashboard/client/social-media-performance-card"

export default function ClientStatisticsPage() {
  return (
    <div className="space-y-6 p-4">
      <div className="max-w-xl">
        <h1 className="text-3xl font-semibold leading-10" style={{ fontFamily: "var(--font-outfit)" }}>
          <span className="inline-block bg-linear-to-r from-violet-800 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            Statistics
          </span>
        </h1>
        <p className="text-base leading-3 text-slate-600">
          Track your conversations, replies, and lead generation in real time.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Overall Progress</h2>
            <p className="text-sm text-slate-600">Combined progress across all active services.</p>
          </div>
          <OverallProgressCard />
        </div>
        <ActiveServicesStatusCard />
      </div>

      <ConversionRateTrendsCard />

      <ServicesOverviewCard />

      <PaidAdsPerformanceCard />

      <SocialMediaPerformanceCard />

      <ColdCallingPerformanceCard />

      <BrandingContentPerformanceCard />

      <ColdLinkedinPerformanceCard />
    </div>
  )
}
