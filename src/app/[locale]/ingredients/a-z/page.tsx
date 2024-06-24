import { getAllIngredients } from "@/actions/ingredients";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Link } from "@/navigation";

export default async function AlphabeticalIngredientsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const ingredients = await getAllIngredients(locale);

  let groupedIngredients: { [key: string]: Ingredient[] } = {};

  if (ingredients) {
    for (let ingredient of ingredients) {
      if (!ingredient || !ingredient.name[locale]) continue;

      let firstChar = ingredient.name[locale]![0].toLowerCase();

      if (!groupedIngredients[firstChar]) groupedIngredients[firstChar] = [];

      groupedIngredients[firstChar]?.push(ingredient);
    }
  }

  let orderedIngredients = [];

  //Transform to array
  for (const [key, value] of Object.entries(groupedIngredients)) {
    orderedIngredients.push({ key, value });
  }

  return (
    <>
      <div className="flex">
        {/* <div className="w-max flex content-end">
        <div className="fixed top-15">
          <div>A</div>
          <div>B</div>
          <div>C</div>
          <div>D</div>
          <div>E</div>
          <div>F</div>
          <div>G</div>
          <div>H</div>
          <div>I</div>
          <div>J</div>
          <div>K</div>
          <div>L</div>
          <div>M</div>
          <div>N</div>
          <div>O</div>
          <div>P</div>
          <div>Q</div>
          <div>R</div>
          <div>S</div>
          <div>T</div>
          <div>U</div>
          <div>V</div>
          <div>W</div>
          <div>X</div>
          <div>Y</div>
          <div>Z</div>
        </div>
      </div> */}
        <div className="w-full">
          {orderedIngredients.map((group) => {
            let section = (
              <>
                <h2
                  id={group.key.toLowerCase()}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mt-6"
                >
                  {group.key.toUpperCase()}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {group.value.map((ingredient) => {
                    return (
                      <Link href={`/ingredients/detail/${ingredient._id}`}>
                        {ingredient.name[locale]}
                      </Link>
                    );
                  })}
                </div>
              </>
            );

            return section;
          })}
        </div>

        <aside>
          <nav className="flex flex-col items-center fixed top-0 mt-[70px] h-[90vh] overflow-y-auto">
            <div>
              <a href="#a">A</a>
            </div>
            <div>
              <a href="#b">B</a>
            </div>
            <div>C</div>
            <div>D</div>
            <div>E</div>
            <div>F</div>
            <div>G</div>
            <div>H</div>
            <div>
              <a href="#i">I</a>
            </div>
            <div>J</div>
            <div>K</div>
            <div>L</div>
            <div>M</div>
            <div>N</div>
            <div>O</div>
            <div>P</div>
            <div>Q</div>
            <div>R</div>
            <div>S</div>
            <div>T</div>
            <div>U</div>
            <div>V</div>
            <div>W</div>
            <div>X</div>
            <div>Y</div>
            <div>Z</div>
          </nav>
        </aside>
      </div>
      <ScrollToTop />
    </>
  );
}
