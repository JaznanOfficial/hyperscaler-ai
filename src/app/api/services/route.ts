import { NextResponse } from "next/server";
import { prisma } from "@/backend/config/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      select: {
        id: true,
        serviceName: true,
        slug: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ services });
  } catch (error) {
    console.error("Get services error:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
