import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const legendKeys = Array.from({ length: 3 }, (_, index) => `legend-${index}`);

export function ConversionRateTrendsCardSkeleton() {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-64 max-w-full" />
        </div>

        <div className="rounded-3xl border border-slate-200 border-dashed p-4">
          <Skeleton className="h-64 w-full" />
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {legendKeys.map((key) => (
            <div className="flex items-center gap-3" key={key}>
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
