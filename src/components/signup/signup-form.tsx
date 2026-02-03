"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
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
  const [error, setError] = React.useState("")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string

    if (password !== confirmPassword) {
      setError("Passwords do not match")
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
    } catch (err: any) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Start managing your hyperscale infrastructure with a few details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <FieldGroup>
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
                <FieldLabel htmlFor="email">Work email</FieldLabel>
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
                    className="text-muted-foreground absolute inset-y-0 right-0 flex items-center px-3 transition-colors hover:text-foreground"
                    disabled={isLoading}
                  >
                    {isPasswordVisible ? (
                      <Eye className="size-4" aria-hidden="true" />
                    ) : (
                      <EyeOff className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Must be at least 8 characters with uppercase, lowercase, and number
                </p>
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
                      isConfirmVisible
                        ? "Hide confirmation password"
                        : "Show confirmation password"
                    }
                    onClick={() => setIsConfirmVisible((prev) => !prev)}
                    className="text-muted-foreground absolute inset-y-0 right-0 flex items-center px-3 transition-colors hover:text-foreground"
                    disabled={isLoading}
                  >
                    {isConfirmVisible ? (
                      <Eye className="size-4" aria-hidden="true" />
                    ) : (
                      <EyeOff className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </Field>
              <Field>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </Field>
            </FieldGroup>
            <p className="text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="font-medium underline-offset-4 hover:underline">
                Log in
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
