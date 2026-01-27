import { Save } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const metricGroups = [
  {
    id: "paid-ads",
    title: "Paid Ads (Google Ads, Meta Ads)",
    description: "Performance inputs for paid acquisition channels.",
    metrics: [
      { id: "impressions", label: "Impressions", enabled: true },
      { id: "reach", label: "Reach", enabled: true },
      { id: "clicks", label: "Clicks", enabled: true },
      { id: "ctr", label: "Click-Through Rate (CTR)", enabled: true },
      { id: "cpc", label: "Cost Per Click (CPC)", enabled: true },
      { id: "conversions", label: "Conversions", enabled: true },
      { id: "conversionRate", label: "Conversion Rate", enabled: true },
      { id: "cpa", label: "Cost Per Conversion", enabled: false },
      { id: "cpl", label: "Cost Per Lead (CPL)", enabled: true },
      { id: "adSpend", label: "Ad Spend", enabled: true },
      { id: "roas", label: "Return on Ad Spend (ROAS)", enabled: true },
      { id: "frequency", label: "Frequency", enabled: false },
      { id: "qualityScore", label: "Quality Score (Google Ads)", enabled: true },
      { id: "adRelevance", label: "Ad Relevance Score (Meta)", enabled: false },
    ],
  },
  {
    id: "seo",
    title: "SEO (Organic Search)",
    description: "Organic traffic and ranking metrics.",
    metrics: [
      { id: "organicSessions", label: "Organic Sessions", enabled: true },
      { id: "organicUsers", label: "Organic Users", enabled: true },
      { id: "keywordRankings", label: "Keyword Rankings", enabled: true },
      { id: "keywordChange", label: "Keyword Position Change", enabled: false },
      { id: "organicCtr", label: "Click-Through Rate (Organic CTR)", enabled: true },
      { id: "impressionsSearchConsole", label: "Impressions (Search Console)", enabled: true },
      { id: "indexedPages", label: "Indexed Pages", enabled: false },
      { id: "backlinks", label: "Backlinks Acquired", enabled: true },
      { id: "domainAuthority", label: "Domain Authority / DR", enabled: false },
      { id: "pageSpeed", label: "Page Load Speed", enabled: true },
      { id: "coreWebVitals", label: "Core Web Vitals", enabled: false },
      { id: "bounceRate", label: "Bounce Rate", enabled: true },
      { id: "organicConversions", label: "Conversions from Organic Traffic", enabled: true },
    ],
  },
  {
    id: "social",
    title: "Social Media (Organic)",
    description: "Organic social engagement signals.",
    metrics: [
      { id: "socialImpressions", label: "Impressions", enabled: true },
      { id: "socialReach", label: "Reach", enabled: true },
      { id: "engagements", label: "Engagements", enabled: true },
      { id: "engagementRate", label: "Engagement Rate", enabled: true },
      { id: "followersGained", label: "Followers Gained", enabled: true },
      { id: "profileVisits", label: "Profile Visits", enabled: true },
      { id: "linkClicks", label: "Link Clicks", enabled: false },
      { id: "shares", label: "Shares / Saves", enabled: false },
      { id: "videoViews", label: "Video Views", enabled: true },
      { id: "watchTime", label: "Watch Time", enabled: false },
      { id: "socialConversion", label: "Conversion Rate (Social → Lead)", enabled: true },
    ],
  },
  {
    id: "cold-email",
    title: "Cold Email Campaigns",
    description: "Outbound email funnel metrics.",
    metrics: [
      { id: "emailsSent", label: "Emails Sent", enabled: true },
      { id: "deliveryRate", label: "Delivery Rate", enabled: true },
      { id: "openRate", label: "Open Rate", enabled: true },
      { id: "clickRate", label: "Click Rate", enabled: true },
      { id: "replyRate", label: "Reply Rate", enabled: true },
      { id: "positiveReplyRate", label: "Positive Reply Rate", enabled: false },
      { id: "bounceRateEmail", label: "Bounce Rate", enabled: true },
      { id: "spamComplaints", label: "Spam Complaint Rate", enabled: false },
      { id: "meetingsBooked", label: "Meetings Booked", enabled: true },
      { id: "emailConversion", label: "Conversion Rate (Email → Meeting)", enabled: true },
    ],
  },
  {
    id: "cold-linkedin",
    title: "Cold LinkedIn Outreach",
    description: "LinkedIn prospecting funnel.",
    metrics: [
      { id: "connectionRequests", label: "Connection Requests Sent", enabled: true },
      { id: "acceptanceRate", label: "Acceptance Rate", enabled: true },
      { id: "messagesSent", label: "Messages Sent", enabled: true },
      { id: "replyRateLinkedin", label: "Reply Rate", enabled: true },
      { id: "positiveReplyRateLinkedin", label: "Positive Reply Rate", enabled: false },
      { id: "qualifiedLeads", label: "Qualified Leads", enabled: true },
      { id: "meetingsBookedLinkedin", label: "Meetings Booked", enabled: true },
      { id: "conversionRateLinkedin", label: "Conversion Rate (Connection → Lead)", enabled: true },
    ],
  },
  {
    id: "cold-calling",
    title: "Cold Calling",
    description: "Call center health metrics.",
    metrics: [
      { id: "callsMade", label: "Calls Made", enabled: true },
      { id: "pickupRate", label: "Pick-Up Rate", enabled: true },
      { id: "callDuration", label: "Average Call Duration", enabled: false },
      { id: "qualifiedConversations", label: "Qualified Conversations", enabled: true },
      { id: "followUps", label: "Follow-Ups Scheduled", enabled: true },
      { id: "meetingsBookedCalling", label: "Meetings Booked", enabled: true },
      { id: "conversionRateCalling", label: "Conversion Rate (Call → Meeting)", enabled: true },
    ],
  },
  {
    id: "branding",
    title: "Branding & Content Creation",
    description: "Content production metrics.",
    metrics: [
      { id: "assetsProduced", label: "Assets Produced", enabled: true },
      { id: "approvalRate", label: "Approval Rate", enabled: true },
      { id: "timeToDelivery", label: "Time to Delivery", enabled: true },
      { id: "contentEngagement", label: "Content Engagement Rate", enabled: true },
      { id: "contentClickRate", label: "Click Rate (from Content)", enabled: true },
      { id: "contentConversionRate", label: "Conversion Rate (Content → Lead)", enabled: true },
      { id: "brandSearchVolume", label: "Brand Search Volume", enabled: false },
      { id: "directTrafficGrowth", label: "Direct Traffic Growth", enabled: true },
    ],
  },
  {
    id: "software",
    title: "Software Development / AI Products",
    description: "Product/engineering KPIs.",
    metrics: [
      { id: "tasksCompleted", label: "Tasks Completed", enabled: true },
      { id: "velocity", label: "Velocity", enabled: true },
      { id: "bugResolution", label: "Bug Resolution Rate", enabled: true },
      { id: "deploymentSuccess", label: "Deployment Success Rate", enabled: true },
      { id: "uptime", label: "Uptime (%)", enabled: true },
      { id: "responseTime", label: "Response Time", enabled: true },
      { id: "errorRate", label: "Error Rate", enabled: true },
      { id: "activeUsers", label: "Active Users", enabled: true },
      { id: "featureAdoption", label: "Feature Adoption Rate", enabled: true },
      { id: "churnRate", label: "Churn Rate", enabled: false },
      { id: "costPerRequest", label: "Cost per AI Request", enabled: true },
    ],
  },
  {
    id: "client-health",
    title: "Client Health & Delivery",
    description: "Agency-level delivery metrics.",
    metrics: [
      { id: "slaAdherence", label: "SLA Adherence", enabled: true },
      { id: "deliveryTimeliness", label: "Delivery Timeliness", enabled: true },
      { id: "csat", label: "Client Satisfaction Score (CSAT)", enabled: true },
      { id: "retentionRate", label: "Retention Rate", enabled: true },
      { id: "expansionRevenue", label: "Expansion Revenue", enabled: true },
      { id: "ttv", label: "Time to Value (TTV)", enabled: true },
    ],
  },
]

export default function ProjectDetailPage() {
  return (
    <section className="flex flex-1 flex-col gap-4">
      <header className="rounded-2xl border border-slate-200 bg-white px-6 py-4">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Projects</p>
        <h1 className="text-2xl font-semibold text-slate-900">Metrics</h1>
      </header>

      <div className="space-y-4">
        {metricGroups.map((group) => {
          const activeMetrics = group.metrics.filter((metric) => metric.enabled)
          if (!activeMetrics.length) return null

          return (
            <Card key={group.id} className="">
              <CardHeader>
                <CardTitle>{group.title}</CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {activeMetrics.map((metric) => {
                  const inputId = `${group.id}-${metric.id}`
                  return (
                    <label key={metric.id} className="flex flex-col gap-2 text-sm text-slate-600" htmlFor={inputId}>
                      <span className="font-medium text-slate-900">{metric.label}</span>
                      <Input id={inputId} placeholder="Enter value" />
                    </label>
                  )
                })}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-end">
        <Button size="lg" className="gap-2">
          <Save className="h-4 w-4" />
          Save metrics
        </Button>
      </div>
    </section>
  )
}
