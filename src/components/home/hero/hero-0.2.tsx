import Image from "next/image";
import { Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero02 = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-20 lg:py-24">
      {/* Subtle purple gradient top-right */}
      <div
        className="pointer-events-none absolute -right-[20%] -top-[20%] h-[60%] w-[50%] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto flex w-11/12 flex-col items-center lg:w-10/12">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          {/* Left Side: Text and Button */}
          <div className="flex flex-col justify-center">
            {/* Pill tagline */}
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#9F7AEA] bg-[#F5F3FF] px-4 py-2">
              <Sparkles className="h-4 w-4 text-[#7B3EDC]" />
              <span className="text-[14px] font-semibold text-[#7B3EDC]">
                AI-Powered Growth & Development Platform
              </span>
            </div>

            <h3 className="text-[48px] font-bold leading-tight text-[#1A1A1A] md:text-[56px] lg:text-[64px]">
              Your Marketing on Autopilot
            </h3>

            {/* Quoted tagline */}
            <div className="mt-4 flex gap-2 rounded-[12px] border border-[#E0E0E0] bg-white px-5 py-4">
              <span className="shrink-0 text-[28px] font-bold leading-none text-[#7B3EDC] md:text-[32px]">"</span>
              <p className="text-[20px] font-semibold leading-snug text-[#7B3EDC] md:text-[24px]">
                Generate Leads and Scale Marketing Without Agencies or Extra Teams.
              </p>
            </div>

            <p className="mt-4 text-[16px] font-normal leading-relaxed text-[#555555] md:text-[18px]">
              AI-powered growth systems that run paid ads, outreach, and demand generation
              from one platform with clean human touch.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <Button className="h-[48px] gap-2 rounded-[8px] bg-gradient-to-r from-[#6C3EE8] to-[#E348A7] px-6 text-[16px] font-semibold text-white hover:opacity-95">
                <Sparkles className="h-4 w-4" />
                Talk to hyperscale
              </Button>
              <Button
                variant="outline"
                className="h-[48px] gap-2 rounded-[8px] border-[#D1D5DB] bg-white px-6 text-[16px] font-semibold text-[#1A1A1A] hover:bg-gray-50"
              >
                <Play className="h-4 w-4 fill-current" />
                View Demo
              </Button>
            </div>
          </div>

          {/* Right Side: Full Image */}
          <div className="relative h-full w-full">
            <Image
              src="/hero-right.png"
              alt="Marketing Autopilot Dashboard"
              width={600}
              height={400}
              className="w-full rounded-[20px] object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero02;