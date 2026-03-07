"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RecommendedPackages } from "@/components/dashboard/client/recommended-packages";
import { ClientSubscriptionList } from "@/components/dashboard/client/subscription-list";
import { SubscriptionUpgradePrompt } from "@/components/dashboard/client/subscription-upgrade-prompt";

interface Project {
  id: string;
  status: string;
  services: { serviceName?: string }[];
  createdAt: string;
}

interface ClientPackage {
  status: string;
  packageName: string;
}

export default function ClientSubscriptionsPage() {
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [planStatusReady, setPlanStatusReady] = useState(false);
  const [hasActivePlan, setHasActivePlan] = useState(false);

  useEffect(() => {
    const success = searchParams.get("success");
    const payment = searchParams.get("payment");
    const packageName = searchParams.get("package");
    const message = searchParams.get("message");

    if (success === "true") {
      toast.success(
        message || "Payment successful! Your service is pending admin approval."
      );
    } else if (payment === "success" && packageName) {
      toast.success(
        `Payment successful! Your ${packageName} package is now active.`
      );
    } else if (payment === "canceled") {
      toast.error("Payment was canceled. Please try again.");
    }
  }, [searchParams]);

  useEffect(() => {
    fetch("/api/client/projects")
      .then((res) => res.json())
      .then((projectsData) => {
        setProjects(projectsData.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/client/packages")
      .then((res) => res.json())
      .then((data) => {
        const packages: ClientPackage[] = data.packages || [];
        const activePkg = packages.find((pkg) => pkg.status === "PAID");
        setHasActivePlan(Boolean(activePkg));
        setPlanStatusReady(true);
      })
      .catch(() => setPlanStatusReady(true));
  }, []);

  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-4">
          <div className="max-w-xl">
            <h1
              className="font-semibold text-3xl leading-10"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              <span className="inline-block bg-linear-to-r from-violet-800 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                Subscriptions
              </span>
            </h1>
            <p className="text-base text-slate-600 leading-3">
              Track the status, billing, and lifecycle of your services
            </p>
          </div>
          {loading ? (
            <p className="text-center text-slate-600">Loading...</p>
          ) : (
            <>
              <ClientSubscriptionList projects={projects} />
              {planStatusReady ? (
                <div>
                  {hasActivePlan ? (
                    <SubscriptionUpgradePrompt />
                  ) : (
                    <RecommendedPackages />
                  )}
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 border-dashed bg-white/70 p-6 text-center text-slate-500 text-sm">
                  Checking your plan details...
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
