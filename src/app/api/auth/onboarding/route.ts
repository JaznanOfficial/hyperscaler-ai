import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/backend/config/prisma";
import { onboardingSchema } from "@/backend/schemas/onboarding.schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = onboardingSchema.parse(body);

    const {
      userId,
      email,
      businessName,
      industry,
      businessStage,
      websiteUrl,
      monthlyRevenueRange,
      services,
      discoverySource,
    } = validatedData;

    let existingProfile = null;

    if (userId) {
      existingProfile = await prisma.onboardingProfile.findUnique({
        where: { userId },
      });
    }

    if (!existingProfile && email) {
      existingProfile = await prisma.onboardingProfile.findUnique({
        where: { email },
      });
    }

    const isUpdate = Boolean(existingProfile);
    const onboardingProfile = existingProfile
      ? await prisma.onboardingProfile.update({
          where: { id: existingProfile.id },
          data: {
            userId: userId ?? existingProfile.userId,
            email: email ?? existingProfile.email,
            businessName,
            industry,
            businessStage,
            websiteUrl: websiteUrl || null,
            monthlyRevenueRange: monthlyRevenueRange || null,
            services,
            discoverySource,
          },
        })
      : await prisma.onboardingProfile.create({
          data: {
            userId,
            email,
            businessName,
            industry,
            businessStage,
            websiteUrl: websiteUrl || null,
            monthlyRevenueRange: monthlyRevenueRange || null,
            services,
            discoverySource,
          },
        });

    return NextResponse.json(
      {
        success: true,
        message: "Onboarding data saved successfully",
        data: onboardingProfile,
      },
      { status: isUpdate ? 200 : 201 }
    );
  } catch (error: any) {
    if (error.name === "ZodError") {
      const firstError = error.errors[0];
      return NextResponse.json(
        { success: false, message: firstError.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
