"use client";
import { capitalize } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Globe } from "lucide-react";

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
          <Globe className="h-5 w-5">
            <span className="sr-only">{t("ToggleLang")}</span>
          </Globe>
        </DropdownMenuTrigger>
      </DropdownMenu>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:scale-110">
        <Globe className="h-5 w-5">
          <span className="sr-only">{t("ToggleLang")}</span>
        </Globe>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("Lang")}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {options.map((lang) => {
          return (
            <DropdownMenuItem
              asChild
              key={"item-" + lang.code}
              disabled={locale === lang.code}
              lang={locale}
            >
              <Link
                key={"link-" + lang.code}
                href={`/${lang.code}/${urlSegments.join("/")}`}
                lang={locale}
              >
                {capitalize(lang.country)}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="secondary" size="icon" className="rounded-full">
//           <Globe className="h-5 w-5" />
//           <span className="sr-only">{t("ToggleLang")}</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent asChild>
//         <div className="p-2 grid gap-2">
//           {options.map((lang) => {
//             return (
//               <DropdownMenuItem asChild key={"item-" + lang.code}>
//                 <Button
//                   key={"button-" + lang.code}
//                   lang={lang.code}
//                   variant={locale === lang.code ? "default" : "outline"}
//                 >
//                   <Link
//                     key={"link-" + lang.code}
//                     href={`/${lang.code}/${urlSegments.join("/")}`}
//                   >
//                     {capitalize(lang.country)}
//                   </Link>
//                 </Button>
//               </DropdownMenuItem>
//             );
//           })}
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// <DropdownMenuContent align="end">
//   <DropdownMenuLabel>{t("Theme")}</DropdownMenuLabel>
//   <DropdownMenuSeparator />
//   {themes.map((themeItem) => {
//     return (
//       <DropdownMenuItem asChild key={"item-" + themeItem}>
//         <DropdownMenuItem
//           key={"menuitem-" + themeItem}
//           onClick={async () => {
//             setTheme(themeItem);
//           }}
//           disabled={theme === themeItem}
//           className={theme === themeItem ? "font-bold" : ""}
//           lang={locale}
//         >
//           {t(themeItem)}
//         </DropdownMenuItem>
//       </DropdownMenuItem>
//     );
//   })}
// </DropdownMenuContent>;

export default LangSwitcher;
