"use client"

import * as React from "react"
import type { CSSProperties } from "react"
import type { NameType, Payload, ValueType } from "recharts/types/component/DefaultTooltipContent"
import { Tooltip as RechartsTooltip } from "recharts"

import { cn } from "@/lib/utils"

export type ChartConfig = Record<string, { label?: string; color: string }>

type ChartContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  config: ChartConfig
}

export const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>((props, ref) => {
  const { config, className, style, children, ...rest } = props
  const cssVars = Object.entries(config).reduce((acc, [key, entry]) => {
    acc[`--color-${key}`] = entry.color
    return acc
  }, {} as Record<string, string>) as CSSProperties

  return (
    <div
      ref={ref}
      className={cn("relative flex w-full items-center justify-center", className)}
      style={{ ...cssVars, ...style }}
      {...rest}
    >
      {children}
    </div>
  )
})
ChartContainer.displayName = "ChartContainer"

export const ChartTooltip = RechartsTooltip

type ChartTooltipContentProps = {
  active?: boolean
  payload?: Payload<ValueType, NameType>[]
  label?: string | number
}

export function ChartTooltipContent(props: ChartTooltipContentProps) {
  const { active, payload, label } = props
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-xl border bg-background px-3 py-2 text-xs shadow-lg">
      {label ? <p className="mb-1 font-medium text-foreground">{label}</p> : null}
      <div className="space-y-1">
        {payload.map((entry) => {
          const name = typeof entry.name === "string" ? entry.name : entry.dataKey?.toString()
          return (
            <div key={entry.dataKey?.toString()} className="flex items-center gap-2">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-muted-foreground">{name}</span>
              <span className="font-semibold text-foreground">{entry.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
