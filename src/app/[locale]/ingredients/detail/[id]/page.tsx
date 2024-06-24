import Image from "next/image";
import { getIngredient } from "@/actions/ingredients";
import { title } from "@/components/primitives";

export default async function IngredientDetailPage({
  params: { id, locale },
}: {
  params: { id: string; locale: string };
}) {
  const ingredient = await getIngredient(id, locale);

  return (
    /*mx-auto py-12 px-4*/
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
            {/* Avocados are a nutrient-dense fruit that are high in healthy fats,
            fiber, vitamins, and minerals. They have a creamy, buttery texture
            and a mild, nutty flavor. */}
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-4 bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-bold">Nutrition Facts</h2>
          <div className="grid grid-cols-2 gap-y-4">
            <div className="font-medium">Serving Size</div>
            <div>1 medium avocado (150g)</div>
            <div className="font-medium">Calories</div>
            <div>320</div>
            <div className="font-medium">Total Fat</div>
            <div>29g</div>
            <div className="font-medium">Cholesterol</div>
            <div>0mg</div>
            <div className="font-medium">Sodium</div>
            <div>14mg</div>
            <div className="font-medium">Total Carbs</div>
            <div>17g</div>
            <div className="font-medium">Dietary Fiber</div>
            <div>13g</div>
            <div className="font-medium">Sugars</div>
            <div>1.3g</div>
            <div className="font-medium">Protein</div>
            <div>4.6g</div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          *Percent Daily Values are based on a 2,000 calorie diet. Your daily
          values may be higher or lower depending on your calorie needs.
        </p>
      </div>
    </div>
  );
}
