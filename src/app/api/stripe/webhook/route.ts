import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/backend/config/prisma";
import { sendPurchaseConfirmationEmail } from "@/lib/email";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.metadata) {
          const { userId, packageName, amount } = session.metadata;

          // Store package subscription
          if (session.subscription && session.customer) {
            await prisma.subscription.create({
              data: {
                userId,
                subscriptionId: session.subscription as string,
                priceId: session.line_items?.data[0]?.price?.id || "",
                invoiceId: session.invoice as string | null,
                packageName: packageName || null,
                amount: Number.parseInt(amount || "0") * 100,
                status: "PAID",
              },
            });

            // Get user details and send confirmation email
            const user = await prisma.user.findUnique({
              where: { id: userId },
              select: { email: true, name: true },
            });

            if (user && packageName && amount) {
              await sendPurchaseConfirmationEmail(
                user.email,
                user.name,
                packageName,
                Number.parseInt(amount) * 100
              );
            }
          }
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        await prisma.subscription.updateMany({
          where: { subscriptionId: subscription.id },
          data: {
            status:
              subscription.status === "active"
                ? "PAID"
                : subscription.status === "canceled"
                  ? "CANCELLED"
                  : "UNPAID",
          },
        });
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as any;
        const subscriptionId = invoice.subscription;

        if (subscriptionId && typeof subscriptionId === "string") {
          await prisma.subscription.updateMany({
            where: { subscriptionId },
            data: {
              status: "PAID",
              invoiceId: invoice.id,
            },
          });
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as any;
        const subscriptionId = invoice.subscription;

        if (subscriptionId && typeof subscriptionId === "string") {
          await prisma.subscription.updateMany({
            where: { subscriptionId },
            data: { status: "UNPAID" },
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
