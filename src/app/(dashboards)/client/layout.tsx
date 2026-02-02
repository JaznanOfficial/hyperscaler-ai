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

const clientNavItems: AppSidebarNavItem[] = [
  {
    title: "Hyperscaler AI",
    url: "/client",
    icon: "bot",
    matchSubRoutes: false,
  },
  {
    title: "Statistics",
    url: "/client/statistics",
    icon: "layers",
    matchSubRoutes: false,
  },
  {
    title: "Subscriptions",
    url: "/client/subscriptions",
    icon: "creditCard",
    matchSubRoutes: false,
  },
]

export default function ClientDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar
        navItems={clientNavItems}
        profileLink={{
          label: "Profile",
          href: "/client/profile",
        }}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 hidden md:flex data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Client</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 min-h-0 flex-col gap-4 overflow-hidden p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
