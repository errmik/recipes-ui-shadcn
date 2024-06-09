"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Sun } from "lucide-react";

export default function ThemeSwitcher({ locale }: { locale: string }) {
  const t = useTranslations("Theme");
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme, themes, theme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted)
    return (
      <DropdownMenu open={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Sun className="h-5 w-5" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Sun className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent asChild>
        <div className="p-2 grid gap-2">
          {themes.map((themeItem) => {
            return (
              <DropdownMenuItem asChild key={"item-" + themeItem}>
                <Button
                  key={"button-" + themeItem}
                  variant={theme === themeItem ? "default" : "outline"}
                  onClick={() => {
                    setTheme(themeItem);
                  }}
                >
                  {t(themeItem)}
                </Button>
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
