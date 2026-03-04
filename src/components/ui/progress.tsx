"use client";

import {
  Indicator as ProgressPrimitiveIndicator,
  Root as ProgressPrimitiveRoot,
} from "@radix-ui/react-progress";
import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementRef,
  forwardRef,
} from "react";

import { cn } from "@/lib/utils";

export interface ProgressProps
  extends ComponentPropsWithoutRef<typeof ProgressPrimitiveRoot> {
  indicatorClassName?: string;
  indicatorStyle?: CSSProperties;
  value?: number;
}

const Progress = forwardRef<
  ElementRef<typeof ProgressPrimitiveRoot>,
  ProgressProps
>(({ className, indicatorClassName, indicatorStyle, value, ...props }, ref) => {
  const numValue = Number(value) || 0;

  return (
    <ProgressPrimitiveRoot
      className={cn(
        "relative h-2 w-full overflow-visible rounded-full bg-muted",
        className
      )}
      ref={ref}
      {...props}
    >
      <ProgressPrimitiveIndicator
        className={cn("h-full bg-primary transition-all", indicatorClassName)}
        style={{
          width: `${numValue}%`,
          ...indicatorStyle,
        }}
      />
    </ProgressPrimitiveRoot>
  );
});
Progress.displayName = ProgressPrimitiveRoot.displayName;

export { Progress };
