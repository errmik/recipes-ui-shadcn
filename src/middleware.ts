import createMiddleware from "next-intl/middleware";
import { pathnames, locales, localePrefix, defaultLocale } from "./navigation";

export default createMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix,
});

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(fr|de|en)/:path*",

    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    //"/((?!api|_next|_vercel|.*\\..*).*)",
    "/((?!_next|_vercel|api|.*\\..*).*)",
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
