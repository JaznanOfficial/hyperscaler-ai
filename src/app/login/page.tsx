import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/backend/config/auth";

import { LoginForm } from "@/components/login/login-form";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    switch (session.user.role) {
      case "ADMIN":
        redirect("/s-admin");
      case "MANAGER":
      case "EMPLOYEE":
        redirect("/employee");
      case "CLIENT":
        redirect("/client");
    }
  }
  return (
    <div className="grid min-h-svh w-full lg:grid-cols-2">
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
      <div className="relative hidden pt-5 pr-5 pb-5 lg:block">
        <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl">
          <Image
            alt="Team collaborating"
            className="object-cover"
            fill
            priority
            sizes="50vw"
            src="/signup.png"
          />
        </div>
      </div>
    </div>
  );
}
