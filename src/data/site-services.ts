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
      "Managed campaigns across Google, Meta, TikTok, X & LinkedIn with full transparency on spend, performance, and ROI.",
    bullets: [
      "Track impressions, Reach, Clicks, CTR",
      "AI-optimized spend & targeting",
      "Higher CTR, lower CPC",
      "Conversion-focused campaign insights",
    ],
    price: "$500",
    cadence: "/month",
    badge: "Popular",
  },
  {
    id: "cold-email",
    title: "Cold Email Campaign",
    description:
      "ICP-segmented lead generation and automated email sequences from warming prospects to closing deals.",
    bullets: [
      "Lead generation via Apollo, Clay & major ICP tools",
      "Automated sequences from warm-up to close",
      "Track open rates, clicks & conversions",
      "Personalized messaging at scale",
    ],
    price: "$500",
    cadence: "/month",
    badge: "New",
  },
  {
    id: "social-media",
    title: "Social Media Automation",
    description:
      "Grow an audience that matches your ICP through high-value content, consistent posting and brand storytelling.",
    bullets: [
      "ICP-targeted follower growth strategy",
      "High-value graphics designed to attract your ICP",
      "Social calendar, scheduling & performance tracking",
      "Engaging content for brand storytelling",
    ],
    price: "$500",
    cadence: "/month",
    badge: "Popular",
  },
  // {
  //   id: "brand-content",
  //   title: "Branding & Content Creation",
  //   description:
  //     "Create engaging content that informs and builds presence. Drive demand and build trust across channels.",
  //   bullets: [
  //     "Research-driven storytelling",
  //     "Multi-channel assets",
  //     "Dedicated creative team",
  //     "Consistent brand experience",
  //   ],
  //   price: "$500",
  //   cadence: "/month",
  //   badge: "New",
  // },
  {
    id: "linkedin-outreach",
    title: "Cold LinkedIn Outreach",
    description:
      "Lead generation and personalized connection sequences to fill your pipeline with the right prospects.",
    bullets: [
      "Optimize your LinkedIn profile for max impact",
      "Lead generation with Sales Navigator filters",
      "Track connection requests & acceptance rates",
      "Tailored connection messages per prospect",
    ],
    price: "$500",
    cadence: "/month",
    badge: "Popular",
  },
  {
    id: "cold-calling",
    title: "Cold Calling",
    description:
      "Drive consistent meetings through structured cold calling with clear insights into conversations, outcomes and conversions.",
    bullets: [
      "Track calls, pick-up rate & talk time",
      "Measure call quality & schedule follow-ups",
      "Monitor call-to-meeting conversion rate",
      "Auto follow-ups pushed directly to your CRM",
    ],
    price: "$500",
    cadence: "/month",
    badge: "Popular",
  },
];

export const softwareServices: SiteService[] = [
  {
    id: "saas-product",
    title: "SaaS Product Development",
    description:
      "Build scalable SaaS products with clear milestones, predictable delivery, and full visibility into progress.",
    bullets: [
      "Feature-based development tracking",
      "Sprint & milestone progress visibility",
      "Quality and performance monitoring",
      "Transparent delivery timelines",
    ],
    price: "$1,000",
    cadence: "/month",
    badge: "Popular",
  },
  {
    id: "ai-product",
    title: "AI-Powered Product Development",
    description:
      "Turn AI ideas into production-ready products with structured development and measurable progress.",
    bullets: [
      "Model & system development tracking",
      "Performance and accuracy monitoring",
      "Secure and compliant deployment",
      "Clear AI milestone reporting",
    ],
    price: "$1,200",
    cadence: "/month",
  },
  {
    id: "mobile-apps",
    title: "Android & iOS Mobile Apps",
    description:
      "Launch high-quality mobile apps with smooth performance and consistent updates across platforms.",
    bullets: [
      "Cross-platform development tracking",
      "UI/UX quality assurance",
      "Feature and release progress visibility",
      "Performance and stability monitoring",
    ],
    price: "$800",
    cadence: "/month",
  },
  {
    id: "workflow-automation",
    title: "Workflow & Automation",
    description:
      "Eliminate manual work with automated workflows designed for efficiency, accuracy, and scale.",
    bullets: [
      "Workflow design and implementation tracking",
      "Automation performance monitoring",
      "Error and stability insights",
      "Integration status visibility",
    ],
    price: "$900",
    cadence: "/month",
  },
  {
    id: "enterprise-tools",
    title: "Enterprise Tools",
    description:
      "Develop robust enterprise systems built for scale, security, and long-term reliability.",
    bullets: [
      "Module-wise development tracking",
      "Integration and system health visibility",
      "Performance and scalability monitoring",
      "Security and compliance readiness",
    ],
    price: "$1,100",
    cadence: "/month",
    badge: "New",
  },
  {
    id: "startup-product",
    title: "Startup Product & IP",
    description:
      "Bring your product idea to life with a structured roadmap from MVP to market-ready IP.",
    bullets: [
      "MVP and roadmap progress tracking",
      "Feature delivery visibility",
      "Product quality monitoring",
      "IP-focused development milestones",
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
