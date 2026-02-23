"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ClientSubscriptionList } from "@/components/dashboard/client/subscription-list";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Project {
  id: string;
  status: string;
  services: any[];
  createdAt: string;
}

interface Package {
  id: string;
  packageName: string;
  amount: number;
  status: string;
  createdAt: string;
}

export default function ClientSubscriptionsPage() {
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

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
    Promise.all([
      fetch("/api/client/projects").then((res) => res.json()),
      fetch("/api/client/packages").then((res) => res.json()),
    ])
      .then(([projectsData, packagesData]) => {
        setProjects(projectsData.projects || []);
        setPackages(packagesData.packages || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const allCount = projects.length;
  const approvedCount = projects.filter((p) => p.status === "APPROVED").length;
  const pendingCount = projects.filter((p) => p.status === "PENDING").length;
  const cancelledCount = projects.filter(
    (p) => p.status === "CANCELLED"
  ).length;

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
          <Tabs className="mt-8 w-full" defaultValue="all">
            <TabsList className="cursor-pointer rounded-full border border-slate-300 bg-white text-base lg:h-12! lg:px-2 lg:py-2">
              <TabsTrigger
                className="cursor-pointer rounded-full data-[state=active]:bg-[#9E32DD] data-[state=active]:text-white lg:h-9 lg:px-5 lg:py-2 lg:text-lg"
                value="all"
              >
                <span>All</span>
                <span className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-fuchsia-100 font-semibold text-fuchsia-700 text-sm lg:h-6 lg:w-6">
                  {allCount}
                </span>
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer rounded-full data-[state=active]:bg-[#9E32DD] data-[state=active]:text-white lg:h-9 lg:px-5 lg:py-2 lg:text-lg"
                value="approved"
              >
                <span>Approved</span>
                <span className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-fuchsia-100 font-semibold text-fuchsia-700 text-sm lg:h-6 lg:w-6">
                  {approvedCount}
                </span>
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer rounded-full data-[state=active]:bg-[#9E32DD] data-[state=active]:text-white lg:h-9 lg:px-5 lg:py-2 lg:text-lg"
                value="pending"
              >
                <span>Pending</span>
                <span className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-fuchsia-100 font-semibold text-fuchsia-700 text-sm lg:h-6 lg:w-6">
                  {pendingCount}
                </span>
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer rounded-full data-[state=active]:bg-[#9E32DD] data-[state=active]:text-white lg:h-9 lg:px-5 lg:py-2 lg:text-lg"
                value="cancelled"
              >
                <span>Cancelled</span>
                <span className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-fuchsia-100 font-semibold text-fuchsia-700 text-sm lg:h-6 lg:w-6">
                  {cancelledCount}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-slate-400 text-xs uppercase tracking-[0.3em]">
                Packages
              </p>
              <p className="font-semibold text-base text-slate-900">
                Your purchased packages
              </p>
            </div>
            {packages.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {packages.map((pkg) => (
                  <Card className="p-6" key={pkg.id}>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900">
                          {pkg.packageName}
                        </h3>
                        <p className="text-slate-500 text-sm">
                          Purchased on{" "}
                          {new Date(pkg.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-bold text-2xl text-slate-900">
                          ${(pkg.amount / 100).toFixed(2)}
                        </span>
                        <span className="text-slate-500 text-sm">/month</span>
                      </div>
                      <div>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 font-semibold text-xs ${
                            pkg.status === "PAID"
                              ? "bg-emerald-100 text-emerald-700"
                              : pkg.status === "UNPAID"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {pkg.status}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-slate-600">
                  No packages purchased yet. Visit the Services page to upgrade!
                </p>
              </Card>
            )}
          </div>
          {loading ? (
            <p className="text-center text-slate-600">Loading...</p>
          ) : (
            <ClientSubscriptionList projects={projects} />
          )}
        </div>
      </div>
    </section>
  );
}
