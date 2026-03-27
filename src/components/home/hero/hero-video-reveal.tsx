"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface HeroVideoRevealProps {
  className?: string;
  src: string;
}

export const HeroVideoReveal = ({ className, src }: HeroVideoRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.4, once: false });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] },
      });
    } else {
      controls.set({ opacity: 0.4, scale: 0.01 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      animate={controls}
      className={cn(
        "relative w-full overflow-hidden rounded-3xl shadow-[0_25px_80px_rgba(64,0,128,0.18)]",
        className
      )}
      initial={{ scale: 0.01, opacity: 0.4 }}
      ref={containerRef}
      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <video
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
          controls={false}
          loop
          muted
          playsInline
          src={src}
        />
      </div>
    </motion.div>
  );
};
