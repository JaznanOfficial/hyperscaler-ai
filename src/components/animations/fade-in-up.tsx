"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeInUp = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}: FadeInUpProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [direction, setDirection] = useState({ x: 0, y: 30 });

  useEffect(() => {
    // Always animate from bottom upward
    setDirection({ x: 0, y: 30 });
  }, []);

  return (
    <motion.div
      animate={
        inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...direction }
      }
      className={className}
      initial={{ opacity: 0, ...direction }}
      ref={ref}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};
