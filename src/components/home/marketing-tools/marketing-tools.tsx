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

  return (
    <section className="mx-auto w-full">
      <div
        className="relative flex h-80 w-full flex-col items-center justify-center gap-6 text-center lg:h-250"
        ref={containerRef}
      >
        <video
          className="absolute inset-0 -z-10 h-full w-full rounded-2xl"
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
        <div className="flex flex-col items-center gap-4">
          <FadeInUp delay={0}>
            <h2 className="font-['Outfit'] font-semibold text-[#111322] text-[32px]">
              30+ Marketing Tools,
              <br />
              One Platform
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Button asChild className="px-6! py-5!" variant="gradient">
              <Link
                href="https://calendly.com/ujjwalroy1/hyperscaler-scale-your-build"
                target="_blank"
              >
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
