import { Skeleton } from "@/components/ui/skeleton";

const PRICING_CARD_PLACEHOLDERS = ["starter", "growth", "pro"] as const;

export function SubscriptionsPageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-64 rounded-full" />
        <Skeleton className="h-4 w-80 rounded-full" />
      </div>

      {/* <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <Skeleton className="h-6 w-48 rounded-full" />
        <Skeleton className="h-4 w-72 rounded-full" />
      </div> */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {PRICING_CARD_PLACEHOLDERS.map((id) => (
          <div
            className="relative flex flex-col gap-6 rounded-xl border border-slate-200 bg-white px-6 py-7"
            key={id}
          >
            <div className="flex items-start gap-3">
              <Skeleton className="h-11 w-11 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-28 rounded-full" />
                <Skeleton className="h-4 w-36 rounded-full" />
              </div>
            </div>

            <div className="space-y-1">
              <Skeleton className="h-7 w-32 rounded-full" />
              <Skeleton className="h-3 w-40 rounded-full" />
            </div>

            <div className="space-y-3">
              {[1, 2, 3, 4].map((bullet) => (
                <div
                  className="flex items-center gap-3"
                  key={`${id}-feature-${bullet}`}
                >
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 flex-1 rounded-full" />
                </div>
              ))}
            </div>

            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
