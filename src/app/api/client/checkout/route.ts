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

    const projectServices = services.map((service) => ({
      serviceId: service.serviceId,
      serviceName: service.serviceName,
      updates: {},
    }));

    const clientService = await prisma.clientService.create({
      data: {
        clientId: session.user.id,
        status: "PENDING",
        services: JSON.stringify(projectServices),
        assignedEmployees: [],
        read: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Order placed successfully! Awaiting admin approval.",
      project: {
        id: clientService.id,
        status: clientService.status,
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
