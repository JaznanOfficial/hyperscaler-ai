"use client"

import * as React from "react"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
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
      toast.error("Invalid reset token", { richColors: true })
      setStatus("error")
      return
    }

    setStatus("submitting")

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
      const successMessage = typeof data.message === "string" ? data.message : "Password updated successfully"
      toast.success(successMessage, { richColors: true })
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong"
      toast.error(message, { richColors: true })
      setStatus("error")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-medium font-['Outfit'] leading-8">Create a new password</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Choose a strong password you haven&apos;t used before.
            </p>
          </div>

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
            <FieldDescription>Use at least 8 characters with a mix of numbers and letters.</FieldDescription>
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

          <Field>
            <Button
              type="submit"
              variant="gradient"
              className="w-full"
              disabled={status === "submitting" || !password.trim() || passwordsMismatch}
            >
              {status === "success"
                ? "Password updated"
                : status === "submitting"
                  ? "Updating..."
                  : "Update password"}
              {status === "idle" && <ArrowRight className="size-4" aria-hidden="true" />}
            </Button>
          </Field>

          <Field>
            <FieldDescription className="px-6 text-center text-slate-700 [&>a]:no-underline [&>a:hover]:no-underline [&>a:hover]:text-sky-600">
              Remembered it?{" "}
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
