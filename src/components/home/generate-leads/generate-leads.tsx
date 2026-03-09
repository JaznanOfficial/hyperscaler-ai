import Image from "next/image";
import { Button } from "@/components/ui/button";

const LeadGenerationSection = () => {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24">
      <div className="mx-auto flex w-11/12 flex-col items-center lg:w-10/12">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          {/* Left Side: Text and Button */}
          <div className="flex flex-col justify-center">
            <h3 className="text-[28px] font-semibold text-[#111111] md:text-[32px]">
              Target Your ICP Lookalikes with AI-Powered Outreach
            </h3>
            <p className="mt-4 text-[16px] text-[#6B7280] md:text-[18px]">
              Automate cold email, LinkedIn, and cold calling to generate qualified leads
              24/7 on autopilot.
            </p>

            {/* Button */}
            <Button className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#D946EF] text-white px-6 py-3 rounded-md hover:opacity-90">
              Book a Free Growth Session
            </Button>
          </div>

          {/* Right Side: Image */}
          <div className="relative h-full w-full">
            <Image
              src="/generate_leads.png" // Place the image in the public folder
              alt="Lead Generation"
              width={600}
              height={400}
              className="rounded-[20px] object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default LeadGenerationSection;