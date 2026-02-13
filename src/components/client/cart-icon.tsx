"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

export function CartIcon() {
  const { items } = useCart();
  const itemCount = items.length;

  return (
    <Button asChild className="relative" size="sm" variant="ghost">
      <Link href="/cart">
        <ShoppingCart className="size-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-violet-600 font-semibold text-white text-xs">
            {itemCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
