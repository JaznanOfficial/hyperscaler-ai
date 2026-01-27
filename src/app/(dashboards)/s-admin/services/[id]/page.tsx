import { ServiceDetailsForm, type ServiceSection } from "@/components/admin/service-details-form"

type ServiceTemplate = {
  name: string
  sections: ServiceSection[]
}

const serviceTemplates: Record<string, ServiceTemplate> = {
  "SRV-401": {
    name: "Automation Intelligence Suite",
    sections: [
      { id: "section-overview", name: "Automation brief", type: "textarea" as const },
      { id: "section-sla", name: "Target SLA", type: "input" as const },
      { id: "section-flag", name: "Requires security review", type: "boolean" as const },
    ],
  },
  "SRV-389": {
    name: "Telemetry & Risk Mesh",
    sections: [
      { id: "section-outcomes", name: "Desired outcomes", type: "textarea" as const },
      { id: "section-regions", name: "Active regions", type: "input" as const },
    ],
  },
  "SRV-376": {
    name: "Revenue Autopilot",
    sections: [
      { id: "section-playbook", name: "Playbook name", type: "input" as const },
      { id: "section-budget", name: "Budget ceiling", type: "input" as const },
      { id: "section-status", name: "Need executive sponsor?", type: "boolean" as const },
    ],
  },
}

const defaultTemplate: ServiceTemplate = {
  name: "Untitled service",
  sections: [{ id: "section-default", name: "Section name", type: "input" }],
}

export default function SuperAdminServiceDetailsPage({ params }: { params: { id: string } }) {
  const template = serviceTemplates[params.id] ?? defaultTemplate

  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-y-auto">
      <ServiceDetailsForm initialServiceName={template.name} initialSections={template.sections} />
    </section>
  )
}
