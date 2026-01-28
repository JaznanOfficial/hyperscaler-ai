import type { ServiceSection } from "@/components/admin/service-details-form"

export type ServiceTemplate = {
  id: string
  name: string
  sections: ServiceSection[]
}

export const serviceTemplates: Record<string, ServiceTemplate> = {
  "SRV-401": {
    id: "SRV-401",
    name: "Automation Intelligence Suite",
    sections: [
      { id: "section-overview", name: "Automation brief", type: "textarea" },
      { id: "section-sla", name: "Target SLA", type: "input" },
      { id: "section-flag", name: "Requires security review", type: "boolean" },
    ],
  },
  "SRV-389": {
    id: "SRV-389",
    name: "Telemetry & Risk Mesh",
    sections: [
      { id: "section-outcomes", name: "Desired outcomes", type: "textarea" },
      { id: "section-regions", name: "Active regions", type: "input" },
    ],
  },
  "SRV-376": {
    id: "SRV-376",
    name: "Revenue Autopilot",
    sections: [
      { id: "section-playbook", name: "Playbook name", type: "input" },
      { id: "section-budget", name: "Budget ceiling", type: "input" },
      { id: "section-status", name: "Need executive sponsor?", type: "boolean" },
    ],
  },
}

export const defaultServiceTemplate: ServiceTemplate = {
  id: "default",
  name: "Untitled service",
  sections: [{ id: "section-default", name: "Section name", type: "input" }],
}

export function getServiceTemplate(id: string): ServiceTemplate {
  return serviceTemplates[id] ?? defaultServiceTemplate
}
