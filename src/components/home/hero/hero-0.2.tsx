import { Play, Quote, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Hero02 = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Subtle purple gradient top-right */}
      {/* <div
        className="pointer-events-none absolute -top-[20%] -right-[20%] h-[60%] w-[50%] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
        }}
      /> */}

      <div className="pointer-events-none absolute right-4 bottom-0 z-0 h-72 w-72 -translate-y-1/2 rounded-[999px] bg-linear-to-l from-fuchsia-500 via-violet-600 to-transparent blur-[220px] md:top-2/5 md:right-1/5 md:h-100 md:w-100" />

      <div className="relative z-10 mx-auto flex w-11/12 flex-col items-center lg:w-10/12">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          {/* Left Side: Text and Button */}
          <div className="flex flex-col justify-center">
            {/* Pill tagline */}
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-neutral-300 bg-purple-50 px-4 py-2">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="font-semibold text-lg text-purple-500">
                AI-Powered Growth & Development Platform
              </span>
            </div>

            <h3 className="font-['Outfit'] font-medium text-5xl text-[#1A1A1A] leading-14">
              Your Marketing on Autopilot
            </h3>

            {/* Quoted tagline */}
            <div className="mt-4 flex gap-2 rounded-2xl border border-[#E0E0E0] bg-white px-5 py-4 shadow-[0px_2px_4px_0px_rgba(158,50,221,0.08)]">
              <Quote
                className="shrink-0 rotate-180 text-purple-600"
                fill="currentColor"
                size={20}
                strokeWidth={2.2}
                style={{ transformOrigin: "center", translate: "0 -0.25rem" }}
              />
              <p className="font-['Outfit'] font-medium text-purple-500 text-xl leading-6">
                Generate Leads and Scale Marketing Without Agencies or Extra
                Teams.
              </p>
            </div>

            <p className="mt-4 font-['Outfit'] font-normal text-gray-600 text-xl leading-7">
              AI-powered growth systems that run paid ads, outreach, and demand
              generation from one platform with clean human touch.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <Link href="/chat">
                <Button className="md:w-48" size="lg" variant={"gradient"}>
                  <Sparkles className="h-4 w-4" />
                  Talk to Hyperscaler
                </Button>
              </Link>
              <Button className="md:w-48" size={"lg"} variant="outline">
                <Play className="h-4 w-4" />
                View Demo
              </Button>
            </div>
          </div>

          {/* Right Side: Full Image */}
          <div className="relative h-full w-full">
            <Image
              alt="Marketing Autopilot Dashboard"
              className="relative z-10 w-full rounded-4xl object-cover object-center"
              height={320}
              src="/hero-right.png"
              width={480}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero02;
