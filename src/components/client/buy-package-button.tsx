"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface BuyPackageButtonProps {
  packageName: string;
  amount: number;
}

export function BuyPackageButton({
  packageName,
  amount,
}: BuyPackageButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBuyNow = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/stripe/checkout-package", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageName, amount }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Checkout failed");
      setIsProcessing(false);
    }
  };

  return (
    <Button
      className="w-full"
      disabled={isProcessing}
      onClick={handleBuyNow}
      variant="gradient"
    >
      <ShoppingCart className="mr-2 size-4" />
      {isProcessing ? "Processing..." : "Buy Now"}
    </Button>
  );
}
