import type { SubscriptionItem } from "@/components/admin/subscription-list";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

const statusStyles: Record<SubscriptionItem["status"], string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Paused: "bg-amber-100 text-amber-700",
  Trial: "bg-slate-100 text-slate-600",
};

export function SubscriptionListItem({ item }: { item: SubscriptionItem }) {
  return (
    <li className="relative">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className="flex w-full cursor-pointer flex-col gap-1 px-4 py-4 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 sm:flex-row sm:items-center sm:justify-between"
            type="button"
          >
            <div>
              <p className="font-semibold text-lg text-slate-900">
                {item.subscriber}
              </p>
              <p className="text-slate-500 text-sm">{item.service}</p>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 sm:mt-0">
              <Badge
                className={`rounded-full px-3 py-1 font-semibold text-[11px] ${statusStyles[item.status]}`}
                variant="secondary"
              >
                {item.status}
              </Badge>
              <span className="font-semibold text-slate-900 text-xs">
                {item.amount}
              </span>
              <span className="text-slate-500 text-xs">{item.renewal}</span>
            </div>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent size="default">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-left font-semibold text-lg text-slate-900">
              {item.subscriber}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="space-y-2 text-slate-600 text-sm">
            <p className="font-medium text-slate-900">{item.service}</p>
            <p>
              Subscription ID {item.id} · {item.amount}
            </p>
            <p>Status: {item.status}</p>
            <p>{item.notes}</p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Close
            </AlertDialogCancel>
            <AlertDialogAction className="cursor-pointer">
              Mark as reviewed
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
}
