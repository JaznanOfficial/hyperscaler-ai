import {
  ArrowUpRight,
  CalendarDays,
  MessageCircle,
  PhoneCall,
  PhoneOutgoing,
} from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactElement } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type ButtonVariant = ComponentProps<typeof Button>["variant"];
type ButtonSize = "default" | "xs" | "sm" | "lg" | "icon" | "custom" | "icon-xs" | "icon-sm" | "icon-lg"; // Added valid size options

interface TalkToSalesDrawerProps {
  buttonClassName?: string;
  buttonVariant?: ButtonVariant;
  buttonLabel?: string;
  trigger?: ReactElement;
  buttonSize?: ButtonSize; // Updated to restrict size options
}

const contactOptions = [
  {
    title: "Call now",
    description: "Speak directly with our team for immediate support.",
    ctaLabel: "Call Now",
    href: "tel:+19195766153",
    icon: PhoneOutgoing,
  },
  {
    title: "Book via Calendly",
    description: "Pick a time that works for you using our Calendly link.",
    ctaLabel: "Open Calendly",
    href: "https://calendly.com/ujjwalroy1/hyperscaler-scale-your-build",
    icon: CalendarDays,
  },
  {
    title: "Chat on Whatsapp",
    description:
      "Message us on WhatsApp at +1 (919) 576-6153 for quick answers and guidance.",
    ctaLabel: "Chat on WhatsApp",
    href: "https://wa.me/19195766153",
    icon: MessageCircle,
  },
];

export function TalkToSalesDrawer({
  buttonClassName,
  buttonLabel = "Talk to Us",
  buttonVariant = "outline",
  trigger,
  buttonSize = "default", // Default to "default"
}: TalkToSalesDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger ?? (
          <Button
            className={buttonClassName}
            size={buttonSize} 
            variant={buttonVariant}
          >
            <PhoneCall className="size-[18px]" />
            {buttonLabel}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        className="w-full border-l bg-white px-6 py-8 sm:max-w-xl sm:px-10 sm:py-14"
        side="right"
      >
        <SheetHeader className="gap-1 p-0 text-left">
          <SheetTitle className="font-['Outfit'] font-semibold text-2xl text-slate-900">
            Talk to our sales team
          </SheetTitle>
          <SheetDescription className="font-['Inter'] text-base text-slate-500">
            Choose the fastest way to connect — we'll guide you, not pitch you.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-9 flex flex-col gap-6">
          {contactOptions.map((option) => (
            <div
              className="rounded-2xl border bg-gray-200 p-4 shadow-[0_10px_30px_rgba(54,36,99,0.07)]"
              key={option.title}
            >
              <div className="flex flex-col gap-2.5">
                <div className="inline-flex size-9 items-center justify-center rounded-xl bg-purple-200 text-purple-600">
                  <option.icon className="size-4" />
                </div>
                <div className="font-['Inter'] font-semibold text-base text-slate-900">
                  {option.title}
                </div>
                <p className="font-['Inter'] text-slate-600 text-sm">
                  {option.description}
                </p>
              </div>

              <Link
                className="mt-5 inline-flex items-center gap-1.5 font-['Inter'] font-semibold text-[#9E32DD] text-sm"
                href={option.href}
                rel="noreferrer"
                target="_blank"
              >
                {option.ctaLabel}
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}