import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";

const publicRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];
const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];

type UserRole = "ADMIN" | "EMPLOYEE" | "MANAGER" | "CLIENT";

const ROUTE_ACCESS: Record<string, UserRole[]> = {
  "/s-admin": ["ADMIN"],
  "/employee": ["EMPLOYEE", "MANAGER"],
  "/client": ["CLIENT"],
};

function getRoleBasedRedirect(role: string): string {
  switch (role) {
    case "ADMIN":
      return "/s-admin";
    case "MANAGER":
    case "EMPLOYEE":
      return "/employee";
    case "CLIENT":
      return "/client";
    default:
      return "/login";
  }
}

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role as UserRole | undefined;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute && isLoggedIn && userRole) {
    return NextResponse.redirect(new URL(getRoleBasedRedirect(userRole), nextUrl));
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && userRole) {
    let hasAccess = false;
    
    for (const [route, allowedRoles] of Object.entries(ROUTE_ACCESS)) {
      if (nextUrl.pathname.startsWith(route)) {
        if (allowedRoles.includes(userRole)) {
          hasAccess = true;
        } else {
          return NextResponse.redirect(new URL(getRoleBasedRedirect(userRole), nextUrl));
        }
        break;
      }
    }
    
    if (!hasAccess && (nextUrl.pathname.startsWith("/s-admin") || nextUrl.pathname.startsWith("/employee") || nextUrl.pathname.startsWith("/client"))) {
      return NextResponse.redirect(new URL(getRoleBasedRedirect(userRole), nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
