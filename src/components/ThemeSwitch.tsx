"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { FiSun } from "react-icons/fi";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function ThemeSwitch() {
  const t = useTranslations("Theme");
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme, themes, theme } = useTheme();
  const ref = useRef(null);
  useEffect(() => setMounted(true), []);
  if (!mounted)
    return (
      <DropdownMenu open={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="w-[40px]">
            <FiSun className="h-4 w-4" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    );

  return (
    <div ref={ref} className="relative inline-block text-left">
      {
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="w-[40px]">
              <FiSun className="h-4 w-4" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent asChild>
            <div className="p-2 grid gap-2">
              {themes.map((themeItem) => {
                return (
                  <DropdownMenuItem asChild>
                    <Button
                      key={themeItem}
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
      }
    </div>
  );
}
