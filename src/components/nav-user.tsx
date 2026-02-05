"use client";

import { LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type ProfileLink = {
  label: string;
  href: string;
};

export function NavUser({
  profileLink,
  onLogout,
}: {
  profileLink?: ProfileLink;
  onLogout?: () => void;
}) {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {profileLink ? (
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={pathname === profileLink.href}
            tooltip={profileLink.label}
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
          className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={onLogout}
          type="button"
        >
          <LogOut className="text-current" />
          <span>Log out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
