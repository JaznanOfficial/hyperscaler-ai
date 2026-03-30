"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface HeroVideoRevealProps {
  className?: string;
  src: string;
}

export const HeroVideoReveal = ({ className, src }: HeroVideoRevealProps) => {
  return (
    <motion.div
      className={cn(
        "relative w-full overflow-hidden rounded-3xl shadow-[0_25px_80px_rgba(64,0,128,0.18)]",
        className
      )}
      exit={{ scale: 0.01, opacity: 0.4 }}
      initial={{ scale: 0.01, opacity: 0.4 }}
      transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
      viewport={{ amount: 0.4, once: false }}
      whileInView={{ scale: 1, opacity: 1 }}
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
