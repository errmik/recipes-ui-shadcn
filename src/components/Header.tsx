import { navlinks, Link } from "@/navigation";
import { Menu, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeSwitcher from "./theme-switch";
import LangSwitcher from "./lang-switch";
import { useTranslations } from "next-intl";
import NavigationLink from "./navigation-link";
import NotLoggedUser from "./user/not-logged-user";
import { getUser } from "@/actions/auth";
import LoggedInUser from "./user/logged-in-user";

interface HeaderProps {
  locale: string;
}

export async function Header({ locale }: HeaderProps) {
  const t = useTranslations("Navbar");

  //Backend call to get the connected user, if any
  let user = await getUser();

  return (
    <header className="sticky top-0 z-50 bg-background w-full">
      <section className="mx-auto p-4 flex items-center justify-between">
        {/* nav bar for medium devices and up */}
        <nav className="hidden flex-col gap-6 font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <ChefHat className="h-6 w-6" />
          {navlinks.map((navlink) => {
            return (
              <Link
                key={navlink.path}
                href={navlink.path}
                className="flex items-center gap-2 font-semibold hover:text-linkaccent md:text-base whitespace-nowrap"
                prefetch={false}
              >
                {t(navlink.label)}
              </Link>
            );
          })}
        </nav>
        {/* nav bar for small devices and below*/}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">{t("ToggleMenu")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <div className="flex flex-columns">
                <ChefHat className="h-6 w-6" />
                <span className="text-lg font-bold ml-6">Recipes</span>
              </div>
              {navlinks.map((navlink) => {
                return (
                  <SheetClose asChild key={navlink.path}>
                    <NavigationLink
                      key={navlink.path}
                      href={navlink.path}
                      prefetch={false}
                      className="font-semibold hover:text-linkaccent"
                    >
                      {t(navlink.label)}
                    </NavigationLink>
                  </SheetClose>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
        {/* Theme and lang switchers.*/}
        <div className="flex w-full items-center gap-4 md:gap-2 lg:gap-4 justify-end">
          <ThemeSwitcher locale={locale} />
          <LangSwitcher locale={locale} />
          {user ? (
            <LoggedInUser
              locale={locale}
              // user={user}
            />
          ) : (
            <NotLoggedUser locale={locale} />
          )}
        </div>
      </section>
    </header>
  );
}
