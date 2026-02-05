"use client";

import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [visibleField, setVisibleField] = React.useState<
    "password" | "confirm" | null
  >(null);

  const passwordsMismatch =
    confirmPassword.trim().length > 0 && password !== confirmPassword;

  const toggleVisibility = (field: "password" | "confirm") => {
    setVisibleField((current) => (current === field ? null : field));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "submitting" || !password.trim() || passwordsMismatch) {
      return;
    }

    if (!token) {
      toast.error("Invalid reset token", { richColors: true });
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      const successMessage =
        typeof data.message === "string"
          ? data.message
          : "Password updated successfully";
      toast.success(successMessage, { richColors: true });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message, { richColors: true });
      setStatus("error");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="font-['Outfit'] font-medium text-2xl leading-8">
              Create a new password
            </h1>
            <p className="text-balance text-muted-foreground text-sm">
              Choose a strong password you haven&apos;t used before.
            </p>
          </div>

          <Field>
            <FieldLabel htmlFor="new-password">New password</FieldLabel>
            <div className="relative mt-1">
              <Input
                className="pr-10"
                disabled={status === "submitting"}
                id="new-password"
                minLength={8}
                onChange={(event) => {
                  setStatus("idle");
                  setPassword(event.target.value);
                }}
                placeholder="••••••••"
                required
                type={visibleField === "password" ? "text" : "password"}
                value={password}
              />
              <button
                aria-label={
                  visibleField === "password"
                    ? "Hide password"
                    : "Show password"
                }
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => toggleVisibility("password")}
                type="button"
              >
                {visibleField === "password" ? (
                  <Eye aria-hidden="true" className="size-4" />
                ) : (
                  <EyeOff aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
            <FieldDescription>
              Use at least 8 characters with a mix of numbers and letters.
            </FieldDescription>
          </Field>

          <Field data-invalid={passwordsMismatch}>
            <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
            <div className="relative mt-1">
              <Input
                className="pr-10"
                disabled={status === "submitting"}
                id="confirm-password"
                onChange={(event) => {
                  setStatus("idle");
                  setConfirmPassword(event.target.value);
                }}
                placeholder="Repeat password"
                required
                type={visibleField === "confirm" ? "text" : "password"}
                value={confirmPassword}
              />
              <button
                aria-label={
                  visibleField === "confirm" ? "Hide password" : "Show password"
                }
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => toggleVisibility("confirm")}
                type="button"
              >
                {visibleField === "confirm" ? (
                  <Eye aria-hidden="true" className="size-4" />
                ) : (
                  <EyeOff aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
            {passwordsMismatch && (
              <p className="text-destructive text-sm">
                Passwords don&apos;t match yet.
              </p>
            )}
          </Field>

          <Field>
            <Button
              className="w-full"
              disabled={
                status === "submitting" || !password.trim() || passwordsMismatch
              }
              type="submit"
              variant="gradient"
            >
              {status === "success"
                ? "Password updated"
                : status === "submitting"
                  ? "Updating..."
                  : "Update password"}
              {status === "idle" && (
                <ArrowRight aria-hidden="true" className="size-4" />
              )}
            </Button>
          </Field>

          <Field>
            <FieldDescription className="px-6 text-center text-slate-700 [&>a:hover]:text-sky-600 [&>a:hover]:no-underline [&>a]:no-underline">
              Remembered it?{" "}
              <Link
                className="font-medium text-sky-500 no-underline"
                href="/login"
              >
                Back to login
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
