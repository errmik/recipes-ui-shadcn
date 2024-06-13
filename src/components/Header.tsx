import { Link } from "@/navigation";
import { CircleUser, Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeSwitcher from "./ThemeSwitch";
import LangSwitcher from "./LangSwitch";
import { navlinks } from "@/navigation";
import { useTranslations } from "next-intl";
import NavigationLink from "./NavigationLink";
import NotLoggedUser from "./user/not-logged-user";
import { getUser } from "@/actions/auth";
import LoggedInUser from "./user/logged-in-user";

interface HeaderProps {
  locale: string;
}

export async function Header({ locale }: HeaderProps) {
  const t = useTranslations("Navbar");

  let user = await getUser();

  return (
    <header className="sticky top-0 z-50 bg-background">
      <section className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          {navlinks.map((navlink) => {
            return (
              <Link
                key={navlink.path}
                href={navlink.path}
                className="flex items-center gap-2 text-lg font-semibold md:text-base whitespace-nowrap"
                prefetch={false}
              >
                {t(navlink.label)}
              </Link>
            );
          })}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2"
                prefetch={false}
              >
                <Package2 className="h-6 w-6" />
                <span className="text-lg font-bold">Recipes</span>
              </Link>

              {navlinks.map((navlink) => {
                return (
                  <SheetClose asChild key={navlink.path}>
                    <NavigationLink
                      key={navlink.path}
                      href={navlink.path}
                      prefetch={false}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {t(navlink.label)}
                    </NavigationLink>
                  </SheetClose>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:gap-2 lg:gap-4 justify-end">
          {/* Theme and lang switchers.*/}
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
