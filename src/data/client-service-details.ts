export interface ClientServiceMetric {
  title: string;
  description: string;
}

export interface ClientServiceDetail {
  id: string;
  title: string;
  description: string;
  badge?: string;
  price: string;
  cadence: string;
  features: string[];
  metrics: ClientServiceMetric[];
  note?: string;
}

export const clientServiceDetails: Record<string, ClientServiceDetail> = {
  "brand-content": {
    id: "brand-content",
    title: "Brand & Content Creation",
    description:
      "Launch, optimize, and scale paid campaigns with full visibility on spend, performance, and ROI.",
    badge: "Popular",
    price: "$500",
    cadence: "/month",
    features: [
      "Track impressions, reach, clicks, CTR",
      "AI-optimized spend & targeting",
      "Higher CTR, lower CPC",
      "Conversion-focused campaign insights",
    ],
    metrics: [
      { title: "Impressions", description: "Total times ads were shown" },
      { title: "Reach", description: "Unique users who saw your ads" },
      { title: "Clicks", description: "Total number of clicks on your ads" },
      {
        title: "Click-Through Rate (CTR)",
        description: "Clicks divided by impressions",
      },
      {
        title: "Cost per Click (CPC)",
        description: "Average cost you pay per click",
      },
      {
        title: "Conversion Rate",
        description: "Rate of completed desired user action",
      },
      { title: "Ad Spent", description: "Total amount spent on ads" },
      {
        title: "Return on Ad Spend (ROAS)",
        description: "Revenue earned for each dollar spent",
      },
    ],
    note: "All the metrics can be tracked only after you subscribe to the service",
  },
  "pipeline-accelerator": {
    id: "pipeline-accelerator",
    title: "Pipeline Accelerator",
    description:
      "Outbound orchestration focused on high-intent accounts ready to convert now.",
    badge: "New",
    price: "$800",
    cadence: "/month",
    features: [
      "Account-level prioritization",
      "Intent signal routing",
      "AI-assisted follow-up scripts",
      "Meeting booking automation",
    ],
    metrics: [
      { title: "Meetings", description: "Confirmed meetings sourced" },
      { title: "Reply Rate", description: "Positive replies vs. total sends" },
      { title: "Time to First Touch", description: "Average time to engage" },
      {
        title: "Pipeline Added",
        description: "Value of opportunities created",
      },
    ],
    note: "Analytics unlock after activating the service",
  },
  "social-media-strategy": {
    id: "social-media-strategy",
    title: "Social Media Strategy",
    description: "Full-funnel nurture across all priority social platforms.",
    badge: "Live",
    price: "$450",
    cadence: "/month",
    features: [
      "Post calendar automation",
      "Creative QA workflows",
      "Engagement insights",
      "Performance benchmarking",
    ],
    metrics: [
      { title: "Followers", description: "Net follower change" },
      { title: "Engagement", description: "Likes, comments, shares" },
      { title: "Traffic", description: "Sessions sourced from social" },
      { title: "Leads", description: "Form submissions from social" },
    ],
  },
  "website-redesign": {
    id: "website-redesign",
    title: "Website Redesign",
    description: "Modernize your marketing site with CRO-first layouts.",
    badge: "In progress",
    price: "$1.1k",
    cadence: "/month",
    features: [
      "UX and copy audit",
      "Component library refresh",
      "Accessibility validation",
      "Analytics instrumentation",
    ],
    metrics: [
      {
        title: "Bounce Rate",
        description: "Visitors leaving without engaging",
      },
      { title: "Session Duration", description: "Average visit duration" },
      { title: "Conversion Rate", description: "Form submissions per visit" },
      { title: "Page Speed", description: "Core Web Vitals overview" },
    ],
  },
};

export const defaultClientServiceDetail: ClientServiceDetail =
  clientServiceDetails["brand-content"];

export function getClientServiceDetail(
  id: string
): ClientServiceDetail | undefined {
  return clientServiceDetails[id];
}
