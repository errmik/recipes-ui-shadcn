"use client";

import { useState, useMemo, JSX, SVGProps } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

export default function SearchIngredients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const recipes = [
    {
      id: 1,
      title: "Fluffy Pancakes",
      description: "Delicious homemade pancakes with a light and airy texture.",
      category: "breakfast",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Grilled Chicken Salad",
      description:
        "A fresh and healthy salad with grilled chicken and veggies.",
      category: "lunch",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Beef Bolognese",
      description: "A classic Italian pasta dish with a rich meat sauce.",
      category: "dinner",
      image: "/placeholder.svg",
    },
    {
      id: 4,
      title: "Chocolate Chip Cookies",
      description: "Soft and chewy homemade chocolate chip cookies.",
      category: "dessert",
      image: "/placeholder.svg",
    },
    {
      id: 5,
      title: "Vegetable Stir-Fry",
      description: "A colorful and flavorful stir-fry with fresh vegetables.",
      category: "dinner",
      image: "/placeholder.svg",
    },
    {
      id: 6,
      title: "Blueberry Muffins",
      description:
        "Moist and delicious blueberry muffins, perfect for breakfast.",
      category: "breakfast",
      image: "/placeholder.svg",
    },
    {
      id: 7,
      title: "Grilled Salmon with Asparagus",
      description:
        "A healthy and delicious seafood dish with roasted asparagus.",
      category: "lunch",
      image: "/placeholder.svg",
    },
    {
      id: 8,
      title: "Lemon Meringue Pie",
      description:
        "A classic dessert with a tangy lemon filling and fluffy meringue.",
      category: "dessert",
      image: "/placeholder.svg",
    },
  ];
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      if (selectedCategory === "all") {
        return recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return (
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          recipe.category === selectedCategory
        );
      }
    });
  }, [searchTerm, selectedCategory]);
  return (
    <>
      <search className="flex items-center sticky top-[68px] z-50 bg-secondary h-[30px] px-1 mt-4 shadow-b rounded justify-center">
        <div className="grid grid-cols-2 w-full">
          <div className="h-full w-full max-w-md">
            <Input
              type="search"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-full"
            />
          </div>
          {/* <div className="w-[20px]">
            <Button type="submit" variant="ghost" size="full" className="">
              <SearchIcon className="w-5 h-5" />
            </Button>
          </div> */}
          <div className="w-[20px] justify-items-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="full">
                  <FilterIcon className="w-5 h-5" />
                  {/* <span>Filter by category</span> */}
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
            </DropdownMenu>
          </div>
        </div>
      </search>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <Card key={recipe.id}>
            <img
              src="/placeholder.svg"
              alt={recipe.title}
              width={400}
              height={300}
              className="object-cover w-full h-48 rounded-t-lg"
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {recipe.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
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
