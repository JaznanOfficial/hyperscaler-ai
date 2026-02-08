"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function HomeNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const activeLinkClass =
    "font-bold bg-linear-to-br from-violet-600 to-fuchsia-500 bg-clip-text text-transparent hover:to-violet-600 hover:from-fuchsia-500";
  const inactiveLinkClass = "text-zinc-700";

  return (
    <>
      <header className="relative border-zinc-200 border-b bg-[#FBF5FF] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] backdrop-blur supports-backdrop-filter:bg-[#FBF5FF]">
        <div className="mx-auto flex max-w-10/12 items-center justify-between py-3 sm:py-4">
          <Link className="flex items-center gap-2" href="/">
            <Image alt="Hyperscaler" height={40} src="/logo.png" width={140} />
          </Link>

          <nav className="hidden items-center gap-6 sm:flex">
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
          </nav>

          <div className="flex items-center gap-4">
            <button
              aria-label="Cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-800 shadow-sm hover:bg-zinc-50"
              type="button"
            >
              <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#9E32DD] px-1 font-semibold text-[11px] text-white">
                2
              </span>
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3h2l2 13h10l2-9H7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="19" r="1.4" />
                <circle cx="17" cy="19" r="1.4" />
              </svg>
            </button>

            <Button className="max-sm:hidden" size={"sm"}>
              Login <ArrowRight className="size-4" />
            </Button>
            <Button className="max-sm:hidden" size={"sm"} variant="outline">
              Contact us
            </Button>

            <button
              aria-label="Menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-800 shadow-sm hover:bg-zinc-50 sm:hidden"
              onClick={() => setMobileMenuOpen((v) => !v)}
              type="button"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {mobileMenuOpen ? (
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <path
                    d="M3 12h18M3 6h18M3 18h18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="absolute top-20 right-0 left-0 z-40 px-3 pb-3">
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-black/5 shadow-xl">
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

                <div className="mt-2 flex flex-col gap-2 border-zinc-100 border-t pt-3">
                  <Button onClick={() => setMobileMenuOpen(false)} size="sm">
                    Login <ArrowRight className="size-4" />
                  </Button>
                  <Button
                    onClick={() => setMobileMenuOpen(false)}
                    size="sm"
                    variant="outline"
                  >
                    Contact us
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
