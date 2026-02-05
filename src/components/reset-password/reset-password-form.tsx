"use client";

import { ArrowRight, Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/hooks/use-auth-mutations";
import { cn } from "@/lib/utils";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [visibleField, setVisibleField] = useState<
    "password" | "confirm" | null
  >(null);
  const { resetPasswordMutation, isResetPasswordLoading } =
    useResetPasswordMutation();
  const buttonLabel = (() => {
    if (status === "success") {
      return "Password updated";
    }

    if (isResetPasswordLoading) {
      return "Updating...";
    }

    return "Update password";
  })();

  const passwordsMismatch =
    confirmPassword.trim().length > 0 && password !== confirmPassword;

  const toggleVisibility = (field: "password" | "confirm") => {
    setVisibleField((current) => (current === field ? null : field));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isResetPasswordLoading || !password.trim() || passwordsMismatch) {
      return;
    }

    if (!token) {
      toast.error("Invalid reset token", { richColors: true });
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const data = await resetPasswordMutation.mutateAsync({ token, password });
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
                disabled={isResetPasswordLoading}
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
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => toggleVisibility("password")}
                type="button"
              >
                {visibleField === "password" ? (
                  <EyeClosed aria-hidden="true" className="size-4" />
                ) : (
                  <Eye aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
            <FieldDescription>
              Use at least 8 characters with uppercase, lowercase, and a number.
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
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => toggleVisibility("confirm")}
                type="button"
              >
                {visibleField === "confirm" ? (
                  <EyeClosed aria-hidden="true" className="size-4" />
                ) : (
                  <Eye aria-hidden="true" className="size-4" />
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
                isResetPasswordLoading || !password.trim() || passwordsMismatch
              }
              type="submit"
              variant="gradient"
            >
              {buttonLabel}
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
