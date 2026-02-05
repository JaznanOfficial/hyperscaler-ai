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
>(({ className, indicatorClassName, indicatorStyle, value, ...props }, ref) => (
  <ProgressPrimitiveRoot
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-muted",
      className
    )}
    ref={ref}
    {...props}
  >
    <ProgressPrimitiveIndicator
      className={cn(
        "h-full w-full flex-1 bg-primary transition-all",
        indicatorClassName
      )}
      style={{
        transform: `translateX(-${100 - (Number(value) || 0)}%)`,
        ...indicatorStyle,
      }}
    />
  </ProgressPrimitiveRoot>
));
Progress.displayName = ProgressPrimitiveRoot.displayName;

export { Progress };
