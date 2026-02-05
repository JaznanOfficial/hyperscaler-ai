"use client";

import { useRouter } from "next/navigation";
import type { ClientItem } from "@/components/admin/client-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusStyles: Record<ClientItem["status"], string> = {
  Approved: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Cancelled: "bg-rose-50 text-rose-700",
};

export type ClientListItemProps = {
  item: ClientItem;
  onStatusChange: (id: string, status: ClientItem["status"]) => void;
};

export function ClientListItem({ item, onStatusChange }: ClientListItemProps) {
  const router = useRouter();

  const goToDetail = () => router.push(`/s-admin/clients/${item.id}`);

  return (
    <li className="px-4 py-4">
      <button
        className="flex w-full cursor-pointer flex-col gap-3 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 sm:flex-row sm:items-center sm:justify-between"
        onClick={goToDetail}
        type="button"
      >
        <div className="flex flex-1 flex-col">
          <p className="font-semibold text-lg text-slate-900">{item.name}</p>
          <p className="text-slate-500 text-sm">{item.email}</p>
          <p className="text-slate-500 text-sm">
            Service: {item.requestedService}
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              className={`rounded-full px-3 py-1 font-semibold text-[11px] ${statusStyles[item.status]}`}
              variant="secondary"
            >
              {item.status}
            </Badge>
            <span className="font-semibold text-slate-900 text-xs">
              {item.subscriptionId}
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="cursor-pointer"
                  onClick={(event) => event.stopPropagation()}
                  size="sm"
                  variant="secondary"
                >
                  Update status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-48"
                onClick={(event) => event.stopPropagation()}
              >
                <DropdownMenuLabel>Set status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  onValueChange={(value) =>
                    onStatusChange(item.id, value as ClientItem["status"])
                  }
                  value={item.status}
                >
                  {(["Approved", "Pending", "Cancelled"] as const).map(
                    (status) => (
                      <DropdownMenuRadioItem key={status} value={status}>
                        {status}
                      </DropdownMenuRadioItem>
                    )
                  )}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </button>
    </li>
  );
}
