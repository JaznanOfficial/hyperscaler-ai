"use client";

import { useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FadeInUp } from "@/components/animations/fade-in-up";
import { Button } from "@/components/ui/button";

const MarketingTools = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.5, once: false });

  useEffect(() => {
    if (videoRef.current) {
      if (inView) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [inView]);

  const logos = [
    { src: "/marketing-tools/airtable.svg", left: 15, top: 10 },
    { src: "/marketing-tools/slack-connect.svg", left: 75, top: 15 },
    { src: "/marketing-tools/google-ads.svg", left: 80, top: 70 },
    { src: "/marketing-tools/facebook.svg", left: 10, top: 65 },
    { src: "/marketing-tools/linkedin.svg", left: 45, top: 80 },
  ];

  return (
    <section className="mx-auto w-full">
      <div
        className="relative flex h-80 w-full flex-col items-center justify-center gap-6 text-center lg:h-250"
        ref={containerRef}
      >
        <video
          className="absolute inset-0 -z-10 hidden h-full w-full rounded-2xl lg:block"
          controls={false}
          loop
          muted
          playsInline
          ref={videoRef}
          src={
            process.env.NEXT_PUBLIC_MARKETING_TOOLS_VIDEO_URL ??
            "/marketing-tools.mp4"
          }
        />
        <div className="absolute inset-0 -z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#F5F1FF] to-[#F0E8FF] lg:hidden">
          {logos.map((logo, index) => (
            <div
              className="absolute animate-pulse"
              key={index}
              style={{
                left: `${logo.left}%`,
                top: `${logo.top}%`,
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <img
                alt="marketing tool logo"
                height={60}
                src={logo.src}
                width={60}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-4">
          <FadeInUp delay={0}>
            <h2 className="font-['Outfit'] font-semibold text-[#111322] text-[32px]">
              30+ Marketing Tools,
              <br />
              One Platform
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Button
              asChild
              className="h-13 w-full p-5! font-semibold sm:min-w-57"
              size="lg"
              variant="gradient"
            >
              <Link href="/onboarding/book-a-demo" target="_blank">
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
                Book a Free Demo
              </Link>
            </Button>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};

export default MarketingTools;
