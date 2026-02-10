"use client";

import { Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CartItem } from "@/data/cart-items";
import { formatCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const displayPrice = item.displayPrice ?? item.price;

  return (
    <Card
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 text-left",
        "shadow-[0px_12px_30px_rgba(12,10,44,0.05)] md:flex-row md:items-center md:justify-between md:p-6"
      )}
    >
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-['Outfit'] font-semibold text-lg text-slate-900">
            {item.title}
          </p>
          {item.badge ? (
            <Badge className="bg-amber-100 text-amber-800" variant="secondary">
              {item.badge}
            </Badge>
          ) : null}
        </div>
        <p className="text-slate-600 text-sm">{item.description}</p>
      </div>

      <div className="flex items-center justify-end gap-4 self-stretch">
        <div className="text-right">
          <p className="font-['Outfit'] font-semibold text-2xl text-slate-900">
            {formatCurrency(displayPrice)}
            <span className="ml-2 font-medium text-base text-slate-500">
              {item.cadence}
            </span>
          </p>
          <p className="font-medium text-slate-500 text-xs">Billed monthly</p>
        </div>
        <Button
          aria-label="Remove service from cart"
          className="h-10 w-10 rounded-full border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:text-slate-900"
          size="icon"
          variant="outline"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </Card>
  );
}
