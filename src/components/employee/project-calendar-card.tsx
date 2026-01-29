"use client"

import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export function ProjectCalendarCard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Card className="rounded-2xl border-slate-200">
      <CardHeader className="space-y-1">
        <CardTitle className="text-base">Project schedule</CardTitle>
        <CardDescription>Quickly glance upcoming milestones.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border"
        />
      </CardContent>
    </Card>
  )
}
