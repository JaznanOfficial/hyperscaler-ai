"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export interface SignupPayload {
  email: string;
  password: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

interface SignupData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface CredentialsPayload {
  email: string;
  password: string;
}

interface ForgotPasswordPayload {
  email: string;
}

interface ResetPasswordPayload {
  token: string;
  password: string;
}

const credentialLogin = async (credentials: CredentialsPayload) => {
  const result = await signIn("credentials", {
    ...credentials,
    redirect: false,
  });

  if (result?.error) {
    throw new Error("Invalid email or password");
  }

  return result;
};

export function useSignupMutations() {
  const signupMutation = useMutation({
    mutationFn: async (
      payload: SignupPayload
    ): Promise<ApiResponse<SignupData>> => {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as ApiResponse<SignupData>;

      if (!data.success) {
        throw new Error(data.message || "Something went wrong");
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
    ): Promise<ApiResponse> => {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as ApiResponse;

      if (!data.success) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    },
  });

  return {
    forgotPasswordMutation,
    isForgotPasswordLoading: forgotPasswordMutation.isPending,
  };
}

export function useResetPasswordMutation() {
  const resetPasswordMutation = useMutation({
    mutationFn: async (payload: ResetPasswordPayload): Promise<ApiResponse> => {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as ApiResponse;

      if (!data.success) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    },
  });

  return {
    resetPasswordMutation,
    isResetPasswordLoading: resetPasswordMutation.isPending,
  };
}
