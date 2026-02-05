"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  message?: string;
  error?: string;
}

export function useSignupMutations() {
  const signupMutation = useMutation({
    mutationFn: async (payload: SignupPayload): Promise<SignupResponse> => {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as SignupResponse;

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      return data;
    },
  });

  const autoLoginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const result = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
  });

  return {
    signupMutation,
    autoLoginMutation,
    isSignupLoading: signupMutation.isPending || autoLoginMutation.isPending,
  };
}
