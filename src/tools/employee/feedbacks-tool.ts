import { tool } from "ai";
import z from "zod";
import { feedbackService } from "@/backend/services/feedback.service";
import { AuthGuard } from "@/backend/utils/auth-guard";

export const EmployeeFeedbackTool = tool({
  description: "Get feedbacks for the current employee with optional filters.",
  inputSchema: z.object({
    onlyUnread: z
      .boolean()
      .optional()
      .describe(
        "If true, show only unread feedbacks. If false, show only read feedbacks."
      ),
    daysBack: z
      .number()
      .int()
      .positive()
      .optional()
      .describe(
        "Show feedbacks from the last N days. For example, 3 for last 3 days, 7 for last week, 30 for last month."
      ),
  }),
  execute: async ({ onlyUnread, daysBack }) => {
    const session = await AuthGuard.requireEmployee();

    const filters: {
      onlyUnread?: boolean;
      daysBack?: number;
    } = {};

    if (onlyUnread !== undefined && typeof onlyUnread === "boolean") {
      filters.onlyUnread = onlyUnread;
    }

    if (
      daysBack !== undefined &&
      typeof daysBack === "number" &&
      Number.isInteger(daysBack) &&
      daysBack > 0
    ) {
      filters.daysBack = daysBack;
    }

    const result = await feedbackService.getEmployeeFeedbacksWithFilters(
      session.user.id,
      Object.keys(filters).length > 0 ? filters : undefined
    );

    return {
      success: true,
      data: result.feedbacks,
      unreadCount: result.unreadCount,
      total: result.total,
    };
  },
});
