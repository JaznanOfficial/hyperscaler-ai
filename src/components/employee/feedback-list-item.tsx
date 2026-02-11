"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
import { Badge } from "@/components/ui/badge";

async function markAsRead(id: string) {
  const response = await fetch(`/api/employee/feedbacks/${id}`, {
    method: "PATCH",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to mark as read");
  }

  return response.json();
}

export function FeedbackListItem({ item }: { item: FeedbackItem }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => markAsRead(item.id),
    onSuccess: () => {
      toast.success("Feedback marked as read");
      queryClient.invalidateQueries({ queryKey: ["employee-feedbacks"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const timeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60_000);
    const diffHours = Math.floor(diffMs / 3_600_000);
    const diffDays = Math.floor(diffMs / 86_400_000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <li className="relative">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className="flex w-full cursor-pointer flex-col gap-1 px-4 py-4 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 sm:flex-row sm:items-center sm:justify-between"
            type="button"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-lg text-slate-900">
                  {item.heading}
                </p>
                {!item.read && (
                  <Badge className="bg-blue-100 text-blue-700">New</Badge>
                )}
              </div>
              <p className="mt-1 line-clamp-2 text-slate-500 text-sm">
                {item.details}
              </p>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-slate-500 text-xs sm:mt-0">
              <span>Updated {timeAgo(item.updatedAt)}</span>
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
            <p className="text-slate-400 text-xs uppercase tracking-wide">
              Updated {timeAgo(item.updatedAt)}
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Close
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              disabled={mutation.isPending || item.read}
              onClick={() => mutation.mutate()}
            >
              {mutation.isPending
                ? "Marking..."
                : item.read
                  ? "Already Read"
                  : "Mark as Read"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
}
