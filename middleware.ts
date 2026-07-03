import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "oyenaukri_logged_in";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  // Protect everything under /dashboard and /onboarding
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding")) {
    if (!hasSession) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Auth pages are resolved by AuthProvider, which knows the user's role and
  // onboarding state. The cookie alone does not contain enough information.
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*", "/login", "/signup"],
};
