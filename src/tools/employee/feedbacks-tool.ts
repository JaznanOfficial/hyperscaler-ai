import { tool } from "ai";
import z from "zod";
import { feedbackService } from "@/backend/services/feedback.service";

export const EmployeeFeedbackTool = tool({
  description: "Get feedbacks for a specific employee.",
  inputSchema: z.object({
    employeeId: z
      .string()
      .min(1)
      .describe("Employee ID to fetch feedbacks for."),
    page: z
      .number()
      .int()
      .positive()
      .optional()
      .describe("Page number for pagination (default 1)."),
    limit: z
      .number()
      .int()
      .positive()
      .max(50)
      .optional()
      .describe("Items per page (default 10, max 50)."),
  }),
  execute: async ({ employeeId, page = 1, limit = 10 }) => {
    const result = await feedbackService.getEmployeeFeedbacks(
      employeeId,
      page,
      limit
    );

    return {
      success: true,
      data: result.feedbacks,
      unreadCount: result.unreadCount,
      pagination: result.pagination,
    };
  },
});
