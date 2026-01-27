"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

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
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false)

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
          <form className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="full-name">Full name</FieldLabel>
                <Input id="full-name" type="text" placeholder="Ada Lovelace" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Work email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="ada@lovelace.ai"
                  required
                  inputMode="email"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="********"
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                    className="text-muted-foreground absolute inset-y-0 right-0 flex items-center px-3 transition-colors hover:text-foreground"
                  >
                    {isPasswordVisible ? (
                      <Eye className="size-4" aria-hidden="true" />
                    ) : (
                      <EyeOff className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
                <div className="relative mt-1">
                  <Input
                    id="confirm-password"
                    type={isConfirmVisible ? "text" : "password"}
                    placeholder="********"
                    className="pr-10"
                    required
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
                <Button type="submit" className="w-full">
                  Create account
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
