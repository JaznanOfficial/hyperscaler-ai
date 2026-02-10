import { feedbackService } from "@/backend/services/feedback.service";
import { feedbackRepository } from "@/backend/repositories/feedback.repository";
import { AuthGuard } from "@/backend/utils/auth-guard";
import { ApiResponse } from "@/backend/utils/api-response";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await AuthGuard.requireEmployee();

    const { id } = await params;

    const feedback = await feedbackRepository.findById(id);

    if (!feedback) {
      return ApiResponse.error("Feedback not found", 404);
    }

    if (feedback.employeeId !== session.user.id) {
      return ApiResponse.forbidden();
    }

    const updatedFeedback = await feedbackService.markAsRead(id);

    return ApiResponse.success({ feedback: updatedFeedback });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return ApiResponse.unauthorized();
      }
      if (error.message === "Forbidden") {
        return ApiResponse.forbidden();
      }
    }
    console.error("Error marking feedback as read:", error);
    return ApiResponse.error("Failed to mark feedback as read");
  }
}
