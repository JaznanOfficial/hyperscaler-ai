import Link from "next/link";
import type { ServiceItem } from "@/components/admin/service-list";
import { Button } from "@/components/ui/button";

export function ServiceListItem({ item }: { item: ServiceItem }) {
  return (
    <li className="px-4 py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          className="flex-1 cursor-pointer rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          href={`/s-admin/services/${item.id}`}
        >
          <p className="text-slate-400 text-xs uppercase tracking-wide">
            {item.id}
          </p>
          <p className="font-semibold text-lg text-slate-900">{item.name}</p>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            asChild
            className="cursor-pointer"
            size="sm"
            variant="outline"
          >
            <Link href={`/s-admin/services/${item.id}`}>View</Link>
          </Button>
          <Button className="cursor-pointer" size="sm" variant="destructive">
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
}
