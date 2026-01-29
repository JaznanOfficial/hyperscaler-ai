"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function ProjectCalendarCard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm font-semibold text-slate-900">Project schedule</p>
        <p className="text-xs text-slate-500">Quickly glance upcoming milestones.</p>
      </div>
      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-lg border" />
    </div>
  )
}
