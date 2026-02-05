import Image from "next/image";
import Link from "next/link";

import { ForgotPasswordForm } from "@/components/forgot-password/forgot-password-form";

export default function ForgotPasswordPage() {
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
            <ForgotPasswordForm />
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
