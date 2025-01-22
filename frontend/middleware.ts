import { NextRequest, NextResponse } from "next/server";

import { getSession } from "./lib/auth/session";

const protectedRoutes = ["/dashboard", "/policy", "/product"];
const authRoutes = ["/sign-in", "/sign-up"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  const isAuthRoute = authRoutes.includes(path);

  const session = await getSession();

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
