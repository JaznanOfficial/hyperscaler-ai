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

interface CredentialsPayload {
  email: string;
  password: string;
}

interface ForgotPasswordPayload {
  email: string;
}

interface ForgotPasswordResponse {
  message?: string;
  error?: string;
}

const credentialLogin = async (credentials: CredentialsPayload) => {
  const result = await signIn("credentials", {
    ...credentials,
    redirect: false,
  });

  if (result?.error) {
    throw new Error(result.error ?? "Invalid email or password");
  }

  return result;
};

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
    mutationFn: credentialLogin,
  });

  return {
    signupMutation,
    autoLoginMutation,
    isSignupLoading: signupMutation.isPending || autoLoginMutation.isPending,
  };
}

export function useLoginMutation() {
  const loginMutation = useMutation({
    mutationFn: credentialLogin,
  });

  return {
    loginMutation,
    isLoginLoading: loginMutation.isPending,
  };
}

export function useForgotPasswordMutation() {
  const forgotPasswordMutation = useMutation({
    mutationFn: async (
      payload: ForgotPasswordPayload
    ): Promise<ForgotPasswordResponse> => {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as ForgotPasswordResponse;

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      return data;
    },
  });

  return {
    forgotPasswordMutation,
    isForgotPasswordLoading: forgotPasswordMutation.isPending,
  };
}
