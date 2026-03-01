"use client";

import { useEffect, useState } from "react";
import {
  type EmployeeClientItem,
  ClientListItem,
} from "@/components/employee/client-list-item";

export default function EmployeeClientsPage() {
  const [clients, setClients] = useState<EmployeeClientItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await fetch("/api/employee/clients");
        if (!response.ok) {
          throw new Error("Failed to fetch clients");
        }
        const data = await response.json();
        setClients(data.clients);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  if (loading) {
    return (
      <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-slate-500">Loading clients...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  if (clients.length === 0) {
    return (
      <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-slate-500">No clients assigned yet</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {clients.map((client) => (
            <ClientListItem client={client} key={client.id} />
          ))}
        </ul>
      </div>
    </section>
  );
}
