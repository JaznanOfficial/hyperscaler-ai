import { FolderOpen } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type EmployeeProjectItem = {
  id: string;
  name: string;
  owner: string;
  updated: string;
  status: "Completed" | "Cancelled" | "On-going";
  clientId?: string;
};

const statusStyles: Record<EmployeeProjectItem["status"], string> = {
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-rose-100 text-rose-700",
  "On-going": "bg-amber-100 text-amber-700",
};

export function ProjectListItem({ folder }: { folder: EmployeeProjectItem }) {
  const projectUrl = folder.clientId 
    ? `/employee/clients/${folder.clientId}/projects/${folder.id}`
    : `/employee/projects/${folder.id}`;

  return (
    <li className="px-4 py-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <Link
          className="flex-1 cursor-pointer rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          href={projectUrl}
        >
          <p className="text-slate-400 text-xs uppercase tracking-wide">
            {folder.owner}
          </p>
          <p className="font-semibold text-lg text-slate-900">{folder.name}</p>
          <p className="text-slate-500 text-xs">Updated {folder.updated}</p>
        </Link>
        <div className="mt-3 flex items-center gap-3 sm:mt-0">
          <Badge
            className={`rounded-full px-3 py-1 font-semibold text-[11px] ${statusStyles[folder.status]}`}
            variant="secondary"
          >
            {folder.status}
          </Badge>
          <Button
            asChild
            className="rounded-full px-4 py-1 text-sm"
            variant="outline"
          >
            <Link
              className="inline-flex items-center gap-2"
              href={projectUrl}
            >
              <FolderOpen className="size-4" />
              Open
            </Link>
          </Button>
        </div>
      </div>
    </li>
  );
}
