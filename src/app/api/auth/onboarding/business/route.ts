import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";
import { onboardingBusinessSchema } from "@/backend/schemas/onboarding-business.schema";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = onboardingBusinessSchema.parse(body);

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        getStarted: true,
      },
    });

    const onboardingProfile = await prisma.onboardingProfile.upsert({
      where: { userId: session.user.id },
      update: {
        email: session.user.email ?? undefined,
        businessName: validatedData.businessName,
        industry: validatedData.industry,
        businessStage: validatedData.businessStage,
        websiteUrl: validatedData.websiteUrl || null,
        monthlyRevenueRange: validatedData.monthlyRevenueRange || null,
      },
      create: {
        userId: session.user.id,
        email: session.user.email ?? undefined,
        businessName: validatedData.businessName,
        industry: validatedData.industry,
        businessStage: validatedData.businessStage,
        websiteUrl: validatedData.websiteUrl || null,
        monthlyRevenueRange: validatedData.monthlyRevenueRange || null,
        services: [],
        discoverySource: "unknown",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Business onboarding data saved successfully",
        data: onboardingProfile,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      const firstIssue = error.issues?.[0];
      return NextResponse.json(
        { success: false, message: firstIssue?.message ?? "Invalid request" },
        { status: 400 }
      );
    }

    const message =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
