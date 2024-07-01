import { getIngredient } from "@/actions/ingredients";
import { getUser } from "@/actions/auth";
import { Suspense } from "react";
import { IngredientDetailSkeleton } from "@/components/skeletons/skeletons";
import IngredientEdit from "@/components/ingredients/ingredient-edit";

export default async function IngredientEditPage({
  params: { id, locale },
}: {
  params: { id: string; locale: string };
}) {
  let user = await getUser();

  //Check admin role
  if (!user) return <div>Unauthorized</div>;

  return (
    <>
      <h1 className="text-3xl font-bold mt-4">Edit Ingredient</h1>

      <Suspense key={id} fallback={<IngredientDetailSkeleton />}>
        <IngredientEdit id={id} locale={locale} />
      </Suspense>
    </>
  );
}
