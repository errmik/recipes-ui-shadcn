import IngredientDetail from "@/components/ingredients/ingredient-detail";
import { Suspense } from "react";
import { IngredientDetailSkeleton } from "@/components/skeletons/skeletons";

export default async function IngredientDetailPage({
  params: { id, locale },
}: {
  params: { id: string; locale: string };
}) {
  return (
    <Suspense fallback={<IngredientDetailSkeleton />}>
      <IngredientDetail id={id} locale={locale} />
    </Suspense>
  );
}
