"use client";

import type { SubscriptionItem } from "@/components/admin/subscription-list";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusStyles: Record<string, string> = {
  APPROVED: "bg-emerald-100 text-emerald-700",
  PENDING: "bg-amber-100 text-amber-700",
  CANCELLED: "bg-rose-100 text-rose-700",
};

interface SubscriptionListItemProps {
  item: SubscriptionItem;
  onStatusChange: (id: string, status: string) => void;
}

export function SubscriptionListItem({
  item,
  onStatusChange,
}: SubscriptionListItemProps) {
  return (
    <li className="relative">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className="flex w-full cursor-pointer flex-col gap-1 px-4 py-4 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 sm:flex-row sm:items-center sm:justify-between"
            type="button"
          >
            <div>
              <p className="font-semibold text-lg text-slate-900">
                {item.services.map((s: any) => s.serviceName).filter(Boolean).join(", ") || 
                 `Project #${item.id.slice(0, 8)}`}
              </p>
              <p className="text-slate-500 text-sm">
                Client: {item.clientName || item.clientId.slice(0, 8)}
                {item.employeeNames && item.employeeNames.length > 0 && 
                  ` • ${item.employeeNames.length} employee(s) assigned`}
              </p>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 sm:mt-0">
              <Badge
                className={`rounded-full px-3 py-1 font-semibold text-[11px] ${statusStyles[item.status]}`}
                variant="secondary"
              >
                {item.status}
              </Badge>
              <span className="text-slate-500 text-xs">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent size="default">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-left font-semibold text-lg text-slate-900">
              Project Details
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="space-y-4 text-slate-600 text-sm">
            <div>
              <p className="font-medium text-slate-900">Client</p>
              <p>{item.clientName || "Unknown"}</p>
              {item.clientEmail && <p className="text-xs">{item.clientEmail}</p>}
            </div>
            <div>
              <p className="font-medium text-slate-900">Services</p>
              <ul className="mt-2 space-y-1">
                {item.services.map((service: any, index: number) => (
                  <li key={index}>• {service.serviceName || "Service"}</li>
                ))}
              </ul>
            </div>
            {item.employeeNames && item.employeeNames.length > 0 && (
              <div>
                <p className="font-medium text-slate-900">Assigned Employees</p>
                <ul className="mt-2 space-y-1">
                  {item.employeeNames.map((name: string, index: number) => (
                    <li key={index}>• {name}</li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <p className="font-medium text-slate-900">Status</p>
              <Select
                onValueChange={(value) => onStatusChange(item.id, value)}
                value={item.status}
              >
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="font-medium text-slate-900">Project ID</p>
              <p className="text-xs">{item.id}</p>
            </div>
            <div>
              <p className="font-medium text-slate-900">Created</p>
              <p>{new Date(item.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
}
