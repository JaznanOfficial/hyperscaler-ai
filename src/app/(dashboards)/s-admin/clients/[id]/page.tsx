import { notFound } from "next/navigation"

import { ClientDetailView } from "@/components/admin/client-detail-view"
import { getClientDetail } from "@/data/clients"

export default async function SuperAdminClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const client = getClientDetail(id)

  if (!client) {
    return notFound()
  }

  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-y-auto pb-6">
      <ClientDetailView client={client} />
    </section>
  )
}
