"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function HomeNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { status } = useSession();
  const pathname = usePathname();
  const isAuthenticated = status === "authenticated";
  const primaryCtaHref = isAuthenticated ? "/client" : "/login";
  const primaryCtaLabel = isAuthenticated ? "Dashboard" : "Login";

  const activeLinkClass =
    "font-bold bg-linear-to-br from-violet-600 to-fuchsia-500 bg-clip-text text-transparent hover:to-violet-600 hover:from-fuchsia-500";
  const inactiveLinkClass = "text-zinc-700";

  return (
    <>
      <header className="sticky top-0 z-40 border-zinc-200 border-b bg-[#FBF5FF] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] backdrop-blur supports-backdrop-filter:bg-[#FBF5FF]">
        <div className="mx-auto flex w-11/12 items-center justify-between py-3 sm:py-4 lg:w-10/12">
          <Link className="flex items-center gap-2" href="/">
            <Image alt="Hyperscaler" height={40} src="/logo.png" width={140} />
          </Link>

          <nav className="hidden items-center gap-6 lg:ml-32 lg:flex">
            <Link
              className={` ${
                pathname === "/" ? activeLinkClass : inactiveLinkClass
              }`}
              href="/"
            >
              Home
            </Link>
            <Link
              className={` ${
                pathname?.startsWith("/services")
                  ? activeLinkClass
                  : inactiveLinkClass
              }`}
              href="/services"
            >
              Services
            </Link>
            <Link
              className={` ${
                pathname?.startsWith("/portfolio")
                  ? activeLinkClass
                  : inactiveLinkClass
              }`}
              href="/portfolio"
            >
              Portfolio
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href={primaryCtaHref}>
              <Button
                className="hidden lg:inline-flex"
                size="sm"
                variant="gradient"
              >
                {primaryCtaLabel} <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Button
              asChild
              className="hidden lg:inline-flex"
              size="sm"
              variant="outline"
            >
              <Link
                href="https://calendly.com/ujjwalroy1/ai-implementation"
                rel="noreferrer noopener"
                target="_blank"
              >
                Contact us
              </Link>
            </Button>

            <button
              aria-label="Menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-800 shadow-sm hover:bg-zinc-50 lg:hidden"
              onClick={() => setMobileMenuOpen((v) => !v)}
              type="button"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" strokeWidth={1.8} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="lg:hidden">
        <div
          aria-hidden={!mobileMenuOpen}
          className={`absolute right-0 left-0 z-40 px-3 pb-3 transition-all duration-300 ease-out ${
            mobileMenuOpen
              ? "pointer-events-auto top-20 opacity-100"
              : "pointer-events-none top-16 opacity-0"
          }`}
        >
          <div
            className={`rounded-2xl border border-zinc-200 bg-white shadow-black/5 shadow-xl transition-all duration-300 ease-out ${
              mobileMenuOpen ? "translate-y-0" : "translate-y-2"
            }`}
          >
            <nav className="flex flex-col gap-3 px-4 py-4 font-medium text-sm text-zinc-700">
              <Link
                className={`flex items-center justify-between rounded-xl px-3 py-2 hover:bg-zinc-50 ${
                  pathname === "/" ? activeLinkClass : "text-zinc-800"
                }`}
                href="/"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Home</span>
              </Link>
              <Link
                className={`flex items-center justify-between rounded-xl px-3 py-2 hover:bg-zinc-50 ${
                  pathname?.startsWith("/services")
                    ? activeLinkClass
                    : "text-zinc-800"
                }`}
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Services</span>
              </Link>
              <Link
                className={`flex items-center justify-between rounded-xl px-3 py-2 hover:bg-zinc-50 ${
                  pathname?.startsWith("/portfolio")
                    ? activeLinkClass
                    : "text-zinc-800"
                }`}
                href="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Portfolio</span>
              </Link>

              <div className="mt-2 flex flex-col gap-2 border-zinc-100 border-t pt-3">
                <Button asChild size="sm" variant="gradient">
                  <Link
                    href={primaryCtaHref}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {primaryCtaLabel} <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link
                    href="https://calendly.com/ujjwalroy1/ai-implementation"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    Contact us
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
