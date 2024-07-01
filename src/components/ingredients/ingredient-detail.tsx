import Image from "next/image";
import { getIngredient } from "@/actions/ingredients";

export default async function IngredientDetail({
  id,
  locale,
}: {
  id: string;
  locale: string;
}) {
  const ingredient = await getIngredient(id, locale);
  //await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-7xl py-6">
      <div className="flex flex-col gap-4">
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

        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">{ingredient?.name[locale]}</h1>
          <p className="text-muted-foreground">
            {ingredient?.description && ingredient?.description[locale]
              ? ingredient.description[locale]
              : ""}
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-4 bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-bold">Nutrition Facts</h2>
          <div className="grid grid-cols-2 gap-y-4">
            <div className="font-medium">Serving Size</div>
            <div>100g</div>
            <div className="font-medium">Calories (kcal)</div>
            <div>
              {ingredient?.calories ? (ingredient?.calories as number) : "N/A"}
            </div>
            <div className="font-medium">Total Fat (g)</div>
            <div>{ingredient?.fat ? (ingredient?.fat as number) : "N/A"}</div>
            <div className="font-medium">Total Carbs (g)</div>
            <div>
              {ingredient?.carbs ? (ingredient?.carbs as number) : "N/A"}
            </div>
            <div className="font-medium">Sugars (g)</div>
            <div>
              {ingredient?.sugar ? (ingredient?.sugar as number) : "N/A"}
            </div>
            <div className="font-medium">Protein (g)</div>
            <div>
              {ingredient?.protein ? (ingredient?.protein as number) : "N/A"}
            </div>

            <div className="font-medium">Cholesterol (mg)</div>
            <div>
              {ingredient?.cholesterol
                ? (ingredient?.cholesterol as number)
                : "N/A"}
            </div>
            <div className="font-medium">Sodium (mg)</div>
            <div>
              {ingredient?.sodium ? (ingredient?.sodium as number) : "N/A"}
            </div>

            <div className="font-medium">Dietary Fiber (g)</div>
            <div>
              {ingredient?.fiber ? (ingredient?.fiber as number) : "N/A"}
            </div>
          </div>
        </div>
        {/* <p className="text-sm text-muted-foreground">
          *Percent Daily Values are based on a 2,000 calorie diet. Your daily
          values may be higher or lower depending on your calorie needs.
        </p> */}
      </div>
    </div>
  );
}
