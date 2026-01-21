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
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">("idle")
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim() || status === "submitting") {
      return
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setStatus("submitting")

    timeoutRef.current = setTimeout(() => {
      setStatus("success")
    }, 1200)
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
                  Check your inbox for a secure link. It expires in 10 minutes.
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
