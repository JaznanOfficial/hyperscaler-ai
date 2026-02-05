"use client"

import * as React from "react"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const registered = searchParams.get("registered")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
        return
      }

      router.push("/dashboard")
      router.refresh()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again."
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-medium font-['Outfit'] leading-8">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email and password to login to your account.
            </p>
          </div>

          {registered && (
            <div className="bg-green-50 text-green-600 border border-green-100 p-3 rounded-md text-sm">
              Account created successfully! Please sign in.
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 border border-red-100 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

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
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link href="/forgot-password" className="ml-auto text-sm font-medium text-sky-500 no-underline hover:text-sky-600">
                Forgot password?
              </Link>
            </div>
            <div className="relative mt-1">
              <Input
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="********"
                className="pr-10"
                required
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
            <FieldDescription>Use at least 8 characters with a mix of letters and numbers.</FieldDescription>
          </Field>

          <Field>
            <Button type="submit" variant="gradient" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing you in..." : "Sign in"}
              {!isLoading && <ArrowRight className="size-4" aria-hidden="true" />}
            </Button>
          </Field>

          <Field>
            <FieldDescription className="px-6 text-center text-slate-700 [&>a]:no-underline [&>a:hover]:no-underline [&>a:hover]:text-sky-600">
              Don't have an account?{" "}
              <Link href="/signup" className="font-medium text-sky-500 no-underline">
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
