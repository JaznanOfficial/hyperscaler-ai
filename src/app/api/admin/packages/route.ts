import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const packages = await prisma.subscription.findMany({
      where: {
        packageName: { not: null },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        userId: true,
        packageName: true,
        amount: true,
        status: true,
        createdAt: true,
        subscriptionId: true,
      },
    });

    // Get user details
    const userIds = [...new Set(packages.map((p) => p.userId))];
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, email: true },
    });

    const userMap = new Map(users.map((u) => [u.id, u]));

    const packagesWithUsers = packages.map((pkg) => ({
      ...pkg,
      user: userMap.get(pkg.userId),
    }));

    return NextResponse.json({ packages: packagesWithUsers });
  } catch (error) {
    console.error("Get admin packages error:", error);
    return NextResponse.json(
      { error: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}
