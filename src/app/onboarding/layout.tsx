import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth } from "@/backend/config/auth";

function getRoleBasedRedirect(role: string): string {
  switch (role) {
    case "ADMIN":
      return "/s-admin";
    case "MANAGER":
    case "EMPLOYEE":
      return "/employee";
    case "CLIENT":
      return "/onboarding/welcome";
    default:
      return "/login";
  }
}

export default async function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  console.log(session.user);

  if (session.user.role !== "CLIENT") {
    redirect(getRoleBasedRedirect(session.user.role));
  }

  return children;
}
