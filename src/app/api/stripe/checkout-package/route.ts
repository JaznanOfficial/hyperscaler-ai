import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { stripe } from "@/lib/stripe";
import { z } from "zod";

const checkoutSchema = z.object({
  packageName: z.string(),
  amount: z.number(),
});

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "CLIENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { packageName, amount } = checkoutSchema.parse(body);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${packageName} Package`,
              description: `Hyperscaler ${packageName} subscription package`,
            },
            unit_amount: Math.round(amount * 100),
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
        packageName,
        amount: amount.toString(),
      },
      success_url: `${appUrl}/client/subscriptions?payment=success&package=${encodeURIComponent(packageName)}`,
      cancel_url: `${appUrl}/client/services?payment=canceled`,
      customer_email: session.user.email || undefined,
    });

    return NextResponse.json({
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
