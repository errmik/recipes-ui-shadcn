import langConstants from "../constants/lang";

export const getAllIngredients = async (
  lang: string
): Promise<Ingredient[] | null> => {
  if (!lang) lang = langConstants.DEFAULT_LANG;

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    //Post login data to the backend api
    const response = await fetch(
      `${process.env.RECIPES_BACKEND_URL}/ingredients/all?lang=${lang}`,
      requestOptions
    );

    //Response to json
    const data = await response.json();

    return data;
  } catch (err) {
    //Something's not right
    return null;
  }
};

export const getIngredient = async (
  id: string,
  lang: string
): Promise<Ingredient | null> => {
  if (!lang) lang = langConstants.DEFAULT_LANG;

  try {
    //Post login data to the backend api
    const response = await fetch(
      `${process.env.RECIPES_BACKEND_URL}/ingredients/${id}?lang=${lang}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    //Response to json
    const data = await response.json();

    return data;
  } catch (err) {
    //Something's not right
    return null;
  }
};
