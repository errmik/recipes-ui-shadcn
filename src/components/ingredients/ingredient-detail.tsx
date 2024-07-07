import Image from "next/image";
import { deleteIngredient, getIngredient } from "@/actions/ingredients";
import Nutrition from "./nutrition";
import { getUser } from "@/actions/auth";
import { Link } from "@/navigation";
import { Button } from "../ui/button";
import IngredientDelete from "./ingredient-delete";

export default async function IngredientDetail({
  id,
  locale,
}: {
  id: string;
  locale: string;
}) {
  const ingredient = await getIngredient(id, locale);
  const user = await getUser();
  //await new Promise((resolve) => setTimeout(resolve, 2000));

  const handleDelete = async () => {
    await deleteIngredient("");
  };

  return (
    <>
      {user && (
        <div className="flex justify-end w-full">
          <IngredientDelete id={ingredient?._id as string} />
          <Button variant="outline" className="w-16">
            <Link href={`/ingredients/edit/${ingredient?._id}`}>Edit</Link>
            {/* Edit */}
          </Button>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-8 max-w-7xl py-6">
        <div>
          <Image
            src={
              ingredient?.photo
                ? ingredient.photo
                : "https://placehold.co/600x600/png"
            }
            alt="Ingredient photo"
            width={600}
            height={600}
            className="rounded-lg object-cover w-full aspect-square"
          />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{ingredient?.name[locale]}</h1>
            <p className="text-muted-foreground">
              {ingredient?.description && ingredient?.description[locale]
                ? ingredient.description[locale]
                : ""}
            </p>
          </div>
          <Nutrition ingredient={ingredient as Ingredient} />
        </div>
      </div>
    </>
  );
}
