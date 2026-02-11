"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { EditEmployeeDialog } from "@/components/admin/edit-employee-dialog";
import type { EmployeeItem } from "@/components/admin/employee-list";
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
import { Button } from "@/components/ui/button";

async function deleteEmployee(id: string) {
  const response = await fetch(`/api/admin/employees/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete employee");
  }

  return response.json();
}

export function EmployeeListItem({ item }: { item: EmployeeItem }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteEmployee(item.id),
    onSuccess: () => {
      toast.success("Employee deleted successfully");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <li className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-lg text-slate-900">{item.name}</p>
        <p className="text-slate-500 text-sm">{item.email}</p>
        <p className="mt-1 font-semibold text-slate-900 text-xs uppercase tracking-wide">
          {item.title}
        </p>
        <p className="text-slate-500 text-xs">
          {item.yearsExperience} yrs experience
        </p>
      </div>
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-2">
          <EditEmployeeDialog employee={item} />
          <AlertDialog onOpenChange={setOpen} open={open}>
            <AlertDialogTrigger asChild>
              <Button
                className="cursor-pointer"
                size="sm"
                variant="destructive"
              >
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {item.name}? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  disabled={mutation.isPending}
                  onClick={() => mutation.mutate()}
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
