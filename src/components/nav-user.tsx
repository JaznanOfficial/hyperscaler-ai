"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, UserRound } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type ProfileLink = {
  label: string
  href: string
}

export function NavUser({
  profileLink,
  onLogout,
}: {
  profileLink?: ProfileLink
  onLogout?: () => void
}) {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      {profileLink ? (
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip={profileLink.label}
            isActive={pathname === profileLink.href}
          >
            <Link href={profileLink.href}>
              <UserRound />
              <span>{profileLink.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ) : null}
      <SidebarMenuItem>
        <SidebarMenuButton
          type="button"
          onClick={onLogout}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
        >
          <LogOut className="text-current" />
          <span>Log out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
