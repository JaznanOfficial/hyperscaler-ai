"use client"

import { useRouter } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ClientItem } from "@/components/admin/client-list"

const statusStyles: Record<ClientItem["status"], string> = {
  Approved: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Cancelled: "bg-rose-50 text-rose-700",
}

export type ClientListItemProps = {
  item: ClientItem
  onStatusChange: (id: string, status: ClientItem["status"]) => void
}

export function ClientListItem({ item, onStatusChange }: ClientListItemProps) {
  const router = useRouter()

  const goToDetail = () => router.push(`/s-admin/clients/${item.id}`)

  return (
    <li className="px-4 py-4">
      <button
        type="button"
        onClick={goToDetail}
        className="flex w-full cursor-pointer flex-col gap-3 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-1 flex-col">
          <p className="text-lg font-semibold text-slate-900">{item.name}</p>
          <p className="text-sm text-slate-500">{item.email}</p>
          <p className="text-sm text-slate-500">Service: {item.requestedService}</p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className={`rounded-full px-3 py-1 text-[11px] font-semibold ${statusStyles[item.status]}`}>
              {item.status}
            </Badge>
            <span className="text-xs font-semibold text-slate-900">{item.subscriptionId}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={(event) => {
                event.stopPropagation()
                goToDetail()
              }}
            >
              View
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="cursor-pointer"
                  onClick={(event) => event.stopPropagation()}
                >
                  Update status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-48" onClick={(event) => event.stopPropagation()}>
                <DropdownMenuLabel>Set status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={item.status} onValueChange={(value) => onStatusChange(item.id, value as ClientItem["status"]) }>
                  {(["Approved", "Pending", "Cancelled"] as const).map((status) => (
                    <DropdownMenuRadioItem key={status} value={status}>
                      {status}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </button>
    </li>
  )
}
