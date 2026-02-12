"use client";

import { useState } from "react";
import { ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/client/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({ serviceId: item.serviceId })),
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      clearCart();
      toast.success(data.message);
      router.push("/client/subscriptions");
    } catch (error) {
      toast.error("Checkout failed");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-y-auto">
      <div className="space-y-6 p-6">
        <Link
          className="inline-flex items-center gap-2 font-medium text-slate-600 text-sm transition hover:text-violet-700"
          href="/client/services"
        >
          <ArrowLeft className="size-4" /> Back to Services
        </Link>

        <div className="flex items-center gap-3">
          <ShoppingCart className="size-8 text-violet-600" />
          <h1 className="font-['Outfit'] font-semibold text-3xl text-slate-900">
            Shopping Cart
          </h1>
        </div>

        {items.length === 0 ? (
          <Card className="border border-slate-200 p-12 text-center">
            <ShoppingCart className="mx-auto mb-4 size-16 text-slate-300" />
            <h2 className="mb-2 font-semibold text-slate-900 text-xl">
              Your cart is empty
            </h2>
            <p className="mb-6 text-slate-600">
              Browse our services and add them to your cart
            </p>
            <Button asChild variant="gradient">
              <Link href="/client/services">Explore Services</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {items.map((item) => (
                <Card
                  className="border border-slate-200 p-4"
                  key={item.serviceId}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-['Outfit'] font-semibold text-lg text-slate-900">
                        {item.serviceName}
                      </h3>
                      <p className="mt-2 font-['Outfit'] font-bold text-2xl text-slate-900">
                        {item.price}
                        <span className="ml-1 font-medium text-slate-500 text-sm">
                          /month
                        </span>
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.serviceId)}
                    >
                      <Trash2 className="size-4 text-rose-500" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-6 border border-slate-200 p-6">
                <h2 className="mb-4 font-['Outfit'] font-semibold text-xl text-slate-900">
                  Order Summary
                </h2>
                <div className="mb-6 space-y-2">
                  <div className="flex justify-between text-slate-600">
                    <span>Items</span>
                    <span>{items.length}</span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  variant="gradient"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </Button>
                <p className="mt-4 text-center text-slate-500 text-sm">
                  Your order will be sent to admin for approval
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
