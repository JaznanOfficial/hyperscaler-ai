"use client";

import type { AdminFeedbackItem } from "@/components/admin/feedback-list";
import { Badge } from "@/components/ui/badge";
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
  const timeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <li className="relative">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className="flex w-full cursor-pointer flex-col gap-3 px-4 py-4 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            type="button"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-lg text-slate-900">
                  {item.heading}
                </p>
                {item.read ? (
                  <Badge className="bg-green-100 text-green-700">Read</Badge>
                ) : (
                  <Badge className="bg-amber-100 text-amber-700">Unread</Badge>
                )}
              </div>
              <p className="text-slate-500 text-sm line-clamp-2">{item.details}</p>
              <p className="text-slate-400 text-xs uppercase tracking-wide">
                Employee ID: {item.employeeId} • {timeAgo(item.createdAt)}
              </p>
            </div>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent size="default">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-left font-semibold text-lg text-slate-900">
              {item.heading}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="space-y-3 text-slate-600 text-sm">
            <p>{item.details}</p>
            <div className="rounded-lg bg-slate-50 px-3 py-2 text-slate-500 text-xs">
              <div className="flex flex-col gap-1">
                <div>
                  <span className="font-semibold text-slate-600">Employee ID:&nbsp;</span>
                  {item.employeeId}
                </div>
                <div>
                  <span className="font-semibold text-slate-600">Project ID:&nbsp;</span>
                  {item.projectId}
                </div>
                <div>
                  <span className="font-semibold text-slate-600">Status:&nbsp;</span>
                  {item.read ? "Read" : "Unread"}
                </div>
                <div>
                  <span className="font-semibold text-slate-600">Created:&nbsp;</span>
                  {new Date(item.createdAt).toLocaleString()}
                </div>
              </div>
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
