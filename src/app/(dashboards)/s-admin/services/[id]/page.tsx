import { ServiceDetailsForm } from "@/components/admin/service-details-form"
import { getServiceTemplate } from "@/data/service-templates"

export default function SuperAdminServiceDetailsPage({ params }: { params: { id: string } }) {
  const template = getServiceTemplate(params.id)

  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-y-auto">
      <ServiceDetailsForm initialServiceName={template.name} initialSections={template.sections} />
    </section>
  )
}
