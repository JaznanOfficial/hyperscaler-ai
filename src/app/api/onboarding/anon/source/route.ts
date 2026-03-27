import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { prisma } from "@/backend/config/prisma";
import { anonIdentifierSchema } from "@/backend/schemas/onboarding-anon.schema";
import { onboardingSourceSchema } from "@/backend/schemas/onboarding-source.schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { anonId } = anonIdentifierSchema.parse(body);
    const validatedData = onboardingSourceSchema.parse(body);

    const existing = await prisma.nonLoggedOnboardingProfile.findUnique({
      where: { id: anonId },
      select: { id: true },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Anonymous onboarding profile not found" },
        { status: 404 }
      );
    }

    await prisma.nonLoggedOnboardingProfile.update({
      where: { id: anonId },
      data: { discoverySource: validatedData.discoverySource },
    });

    return NextResponse.json(
      { success: true, message: "Discovery source saved successfully" },
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
