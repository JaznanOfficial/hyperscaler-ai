import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const scaleServices = {
  title: "Scale",
  description: "Acquire, grow, and convert with AI-driven marketing",
  cards: [
    {
      title: "Paid Ads",
      desc: "Launch, optimize, and scale paid campaigns with full visibility on spend, performance, and ROI.",
      charge: "$500",
      img: "/build-and-scale/s-chart-1.png",
    },
    {
      title: "Cold Email Campaign",
      desc: "Generate leads and boost sales with targeted cold email campaigns. Maximize your outreach with our expert solutions.,",
      charge: "$500",
      img: "/build-and-scale/s-chart-2.png",
    },
    {
      title: "Social Media Marketing",
      desc: "Elevate your brand with strategic social media campaigns. Maximize engagement, expand your reach, drive measurable results.",
      charge: "$500",
      img: "/build-and-scale/s-chart-3.png",
    },
    {
      title: "Branding & Content Creation",
      desc: "Create engaging content that resonates with your brand authority, drives demand and builds presence.",
      charge: "$500",
      img: "/build-and-scale/s-chart-4.png",
    },
    {
      title: "Cold LinkedIn Outreach",
      desc: "Connect and engage with your target audience on LinkedIn. Drive conversations and grow your professional network.",
      charge: "$500",
      img: "/build-and-scale/s-chart-5.png",
    },
    {
      title: "Cold Calling",
      desc: "Drive consistent meetings through structured cold calling with clear insights into conversations, outcomes, and conversions.",
      charge: "$500",
      img: "/build-and-scale/s-chart-6.png",
    },
  ],
};

const buildServices = {
  title: "Build",
  description: "Design, develop, and automate with confidence",
  cards: [
    {
      img: "/build-and-scale/b-chart-1.png",
      title: "SaaS Product Development",
      desc: "Build scalable SaaS products with clear milestones, predictable delivery, and full visibility into progress.",
    },
    {
      img: "/build-and-scale/b-chart-2.png",
      title: "AI-Powered Product Development",
      desc: "Turn AI ideas into production-ready products with structured development and measurable progress.",
    },
    {
      img: "/build-and-scale/b-chart-3.png",
      title: "Android & IOS Mobile Apps",
      desc: "Launch high-quality mobile apps with smooth performance and consistent updates across platforms.",
    },
    {
      img: "/build-and-scale/b-chart-4.png",
      title: "Workflow & Automation",
      desc: "Eliminate manual work with automated workflows designed for efficiency, accuracy, and scale.",
    },
    {
      img: "/build-and-scale/b-chart-5.png",
      title: "Enterprise Tools",
      desc: "Develop robust enterprise systems built for scale, security, and long-term reliability.",
    },
    {
      img: "/build-and-scale/b-chart-6.png",
      title: "Startup Product & IP",
      desc: "Bring your product idea to life with a structured roadmap from MVP to market-ready IP.",
    },
  ],
};

const BuildAndScale = () => {
  return (
    <section className="relative mx-auto flex w-11/12 flex-col items-center justify-center gap-8 py-10 md:gap-10 md:py-12 lg:w-10/12 lg:py-16">
      {/* section header */}
      <div className="z-10 text-center">
        <h2 className="font-medium text-2xl text-[#1A1A1A] leading-[1.4] tracking-[0] sm:text-[28px] md:text-[32px]">
          Everything you need to
          <span className="bg-linear-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            {" "}
            Build{" "}
          </span>
          and{" "}
          <span className="bg-linear-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            {" "}
            Scale{" "}
          </span>
          — in one platform
        </h2>

        <p className="mt-2 font-normal text-[#515A65] text-sm leading-[1.4] tracking-[0] sm:text-base">
          From idea to growth, we&apos;ve got every stage covered with
          AI-powered execution
        </p>
      </div>

      {/* section body */}
      <div className="relative z-10 flex flex-col gap-[52px]">
        {/* scale cards */}
        <div className="space-6 md:space-y-9">
          {/* header */}
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="">
              <h3 className={cn("font-['Outfit']", "font-semibold text-2xl")}>
                {scaleServices.title}
              </h3>
              <p className="text-[#515A65]">{scaleServices.description}</p>
            </div>
            <Link
              className="flex items-center gap-2 font-semibold text-[#9E32DD] underline-offset-2 hover:underline"
              href="/services"
            >
              View all services <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {scaleServices.cards.map((card, index) => (
              <div
                className="relative space-y-2 rounded-2xl border border-[#D1D1D1] bg-[#F5F5F5] p-4 md:p-6"
                key={index}
              >
                <h5 className={cn("font-['Outfit']", "font-semibold text-xl")}>
                  {card.title}
                </h5>
                <p className="text-[#515A65]">{card.desc}</p>
                <p className="text-[#515A65]">
                  <span
                    className={cn(
                      "font-['Outfit']",
                      "font-bold text-2xl text-black"
                    )}
                  >
                    {card.charge}
                  </span>{" "}
                  /month
                </p>

                <Link
                  className="mt-5 flex items-center gap-2 font-semibold text-[#9E32DD] underline-offset-2 hover:underline"
                  href="#"
                >
                  View Details <ArrowRight className="size-4" />
                </Link>

                <Image
                  alt={card.title}
                  className="absolute right-4 bottom-0 h-auto w-full max-w-28 object-contain md:max-w-40"
                  height={64}
                  src={card.img}
                  width={163}
                />
              </div>
            ))}
          </div>
        </div>

        {/* build cards */}
        <div className="space-6 md:space-y-9">
          {/* header */}
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="">
              <h3 className={cn("font-['Outfit']", "font-semibold text-2xl")}>
                {buildServices.title}
              </h3>
              <p className="text-[#515A65]">{buildServices.description}</p>
            </div>
            <Link
              className="flex items-center gap-2 font-semibold text-[#9E32DD] underline-offset-2 hover:underline"
              href="/services"
            >
              View all services <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {buildServices.cards.map((card, index) => (
              <div
                className="relative space-y-2 rounded-2xl border border-[#D1D1D1] bg-[#F5F5F5] p-4 md:p-6"
                key={index}
              >
                <h5 className={cn("font-['Outfit']", "font-semibold text-xl")}>
                  {card.title}
                </h5>
                <p className="text-[#515A65]">{card.desc}</p>

                <Link
                  className="mt-5 flex items-center gap-2 font-semibold text-[#9E32DD] underline-offset-2 hover:underline"
                  href="#"
                >
                  Talk to Us <ArrowRight className="size-4" />
                </Link>

                <Image
                  alt={card.title}
                  className="absolute right-4 bottom-0 h-auto w-full max-w-24 object-contain md:max-w-36"
                  height={64}
                  src={card.img}
                  width={163}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* designs */}
      <div className="absolute right-10 bottom-0 aspect-square size-[200px] rounded-full bg-linear-to-r from-[#5B21B6] to-[#D946EF] opacity-20 blur-[140px] sm:right-16 md:right-20 md:opacity-40 lg:opacity-70" />
    </section>
  );
};

export default BuildAndScale;
