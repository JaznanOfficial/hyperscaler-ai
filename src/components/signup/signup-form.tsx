"use client"

import * as React from "react"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { richColors: true })
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      toast.success("Account created successfully", { richColors: true })

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        router.push("/login?registered=true")
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong"
      toast.error(message, { richColors: true })
      setIsLoading(false)
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-medium font-['Outfit'] leading-8">
            Create your account
          </h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your name, email and password to create an account.
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="full-name">Full name</FieldLabel>
            <Input
              id="full-name"
              name="name"
              type="text"
              placeholder="Ada Lovelace"
              required
              disabled={isLoading}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="ada@lovelace.ai"
              required
              inputMode="email"
              disabled={isLoading}
            />
            
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className="relative mt-1">
              <Input
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="********"
                className="pr-10"
                required
                minLength={8}
                disabled={isLoading}
              />
              <button
                type="button"
                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                className="text-muted-foreground absolute inset-y-0 right-0 flex items-center px-3 transition-colors hover:text-foreground cursor-pointer"
                disabled={isLoading}
              >
                {isPasswordVisible ? (
                  <Eye className="size-4" aria-hidden="true" />
                ) : (
                  <EyeOff className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
            <FieldDescription>
              Must be at least 8 characters with uppercase, lowercase, and a number.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
            <div className="relative mt-1">
              <Input
                id="confirm-password"
                name="confirm-password"
                type={isConfirmVisible ? "text" : "password"}
                placeholder="********"
                className="pr-10"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                aria-label={
                  isConfirmVisible ? "Hide confirmation password" : "Show confirmation password"
                }
                onClick={() => setIsConfirmVisible((prev) => !prev)}
                className="text-muted-foreground absolute inset-y-0 right-0 flex items-center px-3 transition-colors hover:text-foreground cursor-pointer"
                disabled={isLoading}
              >
                {isConfirmVisible ? (
                  <Eye className="size-4" aria-hidden="true" />
                ) : (
                  <EyeOff className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
            <FieldDescription>Please confirm your password matches.</FieldDescription>
          </Field>

          <Field>
            <Button type="submit" variant="gradient" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing you up..." : "Sign up"}
              {!isLoading && <ArrowRight className="size-4" aria-hidden="true" />}
            </Button>
          </Field>

          {/* <FieldSeparator>Or continue with</FieldSeparator> */}

          <Field>
            {/* <Button variant="outline" type="button" disabled>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-4"
                aria-hidden="true"
              >
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  fill="currentColor"
                />
              </svg>
              Sign up with GitHub
            </Button> */}
            <FieldDescription className="px-6 text-center text-slate-700 [&>a]:no-underline [&>a:hover]:no-underline [&>a:hover]:text-sky-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-sky-500 no-underline">
                Sign in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
