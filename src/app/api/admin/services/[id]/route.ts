import { z } from "zod";
import { serviceService } from "@/backend/services/service.service";
import { AuthGuard } from "@/backend/utils/auth-guard";
import { ApiResponse } from "@/backend/utils/api-response";
import { updateServiceSchema } from "@/backend/schemas/service.schema";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await AuthGuard.requireAdmin();

    const { id } = await params;

    const service = await serviceService.getServiceById(id);

    if (!service) {
      return ApiResponse.error("Service not found", 404);
    }

    return ApiResponse.success({ service });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return ApiResponse.unauthorized();
      }
      if (error.message === "Forbidden") {
        return ApiResponse.forbidden();
      }
    }
    console.error("Error fetching service:", error);
    return ApiResponse.error("Failed to fetch service");
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
    const validatedData = updateServiceSchema.parse(body);

    const service = await serviceService.updateService(id, validatedData);

    return ApiResponse.success({ service });
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
    console.error("Error updating service:", error);
    return ApiResponse.error("Failed to update service");
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await AuthGuard.requireAdmin();

    const { id } = await params;

    await serviceService.deleteService(id);

    return ApiResponse.success({ message: "Service deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return ApiResponse.unauthorized();
      }
      if (error.message === "Forbidden") {
        return ApiResponse.forbidden();
      }
    }
    console.error("Error deleting service:", error);
    return ApiResponse.error("Failed to delete service");
  }
}
