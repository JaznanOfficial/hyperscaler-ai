import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const packages = await prisma.subscription.findMany({
      where: {
        userId: id,
        packageName: { not: null },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        packageName: true,
        amount: true,
        status: true,
        createdAt: true,
        subscriptionId: true,
      },
    });

    return NextResponse.json({ packages });
  } catch (error) {
    console.error("Get client packages error:", error);
    return NextResponse.json(
      { error: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}
