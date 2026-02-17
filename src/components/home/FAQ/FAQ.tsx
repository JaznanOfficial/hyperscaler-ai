"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const faqData = [
  {
    question: "Can I subscribe to multiple services?",
    answer:
      "Yes, you can subscribe to multiple services simultaneously. Each service is billed separately on a monthly basis, giving you complete flexibility to scale up or down base4d on your requirements.",
  },
  {
    question: "Is there a free trial available for new users?",
    answer: "Yes, we offer a 14-day free trial for new users.",
  },
  {
    question: "How can I cancel my subscription?",
    answer:
      "The benefits of using Hyperscaler include scalability, security, and cost-effectiveness.",
  },
  {
    question: "What payment methods are accepted for subscriptions?",
    answer:
      "The benefits of using Hyperscaler include scalability, security, and cost-effectiveness.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="mx-auto flex w-11/12 flex-col items-center justify-center gap-8 py-10 md:gap-10 md:py-12 lg:w-10/12 lg:gap-13 lg:py-16"
      id="faqs"
    >
      <SectionHeader
        description="Everything you need to know about our services, pricing, and process."
        titlePart1="Frequently Asked Questions"
      />

      <div className="grid w-full max-w-6xl grid-cols-1 gap-4">
        {faqData.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <Collapsible
              className={cn(
                "group w-full rounded-xl border border-[#D1D1D1] bg-[#F9F7FA] px-5 py-3 text-left transition-all duration-200 hover:border-purple-300 hover:bg-purple-50 data-[state=open]:shadow-md"
              )}
              key={faq.question}
              onOpenChange={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
              open={isOpen}
            >
              <CollapsibleTrigger
                className={cn(
                  "flex w-full items-center justify-between gap-3 focus-visible:outline-none",
                  "font-['Outfit']",
                  "font-medium text-[#1A1A1A] text-md md:text-lg"
                )}
              >
                <span className="text-left">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-[#9E32DD] transition-transform duration-200",
                    isOpen ? "rotate-180" : "rotate-0"
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 overflow-hidden text-[#515A65] text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="leading-relaxed">{faq.answer}</p>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
