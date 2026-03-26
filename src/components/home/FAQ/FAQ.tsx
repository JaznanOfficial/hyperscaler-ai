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
    question: "What exactly is Hyperscaler?",
    answer:
      "Hyperscaler is an AI-powered SaaS platform that replaces fragmented marketing teams, agencies, and tools with a single, automated growth and product execution system. Think of it as the operating system for your company's growth.",
  },
  {
    question: "How is Hyperscaler different from a marketing agency?",
    answer:
      "Hyperscaler is a system, not a service. While agencies deliver work manually through account managers, Hyperscaler automates execution across every marketing channel and surfaces real-time performance data - so you get consistent, measurable output without managing people.",
  },
  {
    question: "Which marketing channels does Hyperscaler support?",
    answer:
      "Hyperscaler runs Paid Ads, Cold Email Campaigns, Social Media Marketing, Branding & Content Creation, Cold LinkedIn Outreach, and Cold Calling, all managed from a single dashboard with unified analytics.",
  },
  {
    question: "What metrics can I track on the dashboard?",
    answer:
      "Every channel reports Leads Generated, Qualified Leads (MQL/SQL), Conversion Rate, Cost Per Lead (CPL), Customer Acquisition Cost (CAC), Revenue Attributed, ROI, Click-Through Rate (CTR), and Engagement Metrics, all in real time.",
  },
  {
    question: "Who is Hyperscaler built for?",
    answer:
      "Hyperscaler is designed for high-growth technology companies like SaaS startups, AI companies, venture-backed teams, and software firms, primarily in the US and North America. The primary buyers are CEOs, CMOs, CTOs, and Growth Leaders.",
  },
  {
    question: "Do I need to hire a team to use Hyperscaler?",
    answer:
      "No. That's the point. Hyperscaler is designed to eliminate the need for large internal marketing teams or managing multiple vendors. Automation handles the execution while you focus on strategy and decisions.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "Onboarding is structured for speed. The platform is built to move companies from kickoff to active campaigns and development milestones rapidly without the ramp-up time of traditional agencies or new hires.",
  },
  {
    question: "What types of companies have used Hyperscaler?",
    answer:
      "Hyperscaler serves SaaS companies, AI startups, technology service firms, and growth-stage startups looking to scale customer acquisition and ship products faster without building large internal teams.",
  },
  {
    question: "What's the long-term vision for the platform?",
    answer:
      "The vision is to become the single intelligent dashboard where businesses can launch products, scale marketing, automate workflows, and track all business performance, an operating system for company growth.",
  },
  {
    question: "Can Hyperscaler help us build a product or MVP?",
    answer:
      "Yes. The Build layer supports SaaS, AI products, mobile apps (Android & iOS), workflow automation, and enterprise tools. You get structured milestones, progress visibility, and predictable delivery timelines, no more guessing when your MVP ships.",
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
                "group w-full cursor-pointer rounded-xl border border-[#D1D1D1] bg-[#F9F7FA] px-5 py-3 text-left transition-all duration-200 hover:border-purple-300 hover:bg-purple-50 data-[state=open]:shadow-md"
              )}
              key={faq.question}
              onOpenChange={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
              open={isOpen}
            >
              <CollapsibleTrigger
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between gap-3 focus-visible:outline-none",
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
