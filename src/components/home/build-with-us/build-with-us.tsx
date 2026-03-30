import { CodeXml } from "lucide-react";
import Image from "next/image";
import { FadeInUp } from "@/components/animations/fade-in-up";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";
import { Button } from "@/components/ui/button";

const BuildWithUsSection = () => {
  return (
    <section className="mx-auto w-full max-w-[1480px] px-20 py-[150px] max-sm:px-6 max-sm:py-20">
      <div className="relative mt-20 flex items-center justify-center gap-10 max-sm:flex-col-reverse">
        <div className="pointer-events-none absolute right-0 bottom-16 -z-10 h-72 w-72 rounded-[999px] bg-linear-to-l from-fuchsia-500 via-violet-600 to-transparent blur-[220px]" />
        {/* Left Side: Text and Button */}
        <div className="flex h-full w-1/2 flex-col justify-center gap-2 max-sm:w-full">
          <FadeInUp delay={0}>
            <div className="font-['Outfit'] font-semibold text-purple-600 text-xl max-sm:text-xl">
              Build with us
            </div>
          </FadeInUp>
          <div className="flex flex-col gap-3">
            <FadeInUp delay={0.1}>
              <p className="font-['Outfit'] font-medium text-3xl text-[#111111] leading-[48px] max-sm:text-2xl max-sm:leading-[23px] sm:text-3xl md:text-4xl">
                Launch, develop or automate
              </p>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="font-['Outfit'] font-normal text-gray-600 text-lg leading-8 max-sm:text-[12px] max-sm:leading-[18px]">
                Eliminate manual work, build clear milestones and Bring your
                product idea to life with a structured roadmap.
              </p>
            </FadeInUp>
          </div>

          {/* Button */}
          <FadeInUp delay={0.3}>
            <div>
              <TalkToSalesDrawer
                buttonLabel="Book a free growth session"
                trigger={
                  <Button
                    className="h-13 w-fit p-5! font-semibold sm:min-w-57"
                    size="lg"
                    variant={"gradient"}
                  >
                    <CodeXml className="size-4" />
                    Talk to our developers
                  </Button>
                }
              />
            </div>
          </FadeInUp>
        </div>

        {/* Right Side: Image */}
        <FadeInUp delay={0.2}>
          <Image
            alt="Build With Us"
            className="h-auto "
            height={600}
            src="/Build-With-Us.webp"
            width={600}
            priority
            quality={100}
          />
        </FadeInUp>
      </div>
    </section>
  );
};

export default BuildWithUsSection;
