"use client";

import { useState, useMemo, JSX, SVGProps } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { autoCompleteIngredient } from "@/actions/ingredients";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchProps {
  locale: string;
}

export default function SearchIngredients({ locale }: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  //let ingredients = await autoCompleteIngredient("", params.locale);

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <>
      <search className="flex items-center sticky top-[68px] z-50 h-[40px] px-1 mt-4 rounded justify-center">
        <div className="w-full max-w-6xl mx-auto ">
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-4xl">
              <Input
                type="search"
                placeholder="Search recipes..."
                // value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pr-12 bg-background"
                defaultValue={searchParams.get("query")?.toString()}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <SearchIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </search>
    </>
  );
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
