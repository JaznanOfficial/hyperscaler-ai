"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
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

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || status === "submitting") {
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      const successMessage =
        typeof data.message === "string"
          ? data.message
          : "Reset link sent. Check your inbox.";
      toast.success(successMessage, { richColors: true });
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
              Reset your password
            </h1>
            <p className="text-balance text-muted-foreground text-sm">
              Enter the email associated with your account and we&apos;ll send a
              secure reset link.
            </p>
          </div>

          <Field>
            <FieldLabel htmlFor="reset-email">Email address</FieldLabel>
            <FieldDescription>
              We&apos;ll send you instructions to reset your password.
            </FieldDescription>
            <Input
              disabled={status === "submitting"}
              id="reset-email"
              onChange={(event) => {
                setStatus("idle");
                setEmail(event.target.value);
              }}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
          </Field>

          <Field>
            <Button
              className="w-full"
              disabled={status === "submitting"}
              type="submit"
              variant="gradient"
            >
              {status === "success"
                ? "Link sent"
                : status === "submitting"
                  ? "Sending..."
                  : "Send reset link"}
              {status === "idle" && (
                <ArrowRight aria-hidden="true" className="size-4" />
              )}
            </Button>
          </Field>

          <Field>
            <FieldDescription className="px-6 text-center text-slate-700 [&>a:hover]:text-sky-600 [&>a:hover]:no-underline [&>a]:no-underline">
              Remember your password?{" "}
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
