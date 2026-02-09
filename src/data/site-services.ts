export interface SiteService {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  price: string;
  cadence: string;
  badge?: "Popular" | "New";
}

export const marketingServices: SiteService[] = [
  {
    id: "paid-ads",
    title: "Paid Ads",
    description:
      "Launch, optimize, and scale paid campaigns with full visibility on spend, performance, and ROI.",
    bullets: [
      "Track impressions, reach, clicks, CTR",
      "Optimize across channels",
      "Higher CTR, lower CPC",
      "Customer-focused campaign insights",
    ],
    price: "$500",
    cadence: "/month",
    badge: "Popular",
  },
  {
    id: "cold-email",
    title: "Cold Email Campaign",
    description:
      "Generate leads and boost sales with targeted email campaigns. Maximize your outreach with expert workflows.",
    bullets: [
      "Smart campaign templates",
      "High deliverability, low bounce",
      "Automated follow-ups",
      "Insights to optimize your strategy",
    ],
    price: "$500",
    cadence: "/month",
    badge: "Popular",
  },
  {
    id: "social-media",
    title: "Social Media Marketing",
    description:
      "Elevate your brand with strategic social media campaigns. Increase awareness, expand reach, drive measurable results.",
    bullets: [
      "Track reach and engagement",
      "Audience insights",
      "Analyze sales velocity",
      "Measure conversions and follower growth",
    ],
    price: "$500",
    cadence: "/month",
    badge: "Popular",
  },
  {
    id: "brand-content",
    title: "Branding & Content Creation",
    description:
      "Create engaging content that informs and builds presence. Drive demand and build trust across channels.",
    bullets: [
      "Research-driven storytelling",
      "Multi-channel assets",
      "Dedicated creative team",
      "Consistent brand experience",
    ],
    price: "$500",
    cadence: "/month",
    badge: "New",
  },
  {
    id: "linkedin-outreach",
    title: "Cold LinkedIn Outreach",
    description:
      "Connect and engage with your ideal buyers through curated LinkedIn outreach flows.",
    bullets: [
      "Tailored connection scripts",
      "Talk tracks for modern buyers",
      "Automated nurture sequences",
      "Pipeline insights per persona",
    ],
    price: "$500",
    cadence: "/month",
    badge: "New",
  },
  {
    id: "cold-calling",
    title: "Cold Calling",
    description:
      "Drive consistent meetings through structured outreach, compelling messaging, and conversion focus.",
    bullets: [
      "Scripts for every objection",
      "Meeting-ready handoffs",
      "Realtime coaching",
      "Metrics to optimize conversion",
    ],
    price: "$500",
    cadence: "/month",
    badge: "New",
  },
];

export const softwareServices: SiteService[] = [
  {
    id: "ai-automation",
    title: "AI Automation Setup",
    description:
      "Connect internal systems to Hyperscaler AI automations for realtime decisioning and workflows.",
    bullets: [
      "Process mapping + orchestration",
      "Secure API & webhook plumbing",
      "Role-based access setup",
      "Observability dashboards included",
    ],
    price: "$1,000",
    cadence: "/month",
    badge: "Popular",
  },
  {
    id: "data-pipeline",
    title: "Data Pipeline Accelerator",
    description:
      "Unify product, marketing, and finance data into a governed lakehouse that powers analytics.",
    bullets: [
      "Warehouse + lake modeling",
      "Realtime sync to Hyperscaler AI",
      "Quality checks + alerts",
      "Analytics-ready semantic layer",
    ],
    price: "$1,200",
    cadence: "/month",
    badge: "Popular",
  },
  {
    id: "custom-dashboards",
    title: "Custom Dashboards",
    description:
      "Build tailored dashboards with predictive insights, anomaly detection, and narrative summaries.",
    bullets: [
      "Executive + ops level lenses",
      "Interactive drill downs",
      "Automated PDF recaps",
      "Embedded sharing",
    ],
    price: "$800",
    cadence: "/month",
    badge: "New",
  },
  {
    id: "integration-lab",
    title: "Integration Lab",
    description:
      "Ship integrations to CRMs, ERPs, ticketing tools, and internal systems with our expert studio.",
    bullets: [
      "50+ prebuilt connectors",
      "Custom adapter tooling",
      "Security & compliance review",
      "Managed release process",
    ],
    price: "$900",
    cadence: "/month",
    badge: "New",
  },
  {
    id: "devops-guard",
    title: "DevOps Guardrails",
    description:
      "Harden delivery pipelines with golden workflows, drift monitoring, and proactive incident tooling.",
    bullets: [
      "IaC policy management",
      "Resilience testing",
      "On-call playbooks",
      "24/7 observability",
    ],
    price: "$1,100",
    cadence: "/month",
    badge: "New",
  },
  {
    id: "app-modernization",
    title: "App Modernization",
    description:
      "Replatform legacy apps to cloud-native stacks with performance, security, and UX upgrades.",
    bullets: [
      "Architecture blueprint",
      "Phased migration plan",
      "Performance benchmarking",
      "Change management toolkit",
    ],
    price: "$1,300",
    cadence: "/month",
    badge: "New",
  },
];

const allSiteServices: SiteService[] = [
  ...marketingServices,
  ...softwareServices,
];

export const defaultSiteService: SiteService = marketingServices[0];

export function getSiteService(id: string): SiteService | undefined {
  return allSiteServices.find((service) => service.id === id);
}
