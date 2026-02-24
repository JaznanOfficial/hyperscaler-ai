import { tool } from "ai";
import z from "zod";

import { feedbackService } from "@/backend/services/feedback.service";
import { AuthGuard } from "@/backend/utils/auth-guard";

export const SuperAdminFeedbackTool = tool({
  description:
    "Get feedbacks across all employees with optional filtering by employee, unread status, or recency.",
  inputSchema: z.object({
    employeeId: z
      .string()
      .min(1)
      .describe(
        "Show results for a specific employee ID if provided. or show all employees if not provided."
      )
      .optional(),
    onlyUnread: z
      .boolean()
      .describe(
        "If true, show only unread feedbacks. If false, include read ones as well."
      )
      .optional(),
    daysBack: z
      .number()
      .int()
      .positive()
      .describe(
        "Show feedback from the last N days (e.g., 7 for last week, 30 for last month). if not provided show all feedbacks."
      )
      .optional(),
  }),
  execute: async ({ employeeId, onlyUnread, daysBack }) => {
    await AuthGuard.requireAdmin();

    const MAX_DAYS_BACK = 365;
    const filters: {
      employeeId?: string;
      onlyUnread?: boolean;
      daysBack?: number;
    } = {};

    const normalizedEmployeeId = employeeId?.trim();

    if (
      normalizedEmployeeId &&
      normalizedEmployeeId.toLowerCase() !== "all" &&
      normalizedEmployeeId.toLowerCase() !== "all employees"
    ) {
      filters.employeeId = normalizedEmployeeId;
    }

    if (onlyUnread !== undefined) {
      filters.onlyUnread = onlyUnread;
    }

    let sanitizedDaysBack: number | null = null;

    if (
      daysBack !== undefined &&
      typeof daysBack === "number" &&
      Number.isInteger(daysBack) &&
      daysBack > 0
    ) {
      sanitizedDaysBack = Math.min(daysBack, MAX_DAYS_BACK);
      filters.daysBack = sanitizedDaysBack;
    }

    const filtersApplied = {
      employeeId:
        normalizedEmployeeId &&
        normalizedEmployeeId.toLowerCase() !== "all" &&
        normalizedEmployeeId.toLowerCase() !== "all employees"
          ? normalizedEmployeeId
          : "ALL",
      onlyUnread: onlyUnread ?? false,
      daysBack: sanitizedDaysBack,
    };

    const result = await feedbackService.getFeedbacksForAdmin(
      Object.keys(filters).length > 0 ? filters : undefined
    );

    return {
      success: true,
      data: result.feedbacks,
      total: result.total,
      unreadCount: result.unreadCount,
      filtersApplied,
    };
  },
});
