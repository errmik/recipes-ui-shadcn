import IngredientsResults from "@/components/ingredients/results-ingredients";
import SearchIngredients from "@/components/ingredients/search-ingredients";
import { IngredientsResultsSkeleton } from "@/components/skeletons/skeletons";
import { Suspense } from "react";

export default function IngredientsSearchPage({
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
      </div>
    </div>
  );
}
