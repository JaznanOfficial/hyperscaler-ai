"use client";

import { useEffect, useState } from "react";
import { ClientList } from "@/components/admin/client-list";

interface Client {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function SuperAdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/clients")
      .then((res) => res.json())
      .then((data) => {
        setClients(data.clients || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="p-4 text-center text-slate-600">Loading clients...</p>
        ) : (
          <ClientList clients={clients} />
        )}
      </div>
    </section>
  );
}
