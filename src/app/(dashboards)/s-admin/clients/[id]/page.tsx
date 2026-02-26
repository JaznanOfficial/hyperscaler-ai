"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { ClientDetailView } from "@/components/admin/client-detail-view";
import { useAdminClient } from "@/hooks/use-admin-client";

interface ClientDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function SuperAdminClientDetailPage({
  params,
}: ClientDetailPageProps) {
  const { id: clientId } = use(params);
  const { data: client, isLoading } = useAdminClient(clientId);

  if (isLoading) {
    return (
      <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-y-auto pb-6">
        <p className="p-6 text-center text-slate-600">Loading...</p>
      </section>
    );
  }

  if (!client) {
    return notFound();
  }

  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-y-auto pb-6">
      <ClientDetailView client={client} clientId={clientId} />
    </section>
  );
}
