import { Sparkles } from "lucide-react";
import Link from "next/link";
import { FadeInUp } from "@/components/animations/fade-in-up";
import { HeroVideoReveal } from "@/components/home/hero/hero-video-reveal";
import { Button } from "@/components/ui/button";

const Hero02 = () => {
  return (
    <section className="relative mx-auto w-full overflow-hidden bg-[url('/hero-bg.svg')] bg-center bg-cover bg-white bg-no-repeat py-10 max-sm:px-6 lg:px-20 lg:py-40">
      <div className="z-10 mx-auto max-w-[1480px] xl:px-20">
        <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 lg:gap-y-12">
          {/* Left Column: Text & CTA */}
          <div className="flex flex-col items-center text-center lg:col-span-2">
            {/* Pill tagline */}
            <FadeInUp delay={1}>
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-purple-200/75 bg-purple-50/30 px-4 py-2 font-medium">
                <Sparkles className="h-4 w-4 text-purple-600" strokeWidth={2} />
                <span className="font-medium text-[14px] text-purple-600 max-sm:text-[12px]">
                  AI-Powered Growth & Development Platform
                </span>
              </div>
            </FadeInUp>

            <h1 className="flex flex-wrap justify-center gap-x-3 gap-y-2 font-['Outfit'] font-medium text-7xl text-[#1A1A1A] leading-tight max-sm:text-4xl max-sm:leading-tight">
              {["Your", "Marketing", "on"].map((word, index) => (
                <FadeInUp
                  className="inline-block"
                  delay={0.1 + index * 0.1}
                  key={word}
                >
                  <span>{word}</span>
                </FadeInUp>
              ))}
              <FadeInUp className="inline-block" delay={0.1 + 3 * 0.1}>
                <span className="bg-linear-to-r from-fuchsia-500 to-violet-800 bg-clip-text text-transparent">
                  Autopilot
                </span>
              </FadeInUp>
            </h1>

            {/* Quoted tagline */}
            {/* <div className="mt-6 flex gap-2 rounded-2xl border border-[#E0E0E0] bg-white px-5 py-4 shadow-[0px_2px_4px_0px_rgba(158,50,221,0.08)] max-sm:mx-auto">
              <Quote
                className="shrink-0 rotate-180 text-purple-600"
                fill="currentColor"
                size={20}
                strokeWidth={2.2}
              />
              <p className="font-['Outfit'] font-medium text-purple-600 text-xl leading-6 max-sm:text-base">
                Generate Leads and Scale Marketing Without Agencies or Extra
                Teams.
              </p>
            </div> */}

            <FadeInUp delay={0.7}>
              <p className="mt-5 max-w-2xl font-['Outfit'] font-normal text-2xl text-gray-700 leading-7 max-sm:text-base">
                Run paid ads, outreach, and demand generation from one platform
                with clean human touch.
              </p>
            </FadeInUp>

            {/* Buttons */}
            <FadeInUp delay={1.1}>
              <div className="mt-10 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <Link className="w-full sm:w-auto" href="/chat">
                  <Button
                    className="h-13 w-full p-5! font-semibold sm:min-w-57"
                    size="lg"
                    variant="gradient"
                  >
                    <Sparkles
                      className="h-6 w-6"
                      fill="white"
                      strokeWidth={2}
                      style={{ transform: "scaleX(-1)" }}
                    />
                    <span>Talk to Hyperscaler</span>
                  </Button>
                </Link>
                {/* <Button
                className="h-[46px] w-full font-semibold sm:w-[228px]"
                size="lg"
                variant="outline"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.75 2.25L14.25 9L3.75 15.75V2.25Z"
                    stroke="#515A65"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                View Demo
              </Button> */}
              </div>
            </FadeInUp>
          </div>

          {/* Right Column: Video + Floating Images */}
          <div className="relative flex w-full items-center justify-center lg:col-span-2">
            <HeroVideoReveal
              src={
                process.env.NEXT_PUBLIC_HERO_VIDEO_URL ??
                "/platform_overview_2.mp4"
              }
            />

            {/* Top-left floating image */}
            {/* <Image
              alt="Total Spend - $5,000"
              className="absolute top-0 left-0 z-20 h-[140px] w-[160px] object-contain max-md:top-2 max-md:left-2 max-md:h-[100px] max-md:w-[120px]"
              height={140}
              src="/spend_distribution.png"
              style={{
                animation: "float 3s ease-in-out infinite",
              }}
              width={160}
            /> */}

            {/* Bottom-right floating image */}
            {/* <Image
              alt="Bugs Closed vs Opened"
              className="absolute right-0 bottom-0 z-20 h-[140px] w-[220px] object-contain max-md:right-2 max-md:bottom-2 max-md:h-[100px] max-md:w-[140px]"
              height={140}
              src="/chart_interaction.png"
              style={{
                animation: "float 3.5s ease-in-out 0.5s infinite",
              }}
              width={220}
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero02;
