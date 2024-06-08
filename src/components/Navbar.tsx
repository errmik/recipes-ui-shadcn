"use client";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import LangSwitcher from "./LangSwitch";
import LogoIcon from "@/components/icons/logo";
import MenuIcon from "@/components/icons/menu";
import MountainIcon from "./icons/mountain";
import { useEffect, useState } from "react";

interface NavBarProps {
  locale: string;
}

export default function NavBar({ locale }: NavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      //   className="flex h-20 w-full shrink-0 items-center px-4 md:px-6
      // fixed top-0 left-0 z-50 bg-white dark:bg-gray-950 transition-all duration-300"
      className={`fixed top-0 left-0 z-50 flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-white dark:bg-gray-950 transition-all duration-300 ${
        isScrolled ? "-translate-y-full" : ""
      }`}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetClose asChild>
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
              <LogoIcon className="h-6 w-6" />
              <span className="text-lg font-bold">Recipes</span>
            </Link>
          </SheetClose>
          <div className="grid gap-4 py-6">
            <SheetClose asChild>
              <Link
                href="#"
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                Home
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="#"
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                About
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="#"
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                Services
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="#"
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                Contact
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      {/* Link to the homepage hidden for large screens and above.
      Visually placed with ml-auto (centered since 2nd elements of 3)*/}
      <Link
        href="/"
        className="ml-auto flex items-center gap-2 lg:hidden"
        prefetch={false}
      >
        <LogoIcon className="h-6 w-6" />
        <span className="text-lg font-bold">Recipes</span>
      </Link>

      {/* Link to the homepage hidden for small and medium screens.*/}
      <Link
        href="/"
        className="flex items-center gap-2 hidden lg:flex"
        prefetch={false}
      >
        <LogoIcon className="h-6 w-6" />
        <span className="text-lg font-bold">Recipes</span>
      </Link>

      {/* Nav links hidden for small and medium screens.*/}
      <div className="ml-auto hidden lg:flex">
        <nav className="flex items-center gap-6">
          <Link
            href="#"
            className="text-lg font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-lg font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-lg font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Services
          </Link>
          <Link
            href="#"
            className="text-lg font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* Theme and lang switchers.
      Visually placed with ml-auto (right aligned since 3rd element of 3)*/}
      <div className="ml-auto">
        <ThemeSwitch />
        <LangSwitcher locale={locale} />
      </div>
    </header>
  );
}
