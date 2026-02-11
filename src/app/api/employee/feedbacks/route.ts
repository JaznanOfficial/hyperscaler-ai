import { feedbackService } from "@/backend/services/feedback.service";
import { ApiResponse } from "@/backend/utils/api-response";
import { AuthGuard } from "@/backend/utils/auth-guard";

export async function GET(request: Request) {
  try {
    const session = await AuthGuard.requireEmployee();

    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");

    const result = await feedbackService.getEmployeeFeedbacks(
      session.user.id,
      page,
      limit
    );

    return ApiResponse.success(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return ApiResponse.unauthorized();
      }
      if (error.message === "Forbidden") {
        return ApiResponse.forbidden();
      }
    }
    console.error("Error fetching feedbacks:", error);
    return ApiResponse.error("Failed to fetch feedbacks");
  }
}
