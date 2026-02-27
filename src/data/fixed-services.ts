export const FIXED_SERVICE_IDS = [
  "COLD_EMAIL",
  "PAID_ADS",
  "SOCIAL_MEDIA",
  "COLD_CALLING",
  "BRAND_CONTENT",
  "LINKEDIN_OUTREACH",
  "SOFTWARE_DEVELOPMENT",
] as const;

export type FixedServiceId = (typeof FIXED_SERVICE_IDS)[number];

export interface FixedServiceSection {
  id: string;
  label: string;
  type: "input" | "textarea" | "boolean";
}

export interface FixedServiceDefinition {
  id: FixedServiceId;
  slug: string;
  title: string;
  description: string;
  sections: FixedServiceSection[];
}

export const FIXED_SERVICES: Record<FixedServiceId, FixedServiceDefinition> = {
  COLD_EMAIL: {
    id: "COLD_EMAIL",
    slug: "cold-email-campaign",
    title: "Cold Email Campaign",
    description:
      "Outbound sequences with targeting, personalization, and deliverability tracking.",
    sections: [
      { id: "target_personas", label: "Target personas", type: "textarea" },
      { id: "daily_volume", label: "Daily send volume", type: "input" },
      { id: "requires_warmup", label: "Inbox warmup needed?", type: "boolean" },
    ],
  },
  PAID_ADS: {
    id: "PAID_ADS",
    slug: "paid-ads",
    title: "Paid Ads",
    description:
      "Full-funnel ad operations with weekly optimization loops and reporting.",
    sections: [
      { id: "channels", label: "Active channels", type: "input" },
      { id: "monthly_budget", label: "Monthly budget", type: "input" },
      { id: "kpi_focus", label: "Primary KPI", type: "input" },
    ],
  },
  SOCIAL_MEDIA: {
    id: "SOCIAL_MEDIA",
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    description:
      "Always-on campaigns covering editorial calendars, publishing, and engagement.",
    sections: [
      { id: "platforms", label: "Priority platforms", type: "input" },
      { id: "voice_notes", label: "Brand voice notes", type: "textarea" },
      { id: "needs_assets", label: "Need creative support?", type: "boolean" },
    ],
  },
  COLD_CALLING: {
    id: "COLD_CALLING",
    slug: "cold-calling",
    title: "Cold Calling",
    description:
      "Structured outbound calling programs with scripts, coaching, and conversion tracking.",
    sections: [
      { id: "script_theme", label: "Script theme", type: "input" },
      { id: "call_targets", label: "Daily call targets", type: "input" },
      {
        id: "needs_recordings",
        label: "Call recordings required?",
        type: "boolean",
      },
    ],
  },
  BRAND_CONTENT: {
    id: "BRAND_CONTENT",
    slug: "brand-content-creation",
    title: "Brand & Content Creation",
    description:
      "Long-form and short-form content production with research, storytelling, and asset delivery.",
    sections: [
      { id: "content_types", label: "Content types", type: "textarea" },
      { id: "cadence", label: "Publishing cadence", type: "input" },
      { id: "brand_assets", label: "Existing brand assets", type: "textarea" },
    ],
  },
  LINKEDIN_OUTREACH: {
    id: "LINKEDIN_OUTREACH",
    slug: "cold-linkedin-outreach",
    title: "Cold LinkedIn Outreach",
    description:
      "Persona-based connection flows and messaging for LinkedIn prospecting.",
    sections: [
      { id: "primary_persona", label: "Primary persona", type: "input" },
      { id: "connection_goal", label: "Weekly connection goal", type: "input" },
      { id: "custom_scripts", label: "Key talking points", type: "textarea" },
    ],
  },
  SOFTWARE_DEVELOPMENT: {
    id: "SOFTWARE_DEVELOPMENT",
    slug: "software-development",
    title: "Software Development",
    description:
      "Full-stack build squads for apps, integrations, and internal tooling.",
    sections: [
      { id: "scope", label: "Project scope", type: "textarea" },
      { id: "tech_stack", label: "Preferred tech stack", type: "input" },
      { id: "deadline", label: "Desired milestone", type: "input" },
    ],
  },
};

export function listFixedServices(): FixedServiceDefinition[] {
  return FIXED_SERVICE_IDS.map((id) => FIXED_SERVICES[id]);
}

export function getFixedService(id: FixedServiceId) {
  return FIXED_SERVICES[id];
}

export function getFixedServiceBySlugOrId(identifier: string) {
  const normalized = identifier.toLowerCase();
  return listFixedServices().find(
    (service) =>
      service.id === identifier || service.slug.toLowerCase() === normalized
  );
}

export function getFixedServicesByIds(ids: string[]) {
  const idSet = new Set(ids);
  return listFixedServices().filter((service) => idSet.has(service.id));
}

export function isFixedServiceId(value: string): value is FixedServiceId {
  return FIXED_SERVICE_IDS.includes(value as FixedServiceId);
}
