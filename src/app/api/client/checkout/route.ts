import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";
import { checkoutSchema } from "@/backend/schemas/cart.schema";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "CLIENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { items } = checkoutSchema.parse(body);

    const serviceIds = items.map((item) => item.serviceId);
    const services = await prisma.service.findMany({
      where: { id: { in: serviceIds } },
    });

    if (services.length !== serviceIds.length) {
      return NextResponse.json(
        { error: "Some services not found" },
        { status: 404 }
      );
    }

    const projectServices = services.map((service) => ({
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
