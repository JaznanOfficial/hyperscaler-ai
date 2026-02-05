import crypto from "crypto";
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/backend/config/prisma";
import { forgotPasswordSchema } from "@/backend/schemas/auth.schema";
import { sendPasswordResetEmail } from "@/backend/utils/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = forgotPasswordSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "If the email exists, a reset link has been sent" },
        { status: 200 }
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    await prisma.passwordResetToken.create({
      data: {
        email: user.email,
        token: hashedToken,
        expires: new Date(Date.now() + 3_600_000),
        userId: user.id,
      },
    });

    await sendPasswordResetEmail(user.email, resetToken);

    return NextResponse.json(
      { message: "If the email exists, a reset link has been sent" },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
