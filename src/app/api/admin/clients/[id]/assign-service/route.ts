import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";

const assignServiceSchema = z.object({
  serviceId: z.string(),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: clientId } = await params;
    const body = await request.json();
    const { serviceId } = assignServiceSchema.parse(body);

    const client = await prisma.user.findUnique({
      where: { id: clientId, role: "CLIENT" },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const project = await prisma.project.create({
      data: {
        clientId,
        status: "APPROVED",
        services: [
          {
            serviceId: service.id,
            serviceName: service.serviceName,
            updates: {},
          },
        ],
        assignedEmployees: [],
        read: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Service assigned to client successfully",
      project: {
        id: project.id,
        status: project.status,
      },
    });
  } catch (error) {
    console.error("Assign service error:", error);
    return NextResponse.json(
      { error: "Failed to assign service" },
      { status: 500 }
    );
  }
}
