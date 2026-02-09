import { ActiveServicesList } from "@/components/dashboard/client/active-services-list";
import { ExploreServicesGrid } from "@/components/dashboard/client/explore-services-grid";
import { RecommendedServices } from "@/components/dashboard/client/recommended-services";

export default function ClientServicesPage() {
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
                Services
              </span>
            </h1>
            <p className="text-base text-slate-600 leading-3">
              Discover, manage, and expand your services — all in one place.
            </p>
          </div>

          <RecommendedServices />
          <ActiveServicesList />
          <ExploreServicesGrid />
        </div>
      </div>
    </section>
  );
}
