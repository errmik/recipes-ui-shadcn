import { getIngredient } from "@/actions/ingredients";
import { IngredientForm } from "@/components/ingredients/ingredient-form";
import { generateFlagFromLocale } from "@/lib/utils";

export default async function IngredientEdit({
  id,
  locale,
}: {
  id: string;
  locale: string;
}) {
  const ingredient = await getIngredient(id, locale);

  //await new Promise((resolve) => setTimeout(resolve, 2000));

  //not found management

  return (
    <>
      <p className="text-muted-foreground">
        Update the details for <b>{ingredient?.name[locale]}</b> in{" "}
        <span className={`fi fi-${generateFlagFromLocale(locale)}`}></span>
      </p>
      <IngredientForm ingredient={ingredient} locale={locale} />
    </>
  );
}
