"use client";

import { ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { CartItemCard } from "@/components/home/cart/cart-item-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/client/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          services: items.map((item) => ({
            serviceId: item.serviceId,
            serviceName: item.serviceName,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      clearCart();
      toast.success("Order placed successfully! Awaiting admin approval.");
      router.push("/client/subscriptions");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Checkout failed");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <section className="bg-[#FDFBFF] py-12">
      <div className="mx-auto w-11/12 space-y-10 lg:w-10/12">
        <Link
          className={cn(
            "inline-flex items-center gap-2 font-medium text-slate-600 text-sm",
            "transition hover:text-violet-700"
          )}
          href="/services"
        >
          <ChevronLeft className="size-4" /> Back to Services
        </Link>

        <div className="space-y-1.5">
          <h1 className="font-['Outfit'] font-medium text-3xl text-slate-900 leading-10">
            Your Cart
          </h1>
          <p className="font-['Outfit'] font-normal text-slate-600 text-xl leading-7">
            Review your selected services before checkout.
          </p>
        </div>

        <div className="grid items-start gap-6 md:grid-cols-[2fr_1fr]">
          <div className="space-y-5">
            {items.map((item) => (
              <CartItemCard 
                item={{
                  id: item.serviceId,
                  title: item.serviceName,
                  description: "AI-powered service to help grow your business",
                  price: 500,
                  cadence: "/month",
                  badge: "Popular"
                }} 
                key={item.serviceId} 
              />
            ))}
          </div>

          <Card className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0px_12px_30px_rgba(12,10,44,0.05)]">
            <p className="font-semibold text-lg text-slate-900">
              Order Summary
            </p>
            <div className="space-y-3 text-slate-600 text-sm">
              <div className="flex items-center justify-between text-base">
                <span>
                  Subtotal ({items.length}{" "}
                  {items.length === 1 ? "service" : "services"})
                </span>
                <span className="font-semibold text-slate-900">
                  ${items.length * 500}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Extra Charge/Discount</span>
                <span className="font-semibold text-slate-900">
                  $10
                </span>
              </div>
            </div>
            <Separator className="border-slate-100" />
            <div className="flex items-center justify-between font-semibold text-lg text-slate-900">
              <span>Total per month</span>
              <span>${items.length * 500 + 10}</span>
            </div>
            <div className="space-y-2">
              <Button
                className="w-full gap-2 font-semibold text-base"
                disabled={isCheckingOut}
                onClick={handleCheckout}
                size="lg"
                variant="gradient"
              >
                {isCheckingOut ? "Processing..." : "Proceed to Checkout"} <ArrowRight className="size-4" />
              </Button>
              <Button asChild className="w-full" size="lg" variant="outline">
                <Link href="/services">Continue Browsing</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
