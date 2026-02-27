import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";

const assignEmployeesSchema = z.object({
  employeeIds: z.array(z.string()),
});

export async function POST(
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
        { error: "Service request not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { employeeIds } = assignEmployeesSchema.parse(body);

    if (employeeIds.length > 0) {
      const employees = await prisma.user.findMany({
        where: {
          id: { in: employeeIds },
          role: { in: ["EMPLOYEE", "MANAGER"] },
        },
      });

      if (employees.length !== employeeIds.length) {
        return NextResponse.json(
          { error: "Some employee IDs are invalid" },
          { status: 400 }
        );
      }
    }

    const updatedClientService = await prisma.clientService.update({
      where: { id },
      data: {
        assignedEmployees: employeeIds,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ project: updatedClientService });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error assigning employees:", error);
    return NextResponse.json(
      { error: "Failed to assign employees" },
      { status: 500 }
    );
  }
}
