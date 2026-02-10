import { z } from "zod";
import { serviceService } from "@/backend/services/service.service";
import { AuthGuard } from "@/backend/utils/auth-guard";
import { ApiResponse } from "@/backend/utils/api-response";
import { createServiceSchema } from "@/backend/schemas/service.schema";

export async function POST(request: Request) {
  try {
    await AuthGuard.requireAdmin();

    const body = await request.json();
    const validatedData = createServiceSchema.parse(body);

    const service = await serviceService.createService(validatedData);

    return ApiResponse.success({ service }, 201);
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
    console.error("Error creating service:", error);
    return ApiResponse.error("Failed to create service");
  }
}

export async function GET(request: Request) {
  try {
    await AuthGuard.requireAdmin();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const result = await serviceService.getServices(page, limit);

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
    console.error("Error fetching services:", error);
    return ApiResponse.error("Failed to fetch services");
  }
}
