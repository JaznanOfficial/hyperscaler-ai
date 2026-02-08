"use client";

import type { AdminFeedbackItem } from "@/components/admin/feedback-list";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
export function AdminFeedbackListItem({ item }: { item: AdminFeedbackItem }) {
  return (
    <li className="relative">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className="flex w-full cursor-pointer flex-col gap-3 px-4 py-4 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            type="button"
          >
            <div className="space-y-1">
              <p className="font-semibold text-lg text-slate-900">
                {item.title}
              </p>
              <p className="text-slate-500 text-sm">{item.summary}</p>
              <p className="text-slate-400 text-xs uppercase tracking-wide">
                Sent to {item.recipients.join(", ")}
              </p>
            </div>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent size="default">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-left font-semibold text-lg text-slate-900">
              {item.title}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="space-y-3 text-slate-600 text-sm">
            <p>{item.details}</p>
            <div className="rounded-lg bg-slate-50 px-3 py-2 text-slate-500 text-xs">
              <span className="font-semibold text-slate-600">
                Sent to:&nbsp;
              </span>
              {item.recipients.join(", ")}
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
}
