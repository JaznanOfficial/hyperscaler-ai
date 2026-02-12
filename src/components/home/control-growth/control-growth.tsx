import { Phone } from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";

const ControlGrowth = () => {
  return (
    <section className="relative mx-auto flex w-11/12 flex-col items-center justify-center gap-8 py-10 md:gap-10 md:py-12 lg:w-10/12 lg:gap-13 lg:py-16">
      <SectionHeader
        description="Track progress, subscriptions, and AI updates in real time."
        gradientTitle="growth and operations"
        titlePart1="Control the"
        titlePart3="of your business through one powerful dashboard."
      />

      <div className="relative z-10 w-full max-w-261.25">
        <Image
          alt="Control Growth"
          className="h-auto w-full"
          height={846}
          src="/control-growth.png"
          width={1045}
        />
      </div>

      <Button className="relative z-10 w-fit" variant={"gradient"}>
        <Phone className="size-4" /> Talk to Us
      </Button>

      {/* designs */}
      <div className="absolute top-40 left-10 aspect-square size-[308px] rounded-full bg-linear-to-r from-[#5B21B6] to-[#D946EF] opacity-20 blur-[140px] sm:left-16 md:left-20 md:opacity-40 lg:opacity-70" />
      <div className="absolute top-1/2 -left-10 aspect-square size-[308px] -translate-y-1/2 rounded-full bg-linear-to-r from-[#5B21B6] to-[#D946EF] opacity-20 blur-[140px] sm:-left-16 md:-left-20 md:opacity-40" />
      <div className="absolute top-1/2 right-10 aspect-square size-[308px] -translate-y-1/2 rounded-full bg-linear-to-r from-[#5B21B6] to-[#D946EF] opacity-30 blur-[140px] sm:right-16 md:right-20" />
    </section>
  );
};

export default ControlGrowth;
