"use client";

import { ClientListItem } from "@/components/admin/client-list-item";

export type ClientItem = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

interface ClientListProps {
  clients: ClientItem[];
}

export function ClientList({ clients }: ClientListProps) {
  if (clients.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
        <p className="text-slate-600">No clients found</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {clients.map((item) => (
          <ClientListItem item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
