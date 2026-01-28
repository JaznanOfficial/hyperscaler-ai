import { ServiceDetailsForm } from "@/components/admin/service-details-form"

export default function CreateServicePage() {
  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-y-auto">
      <ServiceDetailsForm initialServiceName="" initialSections={[]} />
    </section>
  )
}
