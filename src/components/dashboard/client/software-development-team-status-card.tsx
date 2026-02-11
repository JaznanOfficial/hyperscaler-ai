"use client";

import { teamStatuses } from "./software-development-data";

export function SoftwareDevelopmentTeamStatusCard() {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
      <div>
        <p className="font-semibold text-slate-900 text-sm">
          Team Status Overview
        </p>
        <p className="text-slate-500 text-xs">
          Snapshot of ownership across each pod.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {teamStatuses.map((status) => (
          <div
            className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
            key={status.label}
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-white text-violet-600 shadow">
                <status.icon className="size-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">
                  {status.label}
                </p>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 font-semibold text-xs ${status.badgeBg} ${status.badgeText}`}
                >
                  {status.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
