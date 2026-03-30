import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const content = [
  {
    img: "/how-it-works/frame-1.png",
    title: "Discover",
    description: "AI understands your goal",
  },
  {
    img: "/how-it-works/frame-2.png",
    title: "Choose",
    description: "Pick what fits your growth",
  },
  {
    img: "/how-it-works/frame-3.png",
    title: "Track",
    description: "Real-time visibility",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative mx-auto flex w-11/12 flex-col items-center justify-center gap-8 py-10 md:gap-10 md:py-12 lg:w-10/12 lg:gap-13 lg:py-16">
      <SectionHeader
        description="No learning curve. No hiring. No waiting."
        gradientTitle="idea to execution"
        titlePart1="From"
        titlePart3="— in three steps"
      />

      <div className="relative z-10 grid w-full grid-cols-1 items-stretch justify-between gap-6 md:gap-8 lg:grid-cols-3">
        {content.map((item, i) => (
          <div className="z-10 flex flex-col gap-6 md:gap-8" key={i}>
            <div className="flex min-h-50 w-full items-center justify-center md:min-h-55 lg:min-h-58.5">
              <Image
                alt={item.title}
                className={cn(
                  "h-auto w-full object-contain lg:max-w-83.5",
                  i === 1 ? "lg:h-[167px]" : "lg:h-[252px]"
                )}
                height={234}
                src={item.img}
                width={270}
              />
            </div>
            {/* body */}
            <div className="flex flex-col items-center justify-center gap-2 text-center md:gap-[6px]">
              <div className="flex aspect-square size-7 items-center justify-center rounded-full bg-purple-600 text-white text-xs md:text-sm">
                {i + 1}
              </div>
              <h3 className="font-medium text-[#1A1A1A] text-sm md:text-base lg:text-lg">
                {item.title}
              </h3>
              <p className="max-w-[220px] text-[#666666] text-xs md:text-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 z-0 hidden h-1 w-3/4 -translate-x-1/2 -translate-y-1/3 rounded-full bg-purple-500 lg:top-1/3 lg:left-1/2 lg:block" />
      </div>
      <Link href={"/services"}>
        <Button
          className="h-13 w-full p-5! font-semibold sm:min-w-57"
          size="lg"
          variant={"gradient"}
        >
          Get Started <ArrowRight className="size-4" />
        </Button>
      </Link>

      {/* designs */}
      <div className="absolute top-24 right-0 aspect-square size-[200px] rounded-full bg-linear-to-r from-[#5B21B6] to-[#D946EF] opacity-20 blur-[160px] md:opacity-40 lg:opacity-70" />
    </section>
  );
};

export default HowItWorks;
