"use client";

import { Calendar04Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight, Loader2, Menu, X } from "lucide-react";
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
  const isAuthLoading = status === "loading";
  const primaryCtaHref = isAuthenticated ? "/client" : "/login";
  const primaryCtaLabel = isAuthenticated ? "Dashboard" : "Login";

  const activeLinkClass =
    "font-bold bg-linear-to-br from-violet-600 to-fuchsia-500 bg-clip-text text-transparent hover:to-violet-600 hover:from-fuchsia-500";
  const inactiveLinkClass = "text-zinc-700";

  return (
    <header className="sticky top-0 z-40 border-zinc-200 border-b bg-[#FBF5FF] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] backdrop-blur supports-backdrop-filter:bg-[#FBF5FF]">
      <div className="mx-auto flex max-w-[1480px] items-center justify-between py-3 max-sm:px-6 sm:py-4 lg:px-20">
        <Link className="flex items-center gap-2" href="/">
          <Image alt="Hyperscaler" height={60} src="/logo.png" width={180} />
        </Link>

        <nav className="hidden items-center gap-6 text-lg lg:flex">
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
              pathname?.startsWith("/pricing")
                ? activeLinkClass
                : inactiveLinkClass
            }`}
            href="/pricing"
          >
            Pricing
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
          <Link
            className={` ${
              pathname?.startsWith("/faq") ? activeLinkClass : inactiveLinkClass
            }`}
            href="/faq"
          >
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthLoading ? (
            <Button
              aria-label="Loading"
              className="hidden min-w-[170px] justify-center lg:inline-flex"
              disabled
              size="lg"
              variant="gradient"
            >
              <Loader2 className="size-4 animate-spin" />
            </Button>
          ) : (
            <Link href={primaryCtaHref}>
              <Button
                className="hidden min-w-[170px] justify-center lg:inline-flex"
                size="lg"
                variant="gradient"
              >
                {primaryCtaLabel} <ArrowRight className="size-4" />
              </Button>
            </Link>
          )}
          <Button
            asChild
            className="hidden min-w-[170px] justify-center bg-linear-to-br from-[#D946EF] to-[#5B21B6] p-px lg:inline-flex"
            size="lg"
            variant="outline"
          >
            <Link href="/onboarding/book-a-demo" rel="noreferrer noopener">
              <span className="inline-flex h-full w-full items-center justify-center gap-2 rounded-[calc(var(--radius-md)-1px)] bg-[#FBF5FF] px-6 text-zinc-900 leading-none">
                <HugeiconsIcon
                  className="shrink-0"
                  color="#000"
                  icon={Calendar04Icon}
                  size={16}
                  strokeWidth={1.8}
                />
                <span>Book a Demo</span>
              </span>
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

      {/* Mobile menu - now INSIDE the sticky header */}
      <div className="lg:hidden">
        <div
          aria-hidden={!mobileMenuOpen}
          className={`absolute right-0 left-0 z-40 px-3 pb-3 transition-all duration-300 ease-out ${
            mobileMenuOpen
              ? "pointer-events-auto top-full opacity-100"
              : "pointer-events-none top-full opacity-0"
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
                  pathname?.startsWith("/pricing")
                    ? activeLinkClass
                    : "text-zinc-800"
                }`}
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Pricing</span>
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
              <Link
                className={`flex items-center justify-between rounded-xl px-3 py-2 hover:bg-zinc-50 ${
                  pathname?.startsWith("/faq")
                    ? activeLinkClass
                    : "text-zinc-800"
                }`}
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>FAQ</span>
              </Link>
              <div className="mt-2 flex flex-col gap-2 border-zinc-100 border-t pt-3">
                {isAuthLoading ? (
                  <Button
                    aria-label="Loading"
                    className="min-w-[170px] justify-center"
                    disabled
                    size="sm"
                    variant="gradient"
                  >
                    <Loader2 className="size-4 animate-spin" />
                  </Button>
                ) : (
                  <Button asChild size="sm" variant="gradient">
                    <Link
                      href={primaryCtaHref}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="inline-flex min-w-[170px] items-center justify-center">
                        {primaryCtaLabel} <ArrowRight className="size-4" />
                      </span>
                    </Link>
                  </Button>
                )}
                <Button
                  asChild
                  className="min-w-[170px] justify-center bg-linear-to-br from-[#D946EF] to-[#5B21B6] p-px"
                  size="sm"
                  variant="outline"
                >
                  <Link
                    href="/onboarding/book-a-demo"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <span className="inline-flex h-full w-full items-center justify-center rounded-[calc(var(--radius-md)-1px)] bg-white px-3 text-zinc-900">
                      Contact us
                    </span>
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
