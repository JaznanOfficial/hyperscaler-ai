"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const sharedSizeClass = "size-[168px] md:size-[192px] lg:size-[216px]";
const sharedIconClass =
  "h-[92px] w-[92px] md:h-[104px] md:w-[104px] lg:h-[120px] lg:w-[120px]";

const toolIcons = [
  {
    id: "instagram",
    src: "/marketing-tools/instagram.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
  },
  {
    id: "x",
    src: "/marketing-tools/x.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
  },
  {
    id: "slack",
    src: "/marketing-tools/slack-connect.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
  },
  {
    id: "airtable",
    src: "/marketing-tools/airtable.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
  },
  {
    id: "google-ads",
    src: "/marketing-tools/google-ads.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
  },
  {
    id: "youtube",
    src: "/marketing-tools/youtube.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
  },
  {
    id: "facebook",
    src: "/marketing-tools/facebook.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
  },
  {
    id: "linkedin",
    src: "/marketing-tools/linkedin.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
  },
  {
    id: "telegram",
    src: "/marketing-tools/telegram.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
  },
  {
    id: "reddit",
    src: "/marketing-tools/reddit.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
  },
  {
    id: "miro",
    src: "/marketing-tools/miro.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
  },
  {
    id: "n8n",
    src: "/marketing-tools/n8n.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
  },
  {
    id: "bolt",
    src: "/marketing-tools/bolt.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
  },
  {
    id: "mainchimp",
    src: "/marketing-tools/mainchimp.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
  },
  {
    id: "purplexity",
    src: "/marketing-tools/purplexity.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
  },
  {
    id: "openclaw",
    src: "/marketing-tools/openclaw.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
  },
  {
    id: "replit",
    src: "/marketing-tools/replit.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
  },
];

const MarketingTools = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const inView = useInView(containerRef, { amount: 0.25, once: false });
  const iconCount = toolIcons.length;

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="mx-auto w-full max-w-[1480px] px-20 py-20 max-sm:px-6 lg:py-36">
      <div
        className="relative mx-auto flex min-h-[360px] max-w-4xl flex-col items-center justify-center gap-6 px-10 py-16 text-center"
        ref={containerRef}
      >
        {toolIcons.map((icon, index) => {
          const angle = (index / iconCount) * Math.PI * 2;
          const maxHalf =
            containerWidth < 640 ? 70 : containerWidth < 1024 ? 90 : 110;
          const baseRadius = Math.max(120, containerWidth / 2 - maxHalf);
          const ringSpacing =
            containerWidth < 640 ? 18 : containerWidth < 1024 ? 26 : 34;
          const radius = baseRadius + (index % 3) * ringSpacing;
          const outerRadius =
            radius +
            (containerWidth < 640 ? 220 : containerWidth < 1024 ? 320 : 420);
          const sizeScale =
            containerWidth < 640 ? 0.5 : containerWidth < 1024 ? 0.7 : 0.85;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const outerX = Math.cos(angle) * outerRadius;
          const outerY = Math.sin(angle) * outerRadius;

          return (
            <motion.div
              animate={
                inView
                  ? { opacity: 1, scale: sizeScale, x, y }
                  : { opacity: 0, scale: sizeScale * 0.8, x: outerX, y: outerY }
              }
              className={`absolute top-1/2 left-1/2 flex items-center justify-center ${icon.sizeClass}`}
              initial={{
                opacity: 0,
                scale: sizeScale * 0.8,
                x: outerX,
                y: outerY,
              }}
              key={icon.id}
              transition={{
                type: "spring",
                damping: 18,
                stiffness: 140,
              }}
            >
              <Image
                alt=""
                className={icon.iconClass}
                height={72}
                src={icon.src}
                width={72}
              />
            </motion.div>
          );
        })}

        <div className="flex flex-col items-center gap-4">
          <h2 className="font-['Outfit'] font-semibold text-[#111322] text-[32px]">
            30+ Marketing Tools,
            <br />
            One Platform
          </h2>
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
              Book a Free Growtyh Session
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MarketingTools;
