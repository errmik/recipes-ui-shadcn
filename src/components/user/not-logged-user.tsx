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
// import { Link } from "@/navigation";
import NavigationLink from "../NavigationLink";
import Link from "next/link";

export default function NotLoggedUser({ locale }: { locale: string }) {
  const t = useTranslations("UserMenu");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem asChild>
          <Link
            key="login"
            href={`/${locale}/login`}
            className="flex items-center gap-2 text-lg font-semibold md:text-base whitespace-nowrap"
            prefetch={false}
          >
            {t("Login")}
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
