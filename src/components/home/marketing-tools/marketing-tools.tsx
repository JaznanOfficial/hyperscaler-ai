"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const sharedSizeClass = "size-[112px] md:size-[128px] lg:size-[216px]";
const sharedIconClass =
  "h-[61px] w-[61px] md:h-[69px] md:w-[69px] lg:h-[120px] lg:w-[120px]";

const getSizeScale = (width: number) => {
  if (width < 640) {
    return 0.5;
  }
  if (width < 1024) {
    return 0.7;
  }
  return 0.85;
};

const getMaxHalf = (width: number) => {
  if (width < 640) {
    return 70;
  }
  if (width < 1024) {
    return 90;
  }
  return 110;
};

const getOuterRadiusDelta = (width: number) => {
  if (width < 640) {
    return 160;
  }
  if (width < 1024) {
    return 220;
  }
  return 280;
};

const getCenterShift = (width: number) => {
  if (width < 640) {
    return { x: -60, y: -36 };
  }
  if (width < 1024) {
    return { x: -80, y: -44 };
  }
  if (width < 1280) {
    return { x: -100, y: -52 };
  }
  if (width < 1440) {
    return { x: -132, y: -58 };
  }
  return { x: -165, y: -64 };
};

interface ToolIcon {
  id: string;
  src: string;
  sizeClass: string;
  iconClass: string;
  angleOffset?: number;
  radiusScale?: number;
}

const toolIcons: ToolIcon[] = [
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
    <section className="mx-auto w-full max-w-[1480px] px-20 py-20 max-sm:px-6 lg:my-20 lg:py-36">
      <div
        className="relative mx-auto flex min-h-[360px] max-w-4xl flex-col items-center justify-center gap-6 px-10 py-16 text-center"
        ref={containerRef}
      >
        {toolIcons.map((icon, index) => {
          const sizeScale = getSizeScale(containerWidth);
          const baseAngle = (index / iconCount) * Math.PI * 2;
          const angle = baseAngle + (icon.angleOffset ?? 0);
          const maxHalf = getMaxHalf(containerWidth);
          const baseRadius = Math.max(200, containerWidth / 2 - maxHalf);
          const radius = baseRadius * (icon.radiusScale ?? 1);
          const outerRadius = radius + getOuterRadiusDelta(containerWidth);
          const { x: centerShiftX, y: centerShiftY } =
            getCenterShift(containerWidth);
          const x = Math.cos(angle) * radius + centerShiftX;
          const y = Math.sin(angle) * radius + centerShiftY;
          const outerX = Math.cos(angle) * outerRadius + centerShiftX;
          const outerY = Math.sin(angle) * outerRadius + centerShiftY;

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
