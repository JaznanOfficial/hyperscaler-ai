"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ServiceItem } from "@/components/admin/service-list";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

async function deleteService(id: string) {
  const response = await fetch(`/api/admin/services/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete service");
  }

  return response.json();
}

export function ServiceListItem({ item }: { item: ServiceItem }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteService(item.id),
    onSuccess: () => {
      toast.success("Service deleted successfully");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

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
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button className="cursor-pointer" size="sm" variant="destructive">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Service</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {item.name}? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => mutation.mutate()}
                  disabled={mutation.isPending}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {mutation.isPending ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </li>
  );
}
