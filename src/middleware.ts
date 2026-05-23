import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only the paths that should be handled by the middleware
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};