import { TrendingUp } from "lucide-react";
import Image from "next/image";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";
import { Button } from "@/components/ui/button";

const LeadGenerationSection = () => {
  return (
    <section className="w-full pt-[150px] max-w-[1480px] mx-auto max-sm:pt-20 px-20 max-sm:px-6">
      <div className="   flex justify-center items-center  max-sm:flex-col-reverse gap-22">
        {/* Left Side: Text and Button */}
        <div className="flex flex-col justify-center w-full h-full">
          <div className="font-['Outfit'] font-semibold text-2xl text-purple-600 max-sm:text-xl">
            Generate leads
          </div>
          <div className="flex flex-col gap-3.5">
            <p className="font-['Outfit'] mt-[8px] max-sm:text-2xl max-sm:leading-[23px] max-sm:mt-px font-normal text-3xl text-[#111111] leading-[48px] sm:text-3xl md:text-5xl">
              Target Your ICP Lookalikes with AI-Powered Outreach
            </p>
            <p className="font-['Outfit'] max-sm:text-[12px] mt-[14px] max-sm:leading-[18px] max-sm:mt-px font-normal text-gray-600 text-lg leading-8">
              Automate cold email, LinkedIn, and cold calling to generate
              qualified leads 24/7 on autopilot.
            </p>
          </div>

          {/* Button */}
          <TalkToSalesDrawer
            buttonLabel="Book a free growth session"
            trigger={
              <Button className="mt-5 w-fit" size="lg" variant={"gradient"}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 5.25L10.125 11.625L6.375 7.875L1.5 12.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 5.25H16.5V9.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                Book a free growth session
              </Button>
            }
          />
        </div>

        {/* Right Side: Image */}
        <div className="relative w-full h-full items-center justify-center">
          <Image
            alt="Lead Generation" // Place the image in the public folder
            className="rounded-[20px] z-10"
            height={800}
            src="/generate-leads.svg"
            width={800}
          />
          <div className="pointer-events-none absolute  bottom-8 -z-10   h-72 w-72  rounded-[999px] bg-linear-to-l from-fuchsia-500 via-violet-600 to-transparent blur-[220px] " />
        </div>
      </div>
    </section>
  );
};

export default LeadGenerationSection;
