import { Skeleton } from "@/components/ui/skeleton";

export function StatisticsHeaderSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-10 w-64 rounded-2xl" />
      <Skeleton className="h-5 w-80 max-w-full" />
    </div>
  );
}
