import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth } from "@/backend/config/auth";

import { AppSidebar } from "@/components/app-sidebar";
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

function getRoleBasedRedirect(role: string): string {
  switch (role) {
    case "ADMIN":
      return "/s-admin";
    case "MANAGER":
    case "EMPLOYEE":
      return "/employee";
    case "CLIENT":
      return "/client";
    default:
      return "/login";
  }
}

export default async function SDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN" && session.user.role !== "MANAGER") {
    redirect(getRoleBasedRedirect(session.user.role));
  }
  // Note: Access control is handled by proxy.ts middleware
  return (
    <SidebarProvider>
      <AppSidebar />
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
                  <BreadcrumbPage>Super Admin</BreadcrumbPage>
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
