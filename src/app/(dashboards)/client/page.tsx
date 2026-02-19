"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import type { ChatMessage } from "@/components/chat/types";
import { AiAgentPanel } from "@/components/dashboard/ai-agent/agent-panel";

const clientMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    author: "Hyperscaler AI",
    content:
      "Client workspace synced. Would you like me to call out churn risk this week?",
    timestamp: "10:05 AM",
  },
  {
    id: "2",
    role: "user",
    author: "Ops Lead",
    content:
      "Start with enterprise accounts. I only want risk if the flag is high confidence.",
    timestamp: "10:06 AM",
  },
];

export default function ClientDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const payment = searchParams.get("payment");
    const packageName = searchParams.get("package");
    const amount = searchParams.get("amount");

    // Show success message after payment
    if (payment === "success" && packageName) {
      toast.success(`Payment successful! Your ${packageName} package is now active.`);
      // Clean up URL
      router.replace("/client");
      return;
    }

    // Show canceled message
    if (payment === "canceled") {
      toast.error("Payment was canceled. You can try again anytime.");
      router.replace("/client");
      return;
    }

    // Redirect to Stripe checkout if payment param is true
    if (payment === "true" && packageName && amount) {
      const initiatePayment = async () => {
        try {
          const response = await fetch("/api/stripe/checkout-package", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              packageName,
              amount: parseFloat(amount),
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Failed to initiate payment");
          }

          if (data.url) {
            window.location.href = data.url;
          }
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : "Payment failed"
          );
          router.push("/client");
        }
      };

      initiatePayment();
    }
  }, [searchParams, router]);

  return (
    <AiAgentPanel
      inputPlaceholder="Sync with Hyperscaler AI"
      messages={clientMessages}
    />
  );
}
