import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";
import { onboardingServicesSchema } from "@/backend/schemas/onboarding-services.schema";

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
    const validatedData = onboardingServicesSchema.parse(body);

    const existingProfile = await prisma.onboardingProfile.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    if (!existingProfile) {
      return NextResponse.json(
        { success: false, message: "Onboarding profile not found" },
        { status: 400 }
      );
    }

    const onboardingProfile = await prisma.onboardingProfile.update({
      where: { id: existingProfile.id },
      data: {
        services: validatedData.services,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Services saved successfully",
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
