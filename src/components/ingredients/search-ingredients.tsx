"use client";

import { useState, useMemo, JSX, SVGProps } from "react";
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

  function handleSearch(term: string) {
    console.log(term);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

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
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center ml-auto">
                  <FilterIcon className="w-5 h-5" />
                  <span>Filter by category</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={selectedCategory === "all"}
                  onCheckedChange={() => setSelectedCategory("all")}
                >
                  All
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedCategory === "breakfast"}
                  onCheckedChange={() => setSelectedCategory("breakfast")}
                >
                  Breakfast
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedCategory === "lunch"}
                  onCheckedChange={() => setSelectedCategory("lunch")}
                >
                  Lunch
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedCategory === "dinner"}
                  onCheckedChange={() => setSelectedCategory("dinner")}
                >
                  Dinner
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedCategory === "dessert"}
                  onCheckedChange={() => setSelectedCategory("dessert")}
                >
                  Dessert
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </div>
      </search>
    </>
  );
}

function FilterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
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
