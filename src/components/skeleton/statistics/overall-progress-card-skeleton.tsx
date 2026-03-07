import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const statusCardKeys = Array.from(
  { length: 4 },
  (_, index) => `status-${index}`
);

export function OverallProgressCardSkeleton() {
  return (
    <Card className="rounded-3xl border border-slate-100 bg-white">
      <CardContent className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <div className="flex flex-col items-center justify-center lg:w-1/2">
          <div className="flex items-center justify-center py-6">
            <Skeleton className="h-64 w-64 rounded-full" />
          </div>
          <div className="mx-auto flex w-full max-w-xs items-center justify-between">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-2 gap-4">
            {statusCardKeys.map((key) => (
              <div
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                key={key}
              >
                <Skeleton className="mb-3 h-3 w-24" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="mt-2 h-3 w-12" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
