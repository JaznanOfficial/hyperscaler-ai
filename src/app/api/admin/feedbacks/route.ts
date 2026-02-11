import { z } from "zod";
import { createFeedbackSchema } from "@/backend/schemas/feedback.schema";
import { feedbackService } from "@/backend/services/feedback.service";
import { ApiResponse } from "@/backend/utils/api-response";
import { AuthGuard } from "@/backend/utils/auth-guard";

export async function POST(request: Request) {
  try {
    await AuthGuard.requireAdmin();

    const body = await request.json();
    const validatedData = createFeedbackSchema.parse(body);

    const feedback = await feedbackService.createFeedback(validatedData);

    return ApiResponse.success({ feedback }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ApiResponse.validationError(error);
    }
    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return ApiResponse.unauthorized();
      }
      if (error.message === "Forbidden") {
        return ApiResponse.forbidden();
      }
    }
    console.error("Error creating feedback:", error);
    return ApiResponse.error("Failed to create feedback");
  }
}

export async function GET(request: Request) {
  try {
    await AuthGuard.requireAdmin();

    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");

    const result = await feedbackService.getAllFeedbacks(page, limit);

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
