import { z } from "zod";
import { updateEmployeeSchema } from "@/backend/schemas/user.schema";
import { userService } from "@/backend/services/user.service";
import { ApiResponse } from "@/backend/utils/api-response";
import { AuthGuard } from "@/backend/utils/auth-guard";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await AuthGuard.requireAdmin();

    const { id } = await params;

    await userService.deleteEmployee(id);

    return ApiResponse.success({ message: "Employee deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return ApiResponse.unauthorized();
      }
      if (error.message === "Forbidden") {
        return ApiResponse.forbidden();
      }
    }
    console.error("Error deleting employee:", error);
    return ApiResponse.error("Failed to delete employee");
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await AuthGuard.requireAdmin();

    const { id } = await params;
    const body = await request.json();
    const validatedData = updateEmployeeSchema.parse(body);

    const employee = await userService.updateEmployee(id, validatedData);

    return ApiResponse.success({ employee });
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
    console.error("Error updating employee:", error);
    return ApiResponse.error("Failed to update employee");
  }
}
