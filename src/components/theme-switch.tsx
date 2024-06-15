"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Sun } from "lucide-react";

export default function ThemeSwitcher({ locale }: { locale: string }) {
  const t = useTranslations("Theme");
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme, themes, theme } = useTheme();

  useEffect(() => setMounted(true), []);

  //empty list as long as the component is not fully mounted
  if (!mounted)
    return (
      <DropdownMenu open={false}>
        <DropdownMenuTrigger asChild>
          <Sun className="h-5 w-5">
            <span className="sr-only">{t("ToggleTheme")}</span>
          </Sun>
        </DropdownMenuTrigger>
      </DropdownMenu>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:scale-110">
        <Sun className="h-5 w-5">
          <span className="sr-only">{t("ToggleTheme")}</span>
        </Sun>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("Theme")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((themeItem) => {
          return (
            <DropdownMenuItem
              key={"themeitem-" + themeItem}
              onClick={async () => {
                setTheme(themeItem);
              }}
              disabled={theme === themeItem}
              lang={locale}
            >
              {t(themeItem)}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
