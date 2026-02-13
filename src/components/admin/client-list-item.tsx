"use client";

import { useRouter } from "next/navigation";
import type { ClientItem } from "@/components/admin/client-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type ClientListItemProps = {
  item: ClientItem;
};

export function ClientListItem({ item }: ClientListItemProps) {
  const router = useRouter();

  const goToDetail = () => router.push(`/s-admin/clients/${item.id}`);

  return (
    <li className="px-4 py-4">
      <div
        className="flex w-full cursor-pointer flex-col gap-3 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 sm:flex-row sm:items-center sm:justify-between"
        onClick={goToDetail}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goToDetail();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div className="flex flex-1 flex-col">
          <p className="font-semibold text-lg text-slate-900">{item.name}</p>
          <p className="text-slate-500 text-sm">{item.email}</p>
          <p className="text-slate-500 text-sm">
            Member since{" "}
            {new Date(item.createdAt).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-[11px] text-emerald-700"
              variant="secondary"
            >
              Active
            </Badge>
            <span className="font-semibold text-slate-900 text-xs">
              CL-{item.id.slice(0, 4).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              className="cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                goToDetail();
              }}
              size="sm"
              variant="outline"
            >
              View
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}
