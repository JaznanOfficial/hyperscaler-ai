import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";

const checkoutSchema = z.object({
  services: z.array(
    z.object({
      serviceId: z.string(),
      serviceName: z.string(),
    })
  ),
});

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "CLIENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { services } = checkoutSchema.parse(body);

    const serviceIds = services.map((item) => item.serviceId);
    const serviceRecords = await prisma.service.findMany({
      where: { id: { in: serviceIds } },
    });

    if (serviceRecords.length !== serviceIds.length) {
      return NextResponse.json(
        { error: "Some services not found" },
        { status: 404 }
      );
    }

    const projectServices = serviceRecords.map((service) => ({
      serviceId: service.id,
      serviceName: service.serviceName,
      updates: {},
    }));

    const project = await prisma.project.create({
      data: {
        clientId: session.user.id,
        status: "PENDING",
        services: projectServices,
        assignedEmployees: [],
        read: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Order placed successfully! Awaiting admin approval.",
      project: {
        id: project.id,
        status: project.status,
      },
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to process checkout" },
      { status: 500 }
    );
  }
}
