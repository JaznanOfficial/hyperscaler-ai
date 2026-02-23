import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { ToolMessagePart } from "./types";

export const renderSuperAdminFeedbackToolPart = (
  toolPart: ToolMessagePart,
  bubbleClassName: string
): ReactNode => {
  const callId = toolPart.toolCallId ?? "unknown";

  switch (toolPart.state) {
    case "output-available": {
      const output = toolPart.output as {
        success?: boolean;
        data?: Array<{
          id: string;
          employeeId: string;
          heading: string;
          details: string;
          read: boolean;
          createdAt: string;
        }>;
        total?: number;
        unreadCount?: number;
        filtersApplied?: {
          employeeId?: string;
          onlyUnread?: boolean;
          daysBack?: number | null;
        };
        error?: string;
      };

      if (!output.success) {
        return (
          <div
            className={cn(bubbleClassName, "bg-slate-50 text-slate-900")}
            key={callId}
          >
            <div className="space-y-3">
              <div className="text-slate-600 text-xs">
                Error: {output.error}
              </div>
            </div>
          </div>
        );
      }

      return (
        <div
          className={cn(bubbleClassName, "bg-slate-50 text-slate-900")}
          key={callId}
        >
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 font-semibold text-slate-600 text-xs">
              <span>Total: {output?.total ?? 0}</span>
              <span>Unread: {output?.unreadCount ?? 0}</span>
              {output?.filtersApplied && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 font-medium text-[11px]">
                  Filters:
                  {output.filtersApplied.employeeId === "ALL" ||
                  !output.filtersApplied.employeeId
                    ? "All employees"
                    : `Employee ${output.filtersApplied.employeeId.slice(0, 6)}`}
                  {output.filtersApplied.onlyUnread
                    ? " • Unread only"
                    : " • All statuses"}
                  {output.filtersApplied.daysBack
                    ? ` • Last ${output.filtersApplied.daysBack}d`
                    : null}
                </span>
              )}
            </div>

            {output?.data && output.data.length > 0 ? (
              <div className="space-y-2">
                {output.data
                  .sort((a, b) => {
                    if (a.read && !b.read) return 1;
                    if (!a.read && b.read) return -1;
                    return a.createdAt.localeCompare(b.createdAt);
                  })
                  .map((feedback) => (
                    <div
                      className="rounded border border-slate-200 bg-white p-3 text-slate-900 text-sm"
                      key={feedback.id}
                    >
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{feedback.heading}</p>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 font-semibold text-[11px]",
                            feedback.read
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          )}
                        >
                          {feedback.read ? "Read" : "Unread"}
                        </span>
                      </div>
                      <p className="text-slate-600 text-xs">
                        {feedback.details}
                      </p>
                      <p className="mt-2 text-[11px] text-slate-500">
                        Employee: {feedback.employeeId.slice(0, 8)} •
                      </p>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-slate-600 text-xs">No data available</div>
            )}
          </div>
        </div>
      );
    }
    default:
      return (
        <div
          className={cn(bubbleClassName, "bg-slate-50 text-slate-900")}
          key={callId}
        >
          <div className="space-y-3">
            <div className="text-slate-600 text-xs">Unknown state</div>
          </div>
        </div>
      );
  }
};
