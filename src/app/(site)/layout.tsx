import type { ReactNode } from "react";
import { Footer } from "@/components/shared/footer";
import { HomeNavbar } from "@/components/shared/home-navbar";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20">
      <HomeNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
