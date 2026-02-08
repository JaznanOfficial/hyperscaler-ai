import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/backend/config/auth";

import { AppSidebar, type AppSidebarNavItem } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const employeeNavItems: AppSidebarNavItem[] = [
  {
    title: "Hyperscaler AI",
    url: "/employee",
    icon: "bot",
    matchSubRoutes: false,
  },
  {
    title: "Projects",
    url: "/employee/projects",
    icon: "folderKanban",
    matchSubRoutes: true,
  },
  {
    title: "Feedbacks",
    url: "/employee/feedbacks",
    icon: "messageSquare",
    matchSubRoutes: false,
  },
];

export default async function EmployeeDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  // Only EMPLOYEE and MANAGER can access this area
  const allowedRoles = ["EMPLOYEE", "MANAGER"];
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
    redirect("/login");
  }
  return (
    <SidebarProvider>
      <AppSidebar navItems={employeeNavItems} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              className="mr-2 hidden data-[orientation=vertical]:h-4 md:flex"
              orientation="vertical"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Employee</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
