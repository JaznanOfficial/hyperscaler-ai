import { Skeleton } from "@/components/ui/skeleton";
import { ConversionRateTrendsCardSkeleton } from "./conversion-rate-trends-card-skeleton";
import { OverallProgressCardSkeleton } from "./overall-progress-card-skeleton";
import { StatisticsCardSkeleton } from "./statistics-card-skeleton";
import { StatisticsHeaderSkeleton } from "./statistics-header-skeleton";

const serviceSkeletonKeys = Array.from(
  { length: 3 },
  (_, index) => `service-${index}`
);

export function StatisticsPageSkeleton() {
  return (
    <div className="space-y-6">
      <StatisticsHeaderSkeleton />

      <div className="space-y-3">
        <div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-52" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>
        </div>
        <OverallProgressCardSkeleton />
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-6 w-72" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <ConversionRateTrendsCardSkeleton />
      </div>

      <div className="space-y-6">
        {serviceSkeletonKeys.map((key) => (
          <StatisticsCardSkeleton key={key} />
        ))}
      </div>
    </div>
  );
}
