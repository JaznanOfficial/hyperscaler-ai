import { auth } from "@/backend/config/auth";
import { NextResponse } from "next/server";

const publicRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];
const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/s-admin", nextUrl));
      }
      if (userRole === "CLIENT") {
        return NextResponse.redirect(new URL("/client", nextUrl));
      }
      if (userRole === "EMPLOYEE" || userRole === "MANAGER") {
        return NextResponse.redirect(new URL("/employee", nextUrl));
      }
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (isLoggedIn) {
    if (nextUrl.pathname.startsWith("/s-admin") && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }

    if (nextUrl.pathname.startsWith("/client") && userRole !== "CLIENT") {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }

    if (nextUrl.pathname.startsWith("/employee") && userRole !== "EMPLOYEE" && userRole !== "MANAGER") {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
