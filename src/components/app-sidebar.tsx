"use client"

import Image from "next/image"
import Link from "next/link"
import type { ComponentProps } from "react"
import type { LucideIcon } from "lucide-react"
import { Bot, Briefcase, CreditCard, FolderKanban, Layers, MessageSquare, Users2 } from "lucide-react"

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
  SidebarRail,
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
  profileLink?: {
    label: string
    href: string
  }
}

export function AppSidebar({ navItems = defaultNavItems, profileLink, ...props }: AppSidebarProps) {
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
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image src="/logo.png" alt="Hyperscaler" width={160} height={40} className="h-10 w-auto" priority />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={resolvedNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser profileLink={profileLink} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
