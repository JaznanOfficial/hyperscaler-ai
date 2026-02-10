import { ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

import { CartItemCard } from "@/components/home/cart/cart-item-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { sampleCartItems } from "@/data/cart-items";
import { formatCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const subtotal = sampleCartItems.reduce((sum, item) => sum + item.price, 0);
  const extraCharge = 10;
  const total = subtotal + extraCharge;
  const subtotalDisplay = formatCurrency(subtotal);
  const extraChargeDisplay = formatCurrency(extraCharge);
  const totalDisplay = formatCurrency(total);

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
            {sampleCartItems.map((item) => (
              <CartItemCard item={item} key={item.id} />
            ))}
          </div>

          <Card className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0px_12px_30px_rgba(12,10,44,0.05)]">
            <p className="font-semibold text-lg text-slate-900">
              Order Summary
            </p>
            <div className="space-y-3 text-slate-600 text-sm">
              <div className="flex items-center justify-between text-base">
                <span>
                  Subtotal ({sampleCartItems.length}{" "}
                  {sampleCartItems.length === 1 ? "service" : "services"})
                </span>
                <span className="font-semibold text-slate-900">
                  {subtotalDisplay}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Extra Charge/Discount</span>
                <span className="font-semibold text-slate-900">
                  {extraChargeDisplay}
                </span>
              </div>
            </div>
            <Separator className="border-slate-100" />
            <div className="flex items-center justify-between font-semibold text-lg text-slate-900">
              <span>Total per month</span>
              <span>{totalDisplay}</span>
            </div>
            <Button
              className="w-full gap-2 font-semibold text-base"
              size="lg"
              variant="gradient"
            >
              Proceed to Checkout <ArrowRight className="size-4" />
            </Button>
            <Button className="w-full" size="lg" variant="outline">
              Continue Browsing
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
