import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { CircleUser } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotLoggedUser({ locale }: { locale: string }) {
  const t = useTranslations("UserMenu");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">{t("ToggleUser")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="p-2 grid gap-2">
          <DropdownMenuItem asChild>
            {/* Next-intl overriden Link component don't work */}
            {/* Add the locale manually int the url */}
            {/* <Link
            key="login"
            href={`/${locale}/login`}
            className="flex items-center gap-2 text-lg font-semibold md:text-base whitespace-nowrap"
            prefetch={false}
          >
            {t("Login")}
          </Link> */}

            <Link key="login" href={`/${locale}/login`}>
              {/* <Button lang={locale} variant="outline"> */}
              {t("Login")}
              {/* </Button> */}
            </Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
