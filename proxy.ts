import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { type Locale, routing } from "./src/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

// Protected routes that require authentication.
const protectedRoutes = ["/dashboard", "/posts", "/profile", "/settings"];

// Auth routes that should redirect to dashboard if already logged in.
const authRoutes = ["/sign-in", "/sign-up"];

function getLocaleAndPathname(pathname: string): { locale: Locale; pathname: string } {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  if (routing.locales.includes(maybeLocale as Locale)) {
    const pathnameWithoutLocale = `/${segments.slice(2).join("/")}`;

    return {
      locale: maybeLocale as Locale,
      pathname: pathnameWithoutLocale === "/" ? "/" : pathnameWithoutLocale.replace(/\/$/, ""),
    };
  }

  return {
    locale: routing.defaultLocale,
    pathname: pathname === "/" ? "/" : pathname.replace(/\/$/, ""),
  };
}

function localizePath(locale: Locale, pathname: string) {
  if (pathname === "/") {
    return `/${locale}`;
  }

  return `/${locale}${pathname}`;
}

function getLocalizedCallbackUrl(request: NextRequest, locale: Locale) {
  const { pathname, search } = request.nextUrl;
  const { pathname: pathnameWithoutLocale } = getLocaleAndPathname(pathname);

  return `${localizePath(locale, pathnameWithoutLocale)}${search}`;
}

function hasSessionCookie(request: NextRequest) {
  return Boolean(
    request.cookies.get("better-auth.session_token")?.value ||
      request.cookies.get("__Secure-better-auth.session_token")?.value,
  );
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { locale, pathname: pathnameWithoutLocale } = getLocaleAndPathname(pathname);
  const sessionCookie = hasSessionCookie(request);

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathnameWithoutLocale === route || pathnameWithoutLocale.startsWith(`${route}/`),
  );
  const isAuthRoute = authRoutes.some((route) => pathnameWithoutLocale === route);

  if (isProtectedRoute && !sessionCookie) {
    const signInUrl = new URL(localizePath(locale, "/sign-in"), request.url);
    signInUrl.searchParams.set("callbackUrl", getLocalizedCallbackUrl(request, locale));
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL(localizePath(locale, "/dashboard"), request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
