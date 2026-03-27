import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { prisma } from "@/backend/config/prisma";
import { onboardingBusinessSchema } from "@/backend/schemas/onboarding-business.schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = onboardingBusinessSchema.parse(body);

    const profile = await prisma.nonLoggedOnboardingProfile.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        businessName: validatedData.businessName,
        industry: validatedData.industry,
        businessStage: validatedData.businessStage,
        websiteUrl: validatedData.websiteUrl || null,
        monthlyRevenueRange: validatedData.monthlyRevenueRange || null,
        services: [],
        discoverySource: "unknown",
      },
      select: { id: true },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Anonymous onboarding business data saved successfully",
        data: { anonId: profile.id },
      },
      { status: 201 }
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
