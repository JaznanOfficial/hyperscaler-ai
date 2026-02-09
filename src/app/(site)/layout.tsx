import type { ReactNode } from "react";

import { HomeNavbar } from "@/components/home/home-navbar";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20">
      <HomeNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
