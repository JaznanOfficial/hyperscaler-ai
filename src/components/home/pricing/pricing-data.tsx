import { Building2, Rocket, Target, Zap } from "lucide-react";

import type { PricingCard } from "./types";

export const scalePricingData: PricingCard[] = [
  {
    icon: <Rocket className="size-5 md:size-6" />,
    name: "Starter",
    description:
      "One channel, full automation. Perfect for testing the waters.",
    price: {
      amount: "$1,000",
      cadence: "/month",
      note: "Billed monthly · Cancel anytime",
    },
    comparisonLabel: "What's included",
    savingsHighlight: {
      title: "Skip multiple hires",
      subtitle: "Save $11,000+/month",
    },
    cta: {
      type: "link",
      href: "#",
      label: "Get Started",
      variant: "outline",
    },
    features: [
      "Pick only one service",
      "AI agent + human experts managing your campaign 24/7",
      "Dashboard with real-time KPIs",
      "Weekly performance reports",
      "Email support",
    ],
  },
  {
    icon: <Zap className="size-5 md:size-6" />,
    name: "Growth",
    description: "Multi-channel acquisition with human oversight baked in.",
    price: {
      amount: "$2,500",
      cadence: "/month",
      note: "Billed monthly · Cancel anytime",
    },
    comparisonLabel: "Everything in Starter, plus",
    highlight: {
      // label: "Most Popular",
    },
    savingsHighlight: {
      title: "Combine AI + experts",
      subtitle: "Save $19,500+/month",
    },
    cta: {
      type: "link",
      href: "#",
      label: "Get Started",
      variant: "gradient",
    },
    features: [
      "Pick up to 3 services",
      "Dedicated human growth strategist",
      "A/B testing & creative optimization",
      "Bi-weekly strategy calls",
      "Priority support",
    ],
  },
  {
    icon: <Target className="size-5 md:size-6" />,
    name: "Pro",
    description: "Full-stack growth engine for serious scale.",
    price: {
      amount: "$5,000",
      cadence: "/month",
      note: "Billed monthly · Cancel anytime",
    },
    comparisonLabel: "Everything in Growth, plus",
    savingsHighlight: {
      title: "Eliminate busywork",
      subtitle: "Save $25,500+/month",
    },
    cta: {
      type: "link",
      href: "#",
      label: "Get Started",
      variant: "outline",
    },
    features: [
      "All services included",
      "Lead qualification & pipeline handoff",
      "Custom funnel building & landing pages",
      "Weekly strategy calls",
      "Slack/dedicated channel support",
    ],
  },
  {
    icon: <Building2 className="size-4 md:size-5" />,
    name: "Enterprise",
    description: "Custom-built growth infrastructure for your org.",
    price: {
      amount: "Custom Pricing",
      cadence: "",
      note: "Tailored to your goals & budget",
    },
    comparisonLabel: "Everything in Pro, plus",
    savingsHighlight: {
      title: "Skip long hiring cycles",
      subtitle: "Save $40,000+/month",
    },
    cta: {
      type: "drawer",
      label: "Talk to Us",
      variant: "gradient",
    },
    features: [
      "Dedicated growth team assigned",
      "Custom integrations & workflows",
      "SLA guarantees & uptime commitment",
      "Executive reporting & board decks",
      "Priority onboarding within 48 hours",
    ],
  },
];

export const buildPricingData: PricingCard[] = [
  {
    icon: <Rocket className="size-5 md:size-6" />,
    name: "Starter",
    description: "Ship your MVP or iterate on an existing product fast.",
    price: {
      amount: "$2,500",
      cadence: "/month",
      note: "Billed monthly · Cancel anytime",
    },
    comparisonLabel: "What's included",
    savingsHighlight: {
      title: "Replace multiple contractors",
      subtitle: "Save $12,500+/month",
    },
    cta: {
      type: "link",
      href: "#",
      label: "Get Started",
      variant: "outline",
    },
    features: [
      "1 deidcated engineer",
      "AI-assisted development & design",
      "Dashboard with sprint progress",
      "Bi-weekly deliverables & demos",
      "Email support",
    ],
  },
  {
    icon: <Zap className="size-5 md:size-6" />,
    name: "Growth",
    description:
      "Dedicated product team shipping weekly with human + AI velocity.",
    price: {
      amount: "$5,000",
      cadence: "/month",
      note: "Billed monthly · Cancel anytime",
    },
    comparisonLabel: "Everything in Starter, plus",
    highlight: {
      label: "Most Popular",
    },
    savingsHighlight: {
      title: "Keep scope lean",
      subtitle: "Save $22,000+/month",
    },
    cta: {
      type: "link",
      href: "#",
      label: "Get Started",
      variant: "gradient",
    },
    features: [
      "Up to 2 dedicated engineer",
      "Dedicated product manager & engineer",
      "Weekly sprint deliverables",
      "UX/UI design included",
      "Priority Slack support",
    ],
  },
  {
    icon: <Target className="size-5 md:size-6" />,
    name: "Pro",
    description: "Full product org in a box. Ship like a well-funded Series B.",
    price: {
      amount: "$25,000",
      cadence: "/month",
      note: "Billed monthly · Cancel anytime",
    },
    comparisonLabel: "Everything in Growth, plus",
    savingsHighlight: {
      title: "Avoid agency retainers",
      subtitle: "Save $45,000+/month",
    },
    cta: {
      type: "link",
      href: "#",
      label: "Get Started",
      variant: "outline",
    },
    features: [
      "Up to 10 dedicated engineer",
      "Full engineering team (front + back + infra)",
      "Architecture review & technical roadmap",
      "Daily standups & real-time collaboration",
      "CTO-level strategic guidance",
    ],
  },
  {
    icon: <Building2 className="size-4 md:size-5" />,
    name: "Enterprise",
    description: "Custom product development at any scale, your way.",
    price: {
      amount: "Let's Talk ",
      cadence: "",
      note: "Tailored to your goals & budget",
    },
    comparisonLabel: "Everything in Pro, plus",
    savingsHighlight: {
      title: "Compress timelines",
      subtitle: "Save $65,000+/month",
    },
    cta: {
      type: "drawer",
      label: "Talk to Us",
      variant: "gradient",
    },
    features: [
      "Dedicated multi-discipline product team",
      "Custom tech stack & integrations",
      "SLA guarantees & compliance support",
      "Investor-ready product documentation",
      "Priority onboarding within 48 hours",
    ],
  },
];
