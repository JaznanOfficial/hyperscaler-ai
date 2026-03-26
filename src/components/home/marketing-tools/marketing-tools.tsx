"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const sharedSizeClass = "size-[112px] md:size-[128px] lg:size-[216px]";
const sharedIconClass =
  "h-[61px] w-[61px] md:h-[69px] md:w-[69px] lg:h-[120px] lg:w-[120px]";

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
    radiusScale: 3,
    angleOffset: -2.5,
  },
  {
    id: "slack",
    src: "/marketing-tools/slack-connect.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
    angleOffset: 0.18,
  },
  {
    id: "airtable",
    src: "/marketing-tools/airtable.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
    angleOffset: 0.28,
  },
  {
    id: "google-ads",
    src: "/marketing-tools/google-ads.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
    angleOffset: 0.38,
  },
  {
    id: "youtube",
    src: "/marketing-tools/youtube.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
    angleOffset: 0.48,
  },
  {
    id: "facebook",
    src: "/marketing-tools/facebook.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
    angleOffset: 0.58,
  },
  {
    id: "linkedin",
    src: "/marketing-tools/linkedin.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
    angleOffset: 0.68,
  },
  {
    id: "telegram",
    src: "/marketing-tools/telegram.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
    angleOffset: 0.78,
  },
  {
    id: "reddit",
    src: "/marketing-tools/reddit.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
    angleOffset: 0.88,
  },
  {
    id: "miro",
    src: "/marketing-tools/miro.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
    angleOffset: 0.98,
  },
  {
    id: "n8n",
    src: "/marketing-tools/n8n.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
    angleOffset: 1.08,
  },
  {
    id: "bolt",
    src: "/marketing-tools/bolt.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
    angleOffset: 1.18,
  },
  {
    id: "mainchimp",
    src: "/marketing-tools/mainchimp.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
    angleOffset: 1.28,
  },
  {
    id: "purplexity",
    src: "/marketing-tools/purplexity.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
    radiusScale: 1,
    angleOffset: 0.05,
  },
  {
    id: "openclaw",
    src: "/marketing-tools/openclaw.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
    radiusScale: 1,
    angleOffset: 0.42,
  },
  {
    id: "replit",
    src: "/marketing-tools/replit.svg",
    sizeClass: sharedSizeClass,
    iconClass: sharedIconClass,
    radiusScale: 1,
    angleOffset: 0.95,
  },
];

const MarketingTools = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const inView = useInView(containerRef, { amount: 0.25, once: false });
  const iconCount = toolIcons.length;
  const isLargeLayout = containerWidth >= 1024;
  const verticalSpacing = containerWidth < 1280 ? 110 : 130;
  const horizontalOffset = containerWidth < 1280 ? 220 : 260;
  const leftTotal = Math.ceil(iconCount / 2);
  const rightTotal = iconCount - leftTotal;

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
          const sizeScale =
            containerWidth < 640 ? 0.5 : containerWidth < 1024 ? 0.7 : 0.85;
          let x = 0;
          let y = 0;
          let outerX = 0;
          let outerY = 0;

          if (isLargeLayout) {
            const isLeftColumn = index < leftTotal;
            const rowsForColumn = isLeftColumn ? leftTotal : rightTotal;
            const startY = -((rowsForColumn - 1) * verticalSpacing) / 2;
            const rowIndex = isLeftColumn ? index : index - leftTotal;
            const baseX = isLeftColumn ? -horizontalOffset : horizontalOffset;
            const curvatureFactor = containerWidth < 1440 ? 0.07 : 0.09;
            const curvatureShift =
              Math.abs(startY + rowIndex * verticalSpacing) * curvatureFactor;
            const centerShiftY = -8;
            y = startY + rowIndex * verticalSpacing + centerShiftY;
            x = baseX + (isLeftColumn ? -curvatureShift : curvatureShift);
            const outerMultiplier = 1.35;
            outerX = x * outerMultiplier;
            outerY = y * outerMultiplier;
          } else {
            const baseAngle = (index / iconCount) * Math.PI * 2;
            const angle = baseAngle + (icon.angleOffset ?? 0);
            const maxHalf =
              containerWidth < 640 ? 70 : containerWidth < 1024 ? 90 : 110;
            const baseRadius = Math.max(180, containerWidth / 2 - maxHalf);
            const radius = baseRadius * (icon.radiusScale ?? 1);
            const outerRadius =
              radius +
              (containerWidth < 640 ? 160 : containerWidth < 1024 ? 220 : 280);
            const centerShiftX =
              containerWidth < 640 ? -50 : containerWidth < 1024 ? -66 : -92;
            const centerShiftY =
              containerWidth < 640 ? -26 : containerWidth < 1024 ? -32 : -42;
            x = Math.cos(angle) * radius + centerShiftX;
            y = Math.sin(angle) * radius + centerShiftY;
            outerX = Math.cos(angle) * outerRadius + centerShiftX;
            outerY = Math.sin(angle) * outerRadius + centerShiftY;
          }

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
