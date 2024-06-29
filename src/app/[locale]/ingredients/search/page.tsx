import {
  countAutoCompleteIngredient,
  countIngredients,
} from "@/actions/ingredients";
import IngredientsPagination from "@/components/ingredients/pagination-ingredients";
import IngredientsResults from "@/components/ingredients/results-ingredients";
import SearchIngredients from "@/components/ingredients/search-ingredients";
import { IngredientsResultsSkeleton } from "@/components/skeletons/skeletons";
import { Suspense } from "react";

export default async function IngredientsSearchPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  let totalHits =
    query && query != ""
      ? ((await countAutoCompleteIngredient(query as string, locale)) as number)
      : await countIngredients();

  let totalPages = Math.ceil((totalHits as number) / 12);

  return (
    <div className="flex">
      <div className="w-full">
        <SearchIngredients locale={locale} />
        <Suspense
          key={query + currentPage}
          fallback={<IngredientsResultsSkeleton />}
        >
          <IngredientsResults
            query={query}
            currentPage={currentPage}
            locale={locale}
          />
        </Suspense>

        <div className="mt-5 flex w-full justify-center">
          <IngredientsPagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
