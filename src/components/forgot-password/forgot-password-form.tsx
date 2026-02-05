"use client"

import * as React from "react"
import Link from "next/link"

import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong"
      setError(message)
      setStatus("error")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-medium font-['Outfit'] leading-8">Reset your password</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter the email associated with your account and we&apos;ll send a secure reset link.
            </p>
          </div>

          {status === "success" && (
            <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 p-3 rounded-md text-sm">
              Check your inbox for a secure link. It expires in 1 hour.
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 border border-red-100 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

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

          <Field>
            <Button disabled={status === "submitting"} type="submit" variant="gradient" className="w-full">
              {status === "success"
                ? "Link sent"
                : status === "submitting"
                  ? "Sending..."
                  : "Send reset link"}
              {status === "idle" && <ArrowRight className="size-4" aria-hidden="true" />}
            </Button>
          </Field>

          <Field>
            <FieldDescription className="px-6 text-center text-slate-700 [&>a]:no-underline [&>a:hover]:no-underline [&>a:hover]:text-sky-600">
              Remember your password?{" "}
              <Link href="/login" className="font-medium text-sky-500 no-underline">
                Back to login
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
