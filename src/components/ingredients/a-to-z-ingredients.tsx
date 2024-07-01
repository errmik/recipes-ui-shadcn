import { getAllIngredients } from "@/actions/ingredients";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Link } from "@/navigation";

interface Props {
  locale: string;
}

export default async function AToZIngredients({ locale }: Props) {
  const ingredients = await getAllIngredients(locale);

  let groupedIngredients: { [key: string]: Ingredient[] } = {};
  let atoz: string[] = [];

  if (ingredients) {
    for (let ingredient of ingredients) {
      if (!ingredient || !ingredient.name || !ingredient.name[locale]) continue;

      let firstChar = ingredient.name[locale]![0].toLowerCase();
      //Remove diacritics
      firstChar = firstChar.normalize("NFD").replace(/\p{Diacritic}/gu, "");

      if (!groupedIngredients[firstChar]) groupedIngredients[firstChar] = [];

      if (!atoz.includes(firstChar)) atoz.push(firstChar);

      groupedIngredients[firstChar]?.push(ingredient);
    }
  }

  let orderedIngredients = [];

  //Transform to array
  for (const [key, value] of Object.entries(groupedIngredients)) {
    orderedIngredients.push({ key, value });
  }

  //Used to sort with diacritics
  const collator = new Intl.Collator();

  return (
    <>
      <nav className="flex items-center sticky top-[68px] z-50 bg-secondary h-[30px] px-1 mt-4 shadow-b rounded justify-center">
        {atoz.map((letter) => {
          return (
            <div
              key={letter}
              className="text-xs sm:text-sm lg:text-lg mx-0.5 sm:mx-1 md:mx-2"
            >
              <a href={`#${letter.toLowerCase()}`}>{letter.toUpperCase()}</a>
            </div>
          );
        })}
      </nav>

      {orderedIngredients.map((group, index) => {
        let section = (
          <section key={group.key.toLowerCase()} id={group.key.toLowerCase()}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mt-6">
              {group.key.toUpperCase()}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {group.value
                .sort(function (a, b) {
                  return collator.compare(
                    a.name[locale] as string,
                    b.name[locale] as string
                  );
                })
                .map((ingredient, index) => {
                  return (
                    <Link
                      key={"link-" + index}
                      href={`/ingredients/detail/${ingredient._id}`}
                    >
                      {ingredient.name[locale]}
                    </Link>
                  );
                })}
            </div>
          </section>
        );

        return section;
      })}

      <ScrollToTop />
    </>
  );
}
