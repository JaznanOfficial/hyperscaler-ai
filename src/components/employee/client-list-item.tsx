import { Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type EmployeeClientItem = {
  id: string;
  name: string;
  displayId: string;
  email: string;
  projectCount: number;
};

export function ClientListItem({ client }: { client: EmployeeClientItem }) {
  return (
    <li className="px-4 py-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <Link
          className="flex-1 cursor-pointer rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          href={`/employee/clients/${client.id}`}
        >
          <p className="text-slate-400 text-xs uppercase tracking-wide">
            {client.displayId}
          </p>
          <p className="font-semibold text-lg text-slate-900">{client.name}</p>
          <p className="text-slate-500 text-xs">{client.email}</p>
        </Link>
        <div className="mt-3 flex items-center gap-3 sm:mt-0">
          <Badge
            className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-[11px] text-blue-700"
            variant="secondary"
          >
            {client.projectCount}{" "}
            {client.projectCount === 1 ? "Project" : "Projects"}
          </Badge>
          <Button
            asChild
            className="rounded-full px-4 py-1 text-sm"
            variant="outline"
          >
            <Link
              className="inline-flex items-center gap-2"
              href={`/employee/clients/${client.id}`}
            >
              <Users className="size-4" />
              View
            </Link>
          </Button>
        </div>
      </div>
    </li>
  );
}
