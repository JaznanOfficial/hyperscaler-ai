"use client";

import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Briefcase,
  ChartColumn,
  CreditCard,
  FolderKanban,
  Layers,
  MessageSquare,
  Users2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import type { ComponentProps } from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const iconMap = {
  bot: Bot,
  layers: Layers,
  users: Users2,
  briefcase: Briefcase,
  creditCard: CreditCard,
  folderKanban: FolderKanban,
  messageSquare: MessageSquare,
  chartColumn: ChartColumn,
} as const;

type IconKey = keyof typeof iconMap;

interface NavItem {
  title: string;
  url: string;
  icon: IconKey;
  isActive?: boolean;
  matchSubRoutes?: boolean;
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
  {
    title: "Feedbacks",
    url: "/s-admin/feedbacks",
    icon: "messageSquare",
    matchSubRoutes: false,
  },
];

export type AppSidebarNavItem = NavItem;

type AppSidebarProps = ComponentProps<typeof Sidebar> & {
  navItems?: NavItem[];
  profileLink?: {
    label: string;
    href: string;
  };
};

export function AppSidebar({
  navItems = defaultNavItems,
  profileLink,
  ...props
}: AppSidebarProps) {
  const router = useRouter();

  const resolvedNavItems = navItems.map((item) => ({
    ...item,
    icon: iconMap[item.icon] ?? iconMap.bot,
  })) satisfies Array<{
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    matchSubRoutes?: boolean;
  }>;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
    router.refresh();
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/">
                <Image
                  alt="Hyperscaler"
                  className="h-10 w-auto"
                  height={40}
                  priority
                  src="/logo.png"
                  width={160}
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={resolvedNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser onLogout={handleLogout} profileLink={profileLink} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
