"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";

export function ProjectCalendarCard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      className="w-full rounded-lg border"
      fullWidth
      mode="single"
      onSelect={setDate}
      selected={date}
    />
  );
}
