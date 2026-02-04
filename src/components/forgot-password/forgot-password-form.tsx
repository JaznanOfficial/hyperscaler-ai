"use client"

import * as React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle")
  const [error, setError] = React.useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim() || status === "submitting") {
      return
    }

    setStatus("submitting")
    setError("")

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setStatus("success")
    } catch (err: any) {
      setError(err.message)
      setStatus("error")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Forgot password?</CardTitle>
          <CardDescription>
            Enter the email associated with your account and we&apos;ll send a
            secure reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="reset-email">Email address</FieldLabel>
                <FieldDescription>
                  We&apos;ll send you instructions to reset your password.
                </FieldDescription>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => {
                    setStatus("idle")
                    setError("")
                    setEmail(event.target.value)
                  }}
                  disabled={status === "submitting"}
                  required
                />
              </Field>
            </FieldGroup>
            <div className="flex flex-col gap-3">
              <Button disabled={status === "submitting"} type="submit" className="w-full">
                {status === "success"
                  ? "Link sent"
                  : status === "submitting"
                    ? "Sending..."
                    : "Send reset link"}
              </Button>
              {status === "success" && (
                <p className="text-center text-sm text-emerald-600 dark:text-emerald-400">
                  Check your inbox for a secure link. It expires in 1 hour.
                </p>
              )}
              <p className="text-center text-sm text-muted-foreground">
                Changed your mind?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Back to login
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
