import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";

const updateProjectSchema = z.object({
  assignedEmployees: z.array(z.string()).optional(),
  status: z.enum(["APPROVED", "PENDING", "CANCELLED"]).optional(),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN" && session.user.role !== "MANAGER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const clientService = await prisma.clientService.findUnique({
      where: { id },
    });

    if (!clientService) {
      return NextResponse.json(
        { error: "Client service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ clientService });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN" && session.user.role !== "MANAGER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const clientService = await prisma.clientService.findUnique({
      where: { id },
    });

    if (!clientService) {
      return NextResponse.json(
        { error: "Client service not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validatedData = updateProjectSchema.parse(body);

    // Only ADMIN can change status (approve/reject projects)
    if (validatedData.status && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only admins can approve or change project status" },
        { status: 403 }
      );
    }

    const updatedClientService = await prisma.clientService.update({
      where: { id },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ clientService: updatedClientService });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN" && session.user.role !== "MANAGER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.clientService.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Client service deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
