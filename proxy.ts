import { auth } from "@/backend/config/auth";
import { NextResponse } from "next/server";

const publicRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];
const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];

// Define role-based route access
const ROUTE_ACCESS = {
  "/s-admin": ["ADMIN"],
  "/employee": ["EMPLOYEE", "MANAGER", "ADMIN"],
  "/client": ["CLIENT", "ADMIN"],
} as const;

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
  const userRole = req.auth?.user?.role;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && isLoggedIn && userRole) {
    return NextResponse.redirect(new URL(getRoleBasedRedirect(userRole), nextUrl));
  }

  // Allow public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login
  if (!isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based access for dashboard routes
  if (isLoggedIn && userRole) {
    for (const [route, allowedRoles] of Object.entries(ROUTE_ACCESS)) {
      if (nextUrl.pathname.startsWith(route)) {
        if (!allowedRoles.includes(userRole as any)) {
          // Redirect to appropriate dashboard based on role
          return NextResponse.redirect(new URL(getRoleBasedRedirect(userRole), nextUrl));
        }
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
