import { tool } from "ai";
import z from "zod";
import { feedbackRepository } from "@/backend/repositories/feedback.repository";
import { feedbackService } from "@/backend/services/feedback.service";
import { AuthGuard } from "@/backend/utils/auth-guard";

export const MarkFeedbackReadTool = tool({
  description: "Mark a specific feedback as read for the current employee.",
  inputSchema: z.object({
    feedbackId: z
      .string()
      .min(1)
      .describe("The ID of the feedback to mark as read."),
  }),
  execute: async ({ feedbackId }) => {
    const session = await AuthGuard.requireEmployee();

    const feedback = await feedbackRepository.findById(feedbackId);

    if (!feedback) {
      return {
        success: false,
        error: "Feedback not found",
      };
    }

    if (feedback.employeeId !== session.user.id) {
      return {
        success: false,
        error: "You do not have permission to mark this feedback as read",
      };
    }

    const updatedFeedback = await feedbackService.markAsRead(feedbackId);

    return {
      success: true,
      message: "Feedback marked as read",
      feedback: updatedFeedback,
    };
  },
});
