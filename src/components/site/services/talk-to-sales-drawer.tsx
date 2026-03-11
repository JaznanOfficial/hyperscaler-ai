"use client";

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

interface TalkToSalesDrawerProps {
  buttonClassName?: string;
  buttonVariant?: ButtonVariant;
  buttonLabel?: string;
  trigger?: ReactElement;
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
    href: "https://calendly.com/ujjwalroy1/ai-implementation",
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
  buttonVariant = "gradient",
  trigger,
}: TalkToSalesDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger ?? (
          <Button
            className={"h-[48px]"}
            size="lg"
            variant={buttonVariant}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 12.69V14.94C16.5009 15.1488 16.4581 15.3556 16.3744 15.547C16.2907 15.7383 16.168 15.9101 16.0141 16.0513C15.8602 16.1926 15.6784 16.3001 15.4806 16.367C15.2827 16.4339 15.073 16.4588 14.865 16.44C12.5571 16.1892 10.3403 15.4006 8.39251 14.1375C6.58038 12.9859 5.04401 11.4496 3.89251 9.63745C2.62499 7.68085 1.83619 5.4532 1.59001 3.13495C1.57127 2.92755 1.59592 2.71852 1.66239 2.52117C1.72886 2.32382 1.83569 2.14247 1.97609 1.98867C2.11648 1.83487 2.28736 1.71198 2.47785 1.62784C2.66834 1.5437 2.87427 1.50015 3.08251 1.49995H5.33251C5.69649 1.49637 6.04935 1.62526 6.32533 1.8626C6.60131 2.09994 6.78157 2.42954 6.83251 2.78995C6.92748 3.51 7.1036 4.217 7.35751 4.89745C7.45842 5.16589 7.48026 5.45764 7.42044 5.73811C7.36062 6.01858 7.22166 6.27603 7.02001 6.47995L6.06751 7.43245C7.13518 9.31011 8.68985 10.8648 10.5675 11.9325L11.52 10.98C11.7239 10.7783 11.9814 10.6393 12.2619 10.5795C12.5423 10.5197 12.8341 10.5415 13.1025 10.6425C13.783 10.8964 14.49 11.0725 15.21 11.1675C15.5743 11.2188 15.9071 11.4024 16.1449 11.6831C16.3828 11.9638 16.5091 12.3221 16.5 12.69Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

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
