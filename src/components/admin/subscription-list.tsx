"use client";

import { useState } from "react";
import { toast } from "sonner";
import { SubscriptionListItem } from "@/components/admin/subscription-list-item";

export type SubscriptionItem = {
  id: string;
  clientId: string;
  status: string;
  services: any[];
  createdAt: string;
};

interface SubscriptionListProps {
  projects: SubscriptionItem[];
}

export function SubscriptionList({ projects }: SubscriptionListProps) {
  const [items, setItems] = useState(projects);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );

      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
        <p className="text-slate-600">No projects found</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {items.map((item) => (
          <SubscriptionListItem
            item={item}
            key={item.id}
            onStatusChange={handleStatusChange}
          />
        ))}
      </ul>
    </div>
  );
}
