"use client";

import { blockers, projectTimeline } from "./software-development-data";

export function SoftwareDevelopmentTimelineSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
        <div>
          <p className="font-semibold text-slate-900 text-sm">
            Project Timeline & Milestones
          </p>
          <p className="text-slate-500 text-xs">
            See where the project stands and what’s coming next.
          </p>
        </div>
        <div className="space-y-4">
          {projectTimeline.map((milestone, index) => (
            <div className="space-y-3" key={milestone.phase}>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900 text-sm">
                  {milestone.phase}
                </p>
                <p className="text-slate-500 text-xs">{milestone.date}</p>
              </div>
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold text-xs ${milestone.pillBg} ${milestone.pillText}`}
              >
                <span className={`size-2 rounded-full ${milestone.pillDot}`} />
                {milestone.label}
              </span>
              {index < projectTimeline.length - 1 && (
                <div className="border-slate-200/70 border-b" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
        <div>
          <p className="font-semibold text-slate-900 text-sm">
            Active Blockers & Risks
          </p>
          <p className="text-slate-500 text-xs">
            Issues that may affect timelines or delivery.
          </p>
        </div>
        <div className="space-y-4">
          {blockers.map((blocker) => (
            <div
              className="rounded-xl border border-slate-200/60 bg-white p-5"
              key={blocker.title}
            >
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-semibold text-slate-900 text-sm">
                  {blocker.title}
                </p>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold text-xs ${blocker.riskBg} ${blocker.riskText}`}
                >
                  <span className={`size-2 rounded-full ${blocker.riskDot}`} />
                  {blocker.riskLabel}
                </span>
              </div>
              <p className="mt-2 text-slate-600 text-sm">
                {blocker.description}
              </p>
              <p className="mt-2 text-slate-500 text-sm">
                Waiting on:{" "}
                <span className="font-semibold text-slate-900">
                  {blocker.waitingOn}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
