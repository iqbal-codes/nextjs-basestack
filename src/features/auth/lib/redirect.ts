function isSafeLocalPath(pathname: string | null): pathname is string {
  return Boolean(pathname?.startsWith("/") && !pathname.startsWith("//"));
}

export function getAuthRedirectPath(callbackUrl: string | null, locale: string) {
  if (!isSafeLocalPath(callbackUrl)) {
    return "/dashboard";
  }

  if (callbackUrl === `/${locale}`) {
    return "/";
  }

  if (callbackUrl.startsWith(`/${locale}/`)) {
    return callbackUrl.slice(locale.length + 1);
  }

  return callbackUrl;
}

export function getAuthLinkHref(pathname: "/sign-in" | "/sign-up", callbackUrl: string | null) {
  if (!isSafeLocalPath(callbackUrl)) {
    return pathname;
  }

  const searchParams = new URLSearchParams({ callbackUrl });

  return `${pathname}?${searchParams.toString()}`;
}
