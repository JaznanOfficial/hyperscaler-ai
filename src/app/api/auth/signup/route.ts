import bcrypt from "bcryptjs";
import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/backend/config/prisma";
import { signupSchema } from "@/backend/schemas/auth.schema";
import { generateDisplayId } from "@/lib/generate-display-id";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = signupSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const role = validatedData.role || "CLIENT";
    const displayId = await generateDisplayId(role as any);
    const defaultName = validatedData.email.split("@")[0] || "User";

    const user = await prisma.user.create({
      data: {
        name: defaultName,
        email: validatedData.email,
        password: hashedPassword,
        role,
        displayId,
        generalInfo: validatedData.generalInfo as any,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        displayId: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "Account created successfully", data: user },
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
