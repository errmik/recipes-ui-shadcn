import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  autoCompleteIngredient,
  getAllIngredients,
  getIngredients,
} from "@/actions/ingredients";
import { Link } from "@/navigation";

export default async function IngredientsResults({
  query,
  currentPage,
  locale,
}: {
  query: string;
  currentPage: number;
  locale: string;
}) {
  // const currentPage = Number(searchParams?.page) || 1;
  let ingredients =
    query && query != ""
      ? ((await autoCompleteIngredient(
          query as string,
          locale,
          currentPage,
          12
        )) as Ingredient[])
      : await getIngredients(locale, currentPage ? currentPage : 1, 12);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {ingredients!.map((ingredient) => (
          <Card key={ingredient._id}>
            <Link
              // key={"link-" + index}
              href={`/ingredients/detail/${ingredient._id}`}
            >
              <Image
                src={
                  ingredient.photo
                    ? ingredient.photo
                    : "https://placehold.co/300x300/png"
                }
                alt={ingredient.name[locale] as string}
                width={300}
                height={300}
                className="object-cover w-full h-48 rounded-t-lg"
              />
            </Link>

            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                {ingredient.name[locale] as string}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {ingredient.description &&
                  ingredient.description[locale] &&
                  (ingredient.description[locale] as string)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
