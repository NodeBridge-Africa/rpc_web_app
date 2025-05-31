import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Since we're using static export, we can't check auth on the server
  // This middleware will just handle basic redirects

  // For now, just return next() as auth will be handled client-side
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/auth/:path*"],
};
