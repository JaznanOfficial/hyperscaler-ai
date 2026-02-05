"use client";

import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const registered = searchParams.get("registered");

  React.useEffect(() => {
    if (registered) {
      toast.success("Account created successfully. Please sign in.", {
        richColors: true,
      });
    }
  }, [registered]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error ?? "Invalid email or password", {
          richColors: true,
        });
        return;
      }

      toast.success("Welcome back!", { richColors: true });
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      toast.error(message, { richColors: true });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="font-['Outfit'] font-medium text-2xl leading-8">
              Login to your account
            </h1>
            <p className="text-balance text-muted-foreground text-sm">
              Enter your email and password to login to your account.
            </p>
          </div>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              disabled={isLoading}
              id="email"
              inputMode="email"
              name="email"
              placeholder="ada@lovelace.ai"
              required
              type="email"
            />
          </Field>

          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                className="ml-auto font-medium text-sky-500 text-sm no-underline hover:text-sky-600"
                href="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative mt-1">
              <Input
                className="pr-10"
                disabled={isLoading}
                id="password"
                name="password"
                placeholder="********"
                required
                type={isPasswordVisible ? "text" : "password"}
              />
              <button
                aria-label={
                  isPasswordVisible ? "Hide password" : "Show password"
                }
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
                disabled={isLoading}
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                type="button"
              >
                {isPasswordVisible ? (
                  <Eye aria-hidden="true" className="size-4" />
                ) : (
                  <EyeOff aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
            <FieldDescription>
              Use at least 8 characters with a mix of letters and numbers.
            </FieldDescription>
          </Field>

          <Field>
            <Button
              className="w-full"
              disabled={isLoading}
              type="submit"
              variant="gradient"
            >
              {isLoading ? "Signing you in..." : "Sign in"}
              {!isLoading && (
                <ArrowRight aria-hidden="true" className="size-4" />
              )}
            </Button>
          </Field>

          <Field>
            <FieldDescription className="px-6 text-center text-slate-700 [&>a:hover]:text-sky-600 [&>a:hover]:no-underline [&>a]:no-underline">
              Don't have an account?{" "}
              <Link
                className="font-medium text-sky-500 no-underline"
                href="/signup"
              >
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
