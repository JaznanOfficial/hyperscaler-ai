"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { ClientDetailView } from "@/components/admin/client-detail-view";

interface ClientDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function SuperAdminClientDetailPage({
  params,
}: ClientDetailPageProps) {
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [clientId, setClientId] = useState<string>("");

  useEffect(() => {
    params.then(({ id }) => {
      setClientId(id);
      fetch(`/api/admin/clients/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Not found");
          return res.json();
        })
        .then((data) => {
          setClient(data.client);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    });
  }, [params]);

  if (loading) {
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
      <ClientDetailView client={client} />
    </section>
  );
}
