"use client";

import { useQuery } from "@tanstack/react-query";
import { EmployeeListItem } from "@/components/admin/employee-list-item";

export type EmployeeItem = {
  id: string;
  name: string;
  email: string;
  title: string;
  expertise: string;
  yearsExperience: number;
  roleLevel: "manager" | "employee";
};

type EmployeeListProps = {
  page: number;
  onPaginationChange?: (page: number, totalPages: number) => void;
};

async function fetchEmployees(page: number) {
  const response = await fetch(`/api/admin/employees?page=${page}&limit=10`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  return response.json();
}

export function EmployeeList({ page, onPaginationChange }: EmployeeListProps) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["employees", page],
    queryFn: () => fetchEmployees(page),
    staleTime: 0,
  });

  if (data?.pagination && onPaginationChange) {
    onPaginationChange(data.pagination.page, data.pagination.totalPages);
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-500">Loading employees...</p>
      </div>
    );
  }

  const employees: EmployeeItem[] = data?.employees.map((emp: any) => ({
    id: emp.id,
    name: emp.name,
    email: emp.email,
    title: emp.generalInfo?.title || (emp.role === "MANAGER" ? "Manager" : "Employee"),
    expertise: emp.generalInfo?.expertise || "N/A",
    yearsExperience: emp.generalInfo?.yearsExperience || 0,
    roleLevel: emp.role === "MANAGER" ? "manager" : "employee",
  })) || [];

  if (employees.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-500">No employees yet</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {employees.map((item) => (
          <EmployeeListItem item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
