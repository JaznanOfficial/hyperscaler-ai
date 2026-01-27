"use client"

import Link from "next/link"
import type { ComponentProps } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Bot,
  Briefcase,
  Command,
  CreditCard,
  FolderKanban,
  Layers,
  MessageSquare,
  Users2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const iconMap = {
  bot: Bot,
  layers: Layers,
  users: Users2,
  briefcase: Briefcase,
  creditCard: CreditCard,
  folderKanban: FolderKanban,
  messageSquare: MessageSquare,
} as const

type IconKey = keyof typeof iconMap

type NavItem = {
  title: string
  url: string
  icon: IconKey
  isActive?: boolean
  matchSubRoutes?: boolean
}

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

const defaultNavItems: NavItem[] = [
  {
    title: "Hyperscaler AI",
    url: "/s-admin",
    icon: "bot",
    matchSubRoutes: false,
  },
  {
    title: "Services",
    url: "/s-admin/services",
    icon: "layers",
  },
  {
    title: "Employees",
    url: "/s-admin/employees",
    icon: "users",
  },
  {
    title: "Clients",
    url: "/s-admin/clients",
    icon: "briefcase",
  },
  {
    title: "Subscriptions",
    url: "/s-admin/subscriptions",
    icon: "creditCard",
  },
]

export type AppSidebarNavItem = NavItem

type AppSidebarProps = ComponentProps<typeof Sidebar> & {
  navItems?: NavItem[]
}

export function AppSidebar({ navItems = defaultNavItems, ...props }: AppSidebarProps) {
  const resolvedNavItems = navItems.map((item) => ({
    ...item,
    icon: iconMap[item.icon] ?? iconMap.bot,
  })) satisfies Array<{
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    matchSubRoutes?: boolean
  }>

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={resolvedNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
