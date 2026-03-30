import Link from "next/link";
import Image from "next/image";
import { FadeInUp } from "@/components/animations/fade-in-up";
import { HeroVideoReveal } from "@/components/home/hero/hero-video-reveal";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BriefcaseDollarIcon,
  Rocket02Icon,
  WorkflowCircle01Icon,
} from "@hugeicons/core-free-icons";


const aiModelStack = [
  { name: "hyperscaler", src: "/logo-without-text.png", },
  { name: "GPT", src: "/gpt.png", },
  { name: "Claude", src: "/claude.png", },
];

const heroHighlights = [
  { text: "2.3x faster campaign launches", icon: Rocket02Icon },
  { text: "Always-on AI execution", icon: WorkflowCircle01Icon },
  { text: "No agency overhead", icon: BriefcaseDollarIcon },
];


const Hero02 = () => {
  return (
    <section className="relative isolate mx-auto w-full overflow-hidden bg-[url('/hero-bg.svg')] bg-center bg-cover bg-white bg-no-repeat py-12 max-sm:px-6 lg:px-20 lg:py-36">
      <div className="-top-16 -left-8 pointer-events-none absolute h-56 w-56 rounded-full bg-fuchsia-300/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-8 h-64 w-64 rounded-full bg-violet-300/25 blur-3xl" />
      <div className="z-10 mx-auto max-w-[1480px] xl:px-20">
        <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 lg:gap-y-12">
          {/* Left Column: Text & CTA */}
          <div className="flex flex-col items-center justify-center text-center lg:col-span-2 lg:min-h-[calc(100dvh-5rem)]">
            {/* Pill tagline */}
            <FadeInUp delay={1}>
              <div className="mb-4 inline-flex w-fit items-center rounded-full border border-purple-200/75 bg-purple-50/30 px-4 py-2 font-medium">
                <div className="flex items-center gap-2 pr-3">
                  <div
                    aria-label="AI model stack"
                    className="relative flex items-center"
                  >
                    {aiModelStack.map((model, index) => (
                      <span
                        className={`-ml-2.5  bg-white inline-flex h-8 w-8 items-center justify-center rounded-full border border-white leading-none shadow-sm first:ml-0`}
                        key={model.name}
                        style={{ zIndex: aiModelStack.length - index }}
                        title={model.name}
                      >
                        <Image
                          alt={`${model.name} logo`}
                          className="h-6 w-6 object-contain rounded-full"
                          height={26}
                          src={model.src}
                          width={26}
                        />
                      </span>
                    ))}
                  </div>
                  <span className="font-medium text-[14px] text-purple-600 uppercase tracking-[0.08em] max-sm:text-[12px]">
                    AI Powered
                  </span>
                </div>
                <div className="h-6 w-px bg-purple-300/80" />
                <span className="pl-3 font-medium text-[14px] text-purple-600 max-sm:text-[12px]">
                  Growth & Development
                </span>
              </div>
            </FadeInUp>

            <h1 className="group flex max-w-6xl flex-wrap justify-center gap-x-3 gap-y-2 font-['Outfit'] font-medium text-6xl text-[#1A1A1A] leading-tight sm:text-7xl max-sm:text-4xl max-sm:leading-tight">
              {["Your", "Marketing", "on"].map((word, index) => (
                <FadeInUp
                  className="inline-block"
                  delay={0.1 + index * 0.1}
                  key={word}
                >
                  <span className="inline-block cursor-default transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:text-violet-700">
                    {word}
                  </span>
                </FadeInUp>
              ))}
              <FadeInUp className="inline-block" delay={0.1 + 3 * 0.1}>
                <span className="relative inline-block cursor-default bg-linear-to-r from-fuchsia-500 via-violet-600 to-fuchsia-500 bg-size-[200%_100%] bg-clip-text text-transparent transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] animate-headline-gradient">
                  Autopilot
                  <span className="-translate-x-1/2 pointer-events-none absolute -bottom-1 left-1/2 h-[3px] w-0 rounded-full bg-linear-to-r from-fuchsia-400 to-violet-600 transition-all duration-500 group-hover:left-0 group-hover:w-full group-hover:translate-x-0" />
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
              <p className="mt-5 max-w-3xl font-['Outfit'] font-normal text-xl text-gray-700 leading-8 max-sm:text-base">
                Run paid ads, outreach, and demand generation from one platform
                with clean human touch.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.9}>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {heroHighlights.map((item) => (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white/80 px-3 py-1.5 text-sm text-violet-700 backdrop-blur-xs"
                    key={item.text}
                  >
                    <HugeiconsIcon
                      className="text-violet-500"
                      icon={item.icon}
                      size={14}
                      strokeWidth={1.8}
                    />
                    {item.text}
                  </span>
                ))}
              </div>
            </FadeInUp>

            {/* Buttons */}
            <FadeInUp delay={1.1}>
              <div className="mt-10 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <Link className="w-full sm:w-auto" href="/chat">
                  <Button
                    className="h-13 w-full shadow-xl p-5! font-semibold sm:min-w-57"
                    size="custom"
                    variant="gradient"
                  >
                    <div className="flex items-center justify-center rounded-full bg-white p-1">
                      <Image
                        alt="Hyperscaler"
                        className="h-6 w-6 object-contain rounded-full"
                        height={100}
                        src="/logo-without-text.png"
                        width={100}
                      />
                    </div>
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
            <div className="pointer-events-none absolute -z-10 h-[420px] w-[78%] rounded-full bg-linear-to-r from-fuchsia-200/35 via-violet-200/35 to-cyan-200/35 blur-xl" />
            <HeroVideoReveal
              src={
                process.env.NEXT_PUBLIC_HERO_VIDEO_URL ??
                "/platform_overview_2.mp4"
              }
            />

            <div className="absolute top-8 left-2 z-20 hidden rounded-xl border border-violet-200 bg-white/90 px-4 py-2 text-left shadow-lg backdrop-blur-xs md:block">
              <p className="text-xs uppercase tracking-wide text-violet-500">
                Revenue Impact
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-900">+38%</p>
            </div>

            <div className="absolute right-3 bottom-8 z-20 hidden rounded-xl border border-fuchsia-200 bg-white/90 px-4 py-2 text-left shadow-lg backdrop-blur-xs md:block">
              <p className="text-xs uppercase tracking-wide text-fuchsia-500">
                Time Saved
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-900">12 hrs/wk</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero02;
