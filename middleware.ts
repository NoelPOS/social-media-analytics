import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Firebase Auth uses client-side tokens — full server-side auth checking with
// middleware requires the Firebase Admin SDK. For this project we use lightweight
// client-side protection (redirect in layout.tsx) as the primary guard and use
// this middleware only for basic path routing logic.

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow all static/api paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/slides") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
