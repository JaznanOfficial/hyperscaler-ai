import { ClientAgentPanel } from "@/components/dashboard/client/agent-panel";

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
    <ClientAgentPanel
      inputPlaceholder="Talk with Hyperscaler AI Assistant..."
      messages={[]}
    />
  );
}
