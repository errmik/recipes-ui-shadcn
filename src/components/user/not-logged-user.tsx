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
        {/* <Button variant="secondary" size="icon" className="rounded-full"> */}
        <CircleUser className="h-5 w-5 hover:scale-110">
          <span className="sr-only">{t("ToggleUser")}</span>
        </CircleUser>

        {/* </Button> */}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("NotSignedIn")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link key="login" href={`/${locale}/login`}>
            {t("Login")}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
