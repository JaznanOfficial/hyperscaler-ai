"use client";

import { AppSidebar, type AppSidebarNavItem } from "@/components/app-sidebar";
import { useFeedbackStream } from "@/hooks/use-feedback-stream";

const baseEmployeeNavItems: AppSidebarNavItem[] = [
  {
    title: "Hyperscaler AI",
    url: "/employee",
    icon: "bot",
    matchSubRoutes: false,
  },
  {
    title: "Clients",
    url: "/employee/clients",
    icon: "users",
    matchSubRoutes: true,
  },
  {
    title: "Feedbacks",
    url: "/employee/feedbacks",
    icon: "messageSquare",
    matchSubRoutes: false,
  },
];

export function EmployeeSidebarWrapper() {
  const { unreadCount } = useFeedbackStream();

  const employeeNavItems = baseEmployeeNavItems.map((item) => {
    if (item.url === "/employee/feedbacks") {
      return {
        ...item,
        badge: unreadCount,
      };
    }
    return item;
  });

  return <AppSidebar navItems={employeeNavItems as any} />;
}
