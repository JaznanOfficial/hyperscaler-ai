import { TrendingUp } from "lucide-react";
import Image from "next/image";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";
import { Button } from "@/components/ui/button";

const LeadGenerationSection = () => {
  return (
    <section className="w-full py-16">
      <div className="mx-auto flex w-11/12 flex-col items-center lg:w-10/12">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          {/* Left Side: Text and Button */}
          <div className="flex flex-col justify-center">
            <div className="font-['Outfit'] font-semibold text-purple-600 text-xl">
              Generate leads
            </div>
            <div className="flex flex-col gap-3.5">
              <p className="font-['Outfit'] font-medium text-3xl text-[#111111] leading-[48px] sm:text-3xl md:text-4xl">
                Target Your ICP Lookalikes with AI-Powered Outreach
              </p>
              <p className="font-['Outfit'] font-normal text-gray-600 text-xl leading-8">
                Automate cold email, LinkedIn, and cold calling to generate
                qualified leads 24/7 on autopilot.
              </p>
            </div>

            {/* Button */}
            <TalkToSalesDrawer
              buttonLabel="Book a free growth session"
              trigger={
                <Button className="mt-5 w-fit" variant={"gradient"}>
                  <TrendingUp className="size-4" />
                  Book a free growth session
                </Button>
              }
            />
          </div>

          {/* Right Side: Image */}
          <div className="relative h-full w-full">
            <Image
              alt="Lead Generation" // Place the image in the public folder
              className="rounded-[20px] object-cover"
              height={600}
              src="/generate_leads.png"
              width={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadGenerationSection;
