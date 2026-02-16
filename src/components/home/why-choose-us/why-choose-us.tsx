import { Check, X } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { cn } from "@/lib/utils";

const whyChooseUsData = [
  {
    label: "Traditional Agencies",
    lists: [
      "Menual Process",
      "Slow updates and communication",
      "Limited transparency",
      "Project Based pricing",
      "Execution Support",
    ],
  },
  {
    label: "Other SaaS Tools",
    lists: [
      "Tool-heavy with steep learning curve",
      "No execution support included",
      "DIY approach pricing",
      "Affordable pricing",
      "Self-service dashboards",
    ],
  },
  {
    label: "Hyperscaler",
    lists: [
      "AI + Human execution combined",
      "Build and Scale in one place",
      "Real-time updates and guidance",
      "Designed for founders and teams",
      "Transparent, flexible pricing",
    ],
  },
];

const WhyChooseUs = () => {
  return (
    <section className="mx-auto my-container flex w-11/12 flex-col items-center justify-center gap-8 py-10 md:gap-10 md:py-12 lg:w-10/12 lg:gap-13 lg:py-16">
      <SectionHeader
        description="Agencies move slow and charge a fortune. SaaS tools hand you a dashboard and wish you luck. Hyperscaler actually does the work with AI speed and human judgment."
        gradientTitle="different"
        titlePart1="Built"
        titlePart3="from anything you’ve tried"
      />

      <div className="grid w-full grid-cols-1 justify-items-center gap-6 max-lg:w-full md:gap-4 lg:grid-cols-3 lg:gap-7">
        {whyChooseUsData.map((item, iCard) => (
          <div
            className={cn(
              "w-full rounded-lg border bg-white p-4 md:p-6",
              iCard === 0 || iCard === 1
                ? "border-[#D1D1D1]"
                : "border-2 border-[#9E32DD] max-sm:col-span-1 max-lg:col-span-2"
            )}
            key={iCard}
          >
            <h3
              className={cn(
                "mb-4 font-semibold text-lg",
                iCard === 2 ? "text-[#9E32DD]" : "text-[#000000]"
              )}
            >
              {item.label}
            </h3>
            <ul className="space-y-2">
              {item.lists.map((list, i) => (
                <li
                  className="flex items-center gap-2 text-gray-600 text-sm md:gap-3"
                  key={i}
                >
                  {/** highlight Hyperscaler benefits with check icon */}
                  <div
                    className={cn(
                      "flex aspect-square size-5 items-center justify-center rounded-full md:size-[34px]",
                      iCard === 2
                        ? "bg-[#ECD6F8] text-purple-800"
                        : "bg-[#EBD1D1] text-rose-800"
                    )}
                  >
                    {iCard === 2 ? (
                      <Check className="size-4" />
                    ) : (
                      <X className="size-4" />
                    )}
                  </div>
                  {list}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
