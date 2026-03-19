import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/section-header";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="relative mt-[100px] max-sm:mt-20 overflow-hidden bg-[#9E32DD]/10">
      <div className="my-container flex flex-col items-center justify-center gap-4 py-10 md:gap-6 md:py-12 lg:py-16">
        <div className="inline-flex items-center rounded-full border border-purple-600 bg-white px-2.5 py-1.5 font-medium text-[#9E32DD] max-md:text-lg md:px-4 md:py-2">
          <Sparkles className="mr-2 size-3" /> Start scaling today
        </div>
        <SectionHeader
          description="Start with one service or talk to our team for enterprise plan"
          titlePart1="Ready to scale without the chaos?"
        />

        <div className="mt-4 flex items-center justify-center gap-5">
          <Link href={"/login"}>
            <Button className="custom" size="custom" variant={"gradient"}>
              Get Stated <ArrowRight className="size-4" />
            </Button>
          </Link>
          <TalkToSalesDrawer buttonClassName="h-[46px] w-full bg-white font-semibold sm:w-[228px] hover:bg-gray-50"  buttonVariant={"outline"} />
        </div>
      </div>

      {/* designs */}
      <div className="absolute -top-16 -left-16 aspect-square size-[150px] rounded-full bg-[#9E32DD] opacity-10 sm:-top-32 sm:-left-32 sm:size-[220px] md:size-[300px]" />
      <div className="absolute -right-16 -bottom-16 aspect-square size-[150px] rounded-full bg-[#9E32DD] opacity-10 sm:-right-32 sm:-bottom-32 sm:size-[220px] md:size-[300px]" />
    </section>
  );
};

export default CallToAction;
