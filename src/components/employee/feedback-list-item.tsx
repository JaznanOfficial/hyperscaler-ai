"use client";

import type { FeedbackItem } from "@/components/employee/feedback-list";
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

export function FeedbackListItem({ item }: { item: FeedbackItem }) {
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
                {item.title}
              </p>
              <p className="text-slate-500 text-sm">{item.summary}</p>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-slate-500 text-xs sm:mt-0">
              <span>Updated {item.updated}</span>
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
            <p className="text-slate-400 text-xs uppercase tracking-wide">
              Updated {item.updated}
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Close
            </AlertDialogCancel>
            <AlertDialogAction className="cursor-pointer">
              Mark as resolved
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
}
