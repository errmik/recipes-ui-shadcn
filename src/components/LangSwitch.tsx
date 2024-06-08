"use client";
import { capitalize } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FiGlobe, FiSun } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

interface Props {
  locale: string;
}

const LangSwitcher: React.FC<Props> = ({ locale }) => {
  interface Option {
    country: string;
    code: string;
  }
  const pathname = usePathname();
  const urlSegments = useSelectedLayoutSegments();

  const options: Option[] = [
    { country: "English", code: "en" }, // Native name is the same
    // { country: "Deutsch", code: "de" },
    { country: "Français", code: "fr" },
    // { country: "Español", code: "es" },
    // { country: "Русский", code: "ru" },
    // { country: "日本語", code: "ja" },
    // { country: "العربية", code: "ar" },
    // { country: "فارسی", code: "fa" },
  ];

  const t = useTranslations("Lang");
  const [mounted, setMounted] = useState(false);

  const ref = useRef(null);
  useEffect(() => setMounted(true), []);
  if (!mounted)
    return (
      <DropdownMenu open={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="w-[40px]">
            <FiGlobe className="h-4 w-4" />
            <span className="sr-only">Change language</span>
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
              <FiGlobe className="h-4 w-4" />
              <span className="sr-only">Change language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent asChild>
            <div className="p-2 grid gap-2">
              {options.map((lang) => {
                return (
                  <DropdownMenuItem asChild>
                    <Button
                      key={lang.code}
                      lang={lang.code}
                      variant={locale === lang.code ? "default" : "outline"}
                    >
                      <Link
                        key={lang.code}
                        href={`/${lang.code}/${urlSegments.join("/")}`}
                      >
                        {capitalize(lang.country)}
                      </Link>
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
};

export default LangSwitcher;
