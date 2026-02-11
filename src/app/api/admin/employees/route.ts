import { z } from "zod";
import { createEmployeeSchema } from "@/backend/schemas/user.schema";
import { userService } from "@/backend/services/user.service";
import { ApiResponse } from "@/backend/utils/api-response";
import { AuthGuard } from "@/backend/utils/auth-guard";

export async function POST(request: Request) {
  try {
    await AuthGuard.requireAdmin();

    const body = await request.json();
    const validatedData = createEmployeeSchema.parse(body);

    const employee = await userService.createEmployee(validatedData);

    return ApiResponse.success({ employee }, 201);
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
      if (error.message === "Email already exists") {
        return ApiResponse.badRequest(error.message);
      }
    }
    console.error("Error creating employee:", error);
    return ApiResponse.error("Failed to create employee");
  }
}

export async function GET(request: Request) {
  try {
    await AuthGuard.requireAdmin();

    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");

    const result = await userService.getEmployees(page, limit);

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
    console.error("Error fetching employees:", error);
    return ApiResponse.error("Failed to fetch employees");
  }
}
