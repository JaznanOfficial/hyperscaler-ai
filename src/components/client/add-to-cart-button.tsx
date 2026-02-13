"use client";

import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

interface AddToCartButtonProps {
  serviceId: string;
  serviceName: string;
  price: string;
}

export function AddToCartButton({
  serviceId,
  serviceName,
  price,
}: AddToCartButtonProps) {
  const { addItem, items } = useCart();
  const isInCart = items.some((item) => item.serviceId === serviceId);

  const handleAddToCart = async () => {
    try {
      const response = await fetch("/api/client/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId }),
      });

      if (!response.ok) throw new Error("Failed to add to cart");

      addItem({ serviceId, serviceName, price });
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <Button
      className="min-w-[160px]"
      disabled={isInCart}
      onClick={handleAddToCart}
      variant={isInCart ? "outline" : "gradient"}
    >
      <ShoppingCart className="mr-2 size-4" />
      {isInCart ? "In Cart" : "Add to Cart"}
    </Button>
  );
}
