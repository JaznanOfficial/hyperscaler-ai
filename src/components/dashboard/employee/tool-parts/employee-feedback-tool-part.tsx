import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { ToolMessagePart } from "./types";

export const renderEmployeeFeedbackToolPart = (
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
          heading: string;
          details: string;
          read: boolean;
          createdAt: string;
        }>;
        unreadCount?: number;
        pagination?: {
          page: number;
          total: number;
          totalPages: number;
        };
      };

      return (
        <div
          className={cn(bubbleClassName, "bg-green-50 text-green-900")}
          key={callId}
        >
          <div className="space-y-3">
            {output?.unreadCount !== undefined && (
              <p className="font-semibold">Unread: {output.unreadCount}</p>
            )}
            {output?.data && output.data.length > 0 ? (
              <div className="space-y-2 overflow-x-auto">
                {output.data.map((feedback) => (
                  <div
                    className="rounded border border-green-200 bg-white p-2 text-slate-900 text-sm"
                    key={feedback.id}
                  >
                    <p className="font-medium">{feedback.heading}</p>
                    <p className="text-slate-600 text-xs">{feedback.details}</p>
                    <p className="mt-1 text-slate-500 text-xs">
                      {feedback.read ? "✓ Read" : "Unread"} •{" "}
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No feedbacks found.</p>
            )}
            {output?.pagination && (
              <p className="text-xs">
                Page {output.pagination.page} of {output.pagination.totalPages}
              </p>
            )}
          </div>
        </div>
      );
    }
    case "output-error":
      return (
        <div
          className={cn(bubbleClassName, "bg-red-50 text-red-900")}
          key={callId}
        >
          Error: {toolPart.errorText ?? "Failed to fetch feedbacks"}
        </div>
      );
    default:
      return null;
  }
};
