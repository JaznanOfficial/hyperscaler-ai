"use client";

import { useEffect, useState } from "react";
import { SubscriptionList } from "@/components/admin/subscription-list";

interface Project {
  id: string;
  clientId: string;
  status: string;
  services: any[];
  createdAt: string;
}

export default function SuperAdminSubscriptionsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="p-4 text-center text-slate-600">Loading projects...</p>
        ) : (
          <SubscriptionList projects={projects} />
        )}
      </div>
    </section>
  );
}
