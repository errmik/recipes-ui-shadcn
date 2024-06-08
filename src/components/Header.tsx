//"use client";
import { Link } from "../navigation";
import { useTranslations } from "next-intl";
import { FC } from "react";
import LogoIcon from "./icons/logo";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import LangSwitcher from "./LangSwitch";
// import LangSwitcher from "./LangSwitcher";
// import ThemeSwitch from "./ThemeSwitch";
interface Props {
  locale: string;
}
export const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations("Header");

  console.log(t);

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-row items-center justify-between p-5">
      <Link lang={locale} href="/">
        <div className="flex flex-row items-center">
          <div className="mb-2 h-14 w-14">
            <LogoIcon />
          </div>
          <strong className="mx-2 select-none">Template</strong>
        </div>
      </Link>
      <div className="flex flex-row items-center gap-3">
        <nav className="mr-10 inline-flex gap-5">
          <Link lang={locale} href={`/about`}>
            {t("About")}
          </Link>
          <Link lang={locale} href={`/blog`}>
            {t("Blog")}
          </Link>
          <Link lang={locale} href={`/recipes`}>
            {t("Recipes")}
          </Link>
        </nav>

        <ThemeSwitch />
        <LangSwitcher locale={locale} />

        <a
          href="https://github.com/yahyaparvar/nextjs-template"
          target="_blank"
        >
          {/* <div className="size-8">
            <GithubIcon />
          </div> */}
        </a>
      </div>
    </div>
  );
};
