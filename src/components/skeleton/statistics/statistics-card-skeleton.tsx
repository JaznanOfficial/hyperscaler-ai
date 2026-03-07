import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const metricPlaceholderKeys = Array.from(
  { length: 6 },
  (_, index) => `metric-${index}`
);
const insightPlaceholderKeys = Array.from(
  { length: 4 },
  (_, index) => `insight-${index}`
);

export function StatisticsCardSkeleton() {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardContent className="space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-56 max-w-full" />
          </div>
          <Skeleton className="h-8 w-28 rounded-full" />
        </div>

        <div className="grid gap-4 border-slate-200 border-b pb-6 md:grid-cols-3 lg:grid-cols-6">
          {metricPlaceholderKeys.map((key) => (
            <div className="space-y-2" key={key}>
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-16" />
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-52 max-w-full" />
            </div>
            <div className="space-y-3 rounded-2xl border border-slate-200 border-dashed p-4">
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-3 w-48 max-w-full" />
            </div>
            <div className="space-y-3 rounded-2xl border border-slate-200 border-dashed p-4">
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <div className="grid gap-4 md:grid-cols-2">
            {insightPlaceholderKeys.map((key) => (
              <div
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                key={key}
              >
                <Skeleton className="h-4 w-36" />
                <Skeleton className="mt-2 h-3 w-48" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
