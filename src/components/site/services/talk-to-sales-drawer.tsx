"use client";

import {
  ArrowUpRight,
  CalendarDays,
  MessageCircle,
  PhoneCall,
  PhoneOutgoing,
} from "lucide-react";
import Link from "next/link";
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

interface TalkToSalesDrawerProps {
  buttonClassName?: string;
}

const contactOptions = [
  {
    title: "Schedule a call",
    description:
      "Book a 1:1 call with our team to discuss your idea, scope, and next steps.",
    ctaLabel: "Book a Call",
    href: "#schedule-call",
    icon: PhoneOutgoing,
  },
  {
    title: "Book via Calendly",
    description: "Pick a time that works for you using our Calendly link.",
    ctaLabel: "Open Calendly",
    href: "#calendly",
    icon: CalendarDays,
  },
  {
    title: "Chat on Whatsapp",
    description: "Get quick answers and guidance directly on WhatsApp.",
    ctaLabel: "Start Chat",
    href: "#whatsapp",
    icon: MessageCircle,
  },
];

export function TalkToSalesDrawer({ buttonClassName }: TalkToSalesDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className={cn("flex-1", buttonClassName)} variant="gradient">
          <PhoneCall className="mr-1.5 size-4" />
          Talk to Us
        </Button>
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
