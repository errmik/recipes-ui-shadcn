import { Pathnames } from "next-intl/navigation";
import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

export const defaultLocale = "en" as const;
export const locales = ["fr", "en", "de"] as const;

//Navigation menu items
//Label is used as a next-intl key
export const navlinks: { path: string; label: string }[] = [
  { path: "/", label: "Home" },
  { path: "/blog", label: "Blog" },
  { path: "/recipes", label: "Recipes" },
  { path: "/ingredients", label: "Ingredients" },
  { path: "/about", label: "About" },
];

//Internationalized pathnames (see commented example below)
export const pathnames = {
  "/": "/",
  "/blog": "/blog",
  "/recipes": "/recipes",
  "/ingredients": "/ingredients",
  "/about": "/about",
} satisfies Pathnames<typeof locales>;

//   export const pathnames = {
//     "/": "/",
//     "/about": {
//       fr: "/apropos",
//       en: "/about",
//       de: "/ueber-uns",
//     },
//   } satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;

//Overrides components and functions with a localized version
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    pathnames: pathnames as typeof pathnames & Record<string & {}, string>,
  });
//  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
