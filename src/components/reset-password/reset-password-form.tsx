"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"

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

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle")
  const [error, setError] = React.useState("")
  const [visibleField, setVisibleField] = React.useState<"password" | "confirm" | null>(null)

  const passwordsMismatch =
    confirmPassword.trim().length > 0 && password !== confirmPassword

  const toggleVisibility = (field: "password" | "confirm") => {
    setVisibleField((current) => (current === field ? null : field))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (status === "submitting" || !password.trim() || passwordsMismatch) {
      return
    }

    if (!token) {
      setError("Invalid reset token")
      setStatus("error")
      return
    }

    setStatus("submitting")
    setError("")

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setStatus("success")
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err: any) {
      setError(err.message)
      setStatus("error")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create a new password</CardTitle>
          <CardDescription>
            Choose a strong password you haven&apos;t used here before.
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
                <FieldLabel htmlFor="new-password">New password</FieldLabel>
                <div className="relative mt-1">
                  <Input
                    id="new-password"
                    type={visibleField === "password" ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(event) => {
                      setStatus("idle")
                      setPassword(event.target.value)
                    }}
                    disabled={status === "submitting"}
                    className="pr-10"
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="text-muted-foreground absolute inset-y-0 right-0 flex items-center px-3 transition-colors hover:text-foreground"
                    onClick={() => toggleVisibility("password")}
                    aria-label={visibleField === "password" ? "Hide password" : "Show password"}
                  >
                    {visibleField === "password" ? (
                      <Eye className="size-4" aria-hidden="true" />
                    ) : (
                      <EyeOff className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </Field>
              <Field data-invalid={passwordsMismatch}>
                <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
                <div className="relative mt-1">
                  <Input
                    id="confirm-password"
                    type={visibleField === "confirm" ? "text" : "password"}
                    required
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(event) => {
                      setStatus("idle")
                      setConfirmPassword(event.target.value)
                    }}
                    disabled={status === "submitting"}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="text-muted-foreground absolute inset-y-0 right-0 flex items-center px-3 transition-colors hover:text-foreground"
                    onClick={() => toggleVisibility("confirm")}
                    aria-label={visibleField === "confirm" ? "Hide password" : "Show password"}
                  >
                    {visibleField === "confirm" ? (
                      <Eye className="size-4" aria-hidden="true" />
                    ) : (
                      <EyeOff className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {passwordsMismatch && (
                  <p className="text-sm text-destructive">Passwords don&apos;t match yet.</p>
                )}
              </Field>
            </FieldGroup>
            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full"
                disabled={
                  status === "submitting" || !password.trim() || passwordsMismatch
                }
              >
                {status === "success"
                  ? "Password updated"
                  : status === "submitting"
                    ? "Updating..."
                    : "Update password"}
              </Button>
              {status === "success" && (
                <p className="text-center text-sm text-emerald-600 dark:text-emerald-400">
                  You can now close this tab and login with your new password.
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
