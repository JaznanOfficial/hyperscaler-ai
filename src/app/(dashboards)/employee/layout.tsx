import type { ReactNode } from "react"

import { AppSidebar, type AppSidebarNavItem } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

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
]

export default function EmployeeDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar navItems={employeeNavItems} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 hidden h-4 md:flex"
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
        <div className="flex flex-1 min-h-0 flex-col gap-4 overflow-hidden">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
