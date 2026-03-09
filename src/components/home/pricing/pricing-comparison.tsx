"use client";

import { DollarSign, Sparkles } from "lucide-react";

import type { TraditionalHiringRole } from "./types";

const traditionalHiringRoles: TraditionalHiringRole[] = [
  { title: "Senior Designer", cost: "$6,000/mo" },
  { title: "Developer", cost: "$7,000/mo" },
  { title: "Growth Marketer", cost: "$5,000/mo" },
  { title: "SDR/Outreach", cost: "$4,000/mo" },
];

export const PricingComparison = () => (
  <div className="w-full rounded-[32px] border border-neutral-200/70 bg-white/80 px-6 py-10 md:px-10">
    <div className="flex flex-col gap-10 lg:flex-row">
      <div className="flex-1 space-y-8">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-['Inter'] font-semibold text-gray-400 text-sm uppercase tracking-wide">
              Traditional hiring (full-time team)
            </p>
            <span className="rounded-full border border-rose-200 bg-red-50 px-3 py-1 font-['Inter'] font-semibold text-[10px] text-red-800 uppercase tracking-wide">
              High overhead
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {traditionalHiringRoles.map((role) => (
              <div
                className="rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-[0px_2px_6px_rgba(15,23,42,0.04)]"
                key={role.title}
              >
                <p className="font-['Inter'] font-semibold text-[10px] text-gray-400 uppercase tracking-wide">
                  {role.title}
                </p>
                <p className="mt-2 font-['Outfit'] font-semibold text-lg text-slate-900">
                  {role.cost}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <p className="font-['Inter'] text-slate-500 text-xs">
              *Excluding hardware, software, and taxes
            </p>
            <p className="font-['Outfit'] font-medium text-lg text-slate-700">
              $22,000 total
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-violet-200/60 bg-purple-50 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-purple-200">
                <Sparkles className="text-purple-500" />
              </div>
              <div>
                <p className="font-['Inter'] font-semibold text-purple-600 text-sm">
                  Hyperscaler plan
                </p>
                <p className="font-['Outfit'] font-semibold text-3xl text-purple-600">
                  $2,500/mo
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-purple-200/80 bg-purple-50 px-4 py-2 font-semibold text-purple-600 text-xs">
              <Sparkles className="size-4 text-purple-600" />
              <span>Expert human touch + AI efficiency</span>
            </div>
          </div>
          <p className="mt-4 font-['Inter'] text-purple-600 text-sm">
            Hyperscaler can automate your entire marketing and development
            journey, scale smarter without extra hires, and turn insights into
            measurable growth.
          </p>
        </div>
      </div>

      <div className="flex w-full max-w-xs flex-col items-center justify-center space-y-7 rounded-3xl border border-purple-200/60 bg-purple-50 px-6 py-10 text-center sm:mx-auto lg:max-w-sm">
        <DollarSign className="size-6 text-purple-600" />
        <p className="font-['Inter'] font-medium text-purple-600 text-xs uppercase tracking-[0.3em]">
          Avg. monthly savings
        </p>
        <p className="mt-3 bg-linear-to-r from-violet-800 to-fuchsia-500 bg-clip-text font-['Outfit'] font-extrabold text-5xl text-transparent">
          $19,500
        </p>
        <div className="mt-4 w-full border-white/40 border-t" />
        <p className="mt-4 font-['Outfit'] font-medium text-base text-purple-600">
          That’s <span className="font-semibold underline">$234k / year</span>{" "}
          back into your growth capital.
        </p>
      </div>
    </div>
  </div>
);
