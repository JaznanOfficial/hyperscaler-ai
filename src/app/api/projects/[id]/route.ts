import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";
import { updateProjectServicesSchema } from "@/backend/schemas/project.schema";

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

    const { id: userId, role } = session.user;

    if (role !== "EMPLOYEE" && role !== "MANAGER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const assignedEmployees = project.assignedEmployees as string[];
    if (!assignedEmployees.includes(userId)) {
      return NextResponse.json(
        { error: "You are not assigned to this project" },
        { status: 403 }
      );
    }

    return NextResponse.json({ project });
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

    const { id: userId, role } = session.user;

    if (role !== "EMPLOYEE" && role !== "MANAGER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const assignedEmployees = project.assignedEmployees as string[];
    if (!assignedEmployees.includes(userId)) {
      return NextResponse.json(
        { error: "You are not assigned to this project" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = updateProjectServicesSchema.parse(body);

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        services: validatedData.services as any,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ project: updatedProject });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid request data", details: error },
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
