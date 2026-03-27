import Image from "next/image";
import { FadeInUp } from "@/components/animations/fade-in-up";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";
import { Button } from "@/components/ui/button";

const LeadGenerationSection = () => {
  return (
    <section className="mx-auto w-full max-w-[1480px] px-20 pt-[150px] max-sm:px-6 max-sm:pt-20">
      <div className="flex items-center justify-center gap-22 max-sm:flex-col-reverse">
        {/* Left Side: Text and Button */}
        <div className="flex h-full w-full flex-col justify-center gap-3">
          <FadeInUp delay={0}>
            <div className="font-['Outfit'] font-semibold text-2xl text-purple-600 max-sm:text-xl">
              Generate leads
            </div>
          </FadeInUp>
          <div className="flex flex-col gap-3">
            <FadeInUp delay={0.1}>
              <p className="mt-[8px] font-['Outfit'] font-normal text-3xl text-[#111111] leading-[48px] max-sm:mt-px max-sm:text-2xl max-sm:leading-[23px] sm:text-3xl md:text-5xl">
                Target Your ICP Lookalikes with AI-Powered Outreach
              </p>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="mt-[14px] font-['Outfit'] font-normal text-gray-600 text-lg leading-8 max-sm:mt-px max-sm:text-[12px] max-sm:leading-[18px]">
                Automate cold email, LinkedIn, and cold calling to generate
                qualified leads 24/7 on autopilot.
              </p>
            </FadeInUp>
          </div>

          {/* Button */}
          <FadeInUp delay={0.3}>
            <TalkToSalesDrawer
              buttonLabel="Book a free growth session"
              trigger={
                <Button className="w-fit" size="lg" variant={"gradient"}>
                  <svg
                    fill="none"
                    height="18"
                    viewBox="0 0 18 18"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 5.25L10.125 11.625L6.375 7.875L1.5 12.75"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                    <path
                      d="M12 5.25H16.5V9.75"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  Book a free growth session
                </Button>
              }
            />
          </FadeInUp>
        </div>

        {/* Right Side: Image */}
        <FadeInUp delay={0.2}>
          <div className="relative h-full w-full items-center justify-center">
            <Image
              alt="Lead Generation"
              className="z-10 rounded-[20px]"
              height={800}
              src="/generate-leads.svg"
              width={800}
            />
            <div className="pointer-events-none absolute bottom-8 -z-10 h-72 w-72 rounded-[999px] bg-linear-to-l from-fuchsia-500 via-violet-600 to-transparent blur-[220px]" />
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

export default LeadGenerationSection;
