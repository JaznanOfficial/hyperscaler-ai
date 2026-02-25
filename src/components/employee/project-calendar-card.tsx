"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";

export function ProjectCalendarCard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // Disable future dates - only allow today and past dates
  const disabledDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };

  return (
    <Calendar
      className="w-full rounded-lg border"
      disabled={disabledDates}
      fullWidth
      mode="single"
      onSelect={setDate}
      selected={date}
    />
  );
}
