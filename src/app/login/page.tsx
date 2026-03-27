import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "@/components/login/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh w-full lg:grid-cols-2">
      <div className="relative mt-5 mr-5 hidden lg:block">
        <Image
          alt="Team collaborating"
          className="object-fit"
          fill
          priority
          src="/login-page.svg"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center md:justify-start">
          <Link
            aria-label="Hyperscaler home"
            className="flex items-center"
            href="/"
          >
            <Image
              alt="Hyperscaler logo"
              className="h-8 w-auto"
              height={32}
              priority
              src="/logo.png"
              width={140}
            />
            <span className="sr-only">Hyperscaler</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">
            <Suspense fallback={<div>Loading...</div>}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
