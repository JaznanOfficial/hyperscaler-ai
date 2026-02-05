import Image from "next/image"
import Link from "next/link"

import { SignupForm } from "@/components/signup/signup-form"

export default function SignupPage() {
  return (
    <div className="grid min-h-svh w-full lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center md:justify-start">
          <Link href="/" className="flex items-center" aria-label="Hyperscaler home">
            <Image
              src="/logo.png"
              alt="Hyperscaler logo"
              width={140}
              height={32}
              className="h-8 w-auto"
              priority
            />
            <span className="sr-only">Hyperscaler</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block pt-10 pb-10 pr-10">
        <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl">
          <Image
            src="/signup.png"
            alt="Team collaborating"
            fill
            className="object-cover"
            priority
            sizes="50vw"
          />
        </div>
      </div>
    </div>
  )
}
