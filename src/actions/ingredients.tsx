"use server";

import errorCodes from "@/constants/errorCodes";
/////////////////////
//Server actions !
/////////////////////

import langConstants from "../constants/lang";
import successCodes from "@/constants/successCodes";
import { StatusCodes } from "http-status-codes";
import { getAccessToken } from "./auth";

export const getAllIngredients = async (
  lang: string
): Promise<Ingredient[] | null> => {
  if (!lang) lang = langConstants.DEFAULT_LANG;

  try {
    const response = await fetch(
      `${process.env.RECIPES_BACKEND_URL}/ingredients/all?lang=${lang}`,
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

export const getIngredients = async (
  lang: string,
  page: number,
  limit: number
): Promise<Ingredient[] | null> => {
  if (!lang) lang = langConstants.DEFAULT_LANG;

  try {
    const response = await fetch(
      `${process.env.RECIPES_BACKEND_URL}/ingredients?lang=${lang}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    //Response to json
    const data = await response.json();

    return data?.ingredients;
  } catch (err) {
    //Something's not right
    return null;
  }
};

export const countIngredients = async (): Promise<number | null> => {
  try {
    const response = await fetch(
      `${process.env.RECIPES_BACKEND_URL}/ingredients/count`,
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

export const getIngredient = async (
  id: string,
  lang: string
): Promise<Ingredient | null> => {
  if (!lang) lang = langConstants.DEFAULT_LANG;

  try {
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

export const autoCompleteIngredient = async (
  text: string,
  lang: string,
  page: number,
  limit: number
): Promise<Ingredient[] | null> => {
  if (!lang) lang = langConstants.DEFAULT_LANG;

  try {
    const response = await fetch(
      `${process.env.RECIPES_BACKEND_URL}/ingredients/search/autocomplete`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, lang, page, limit }),
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

export const countAutoCompleteIngredient = async (
  text: string,
  lang: string
): Promise<number | null> => {
  if (!lang) lang = langConstants.DEFAULT_LANG;

  try {
    const response = await fetch(
      `${process.env.RECIPES_BACKEND_URL}/ingredients/search/autocomplete/count`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, lang }),
        cache: "no-store",
      }
    );

    //Response to json
    const data = await response.json();

    // console.log(data);
    // console.log(data.results);
    // console.log(data.results[0]);
    // console.log(data.results[0].totalCount);

    return data?.results[0]?.totalCount;
  } catch (err) {
    //Something's not right
    return null;
  }
};

//UPDATES
//Send a login query to the backend api.
export const updateIngredient = async (
  // previousState: any,
  formData: FormData
) => {
  const id = formData.get("id") as string;
  const locale = formData.get("locale") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const calories = formData.get("calories") as string;
  const fat = formData.get("fat") as string;
  const carbs = formData.get("carbs") as string;
  const sugar = formData.get("sugar") as string;
  const protein = formData.get("protein") as string;
  const sodium = formData.get("sodium") as string;
  const cholesterol = formData.get("cholesterol") as string;
  const fiber = formData.get("fiber") as string;

  //var formDataz = Object.fromEntries(formData);

  console.log(
    id,
    name,
    description,
    calories,
    fat,
    carbs,
    sugar,
    protein,
    sodium,
    cholesterol,
    fiber
  );

  // const t = await getTranslations("Login");
  // //Transform form data to zod compatible format
  // let zodFormData = Object.fromEntries(formData);
  // //Pass translation function to the zod schema
  // let formSchema = LoginSchema(t);
  // //Zod validation
  // const validation = formSchema.safeParse(zodFormData);
  // if (!validation.success) {
  //   return {
  //     success: false,
  //     msg: "Email invalid",
  //     code: errorCodes.INVALID_EMAIL,
  //     // name: null,
  //     // email: null,
  //     errors: validation.error.issues,
  //   };
  // }
  // //Get posted data
  // const email = formData.get("email");

  //Get access token from cookies
  var token = await getAccessToken();

  //todo check

  var body = JSON.stringify({
    calories: calories.replace(",", "."),
    fat: fat.replace(",", "."),
    carbs: carbs.replace(",", "."),
    sugar: sugar.replace(",", "."),
    protein: protein.replace(",", "."),
    sodium: sodium.replace(",", "."),
    cholesterol: cholesterol.replace(",", "."),
    fiber: fiber.replace(",", "."),
    name: {
      [locale]: name,
    },
    description: {
      [locale]: description,
    },
  });

  // var body = JSON.stringify({
  //   calories: calories.replace(",", "."),
  //   fat: fat.replace(",", "."),,
  //   carbs: carbs.replace(",", "."),,
  //   sugar: sugar.replace(",", "."),,
  //   protein: protein.replace(",", "."),,
  //   sodium: sodium.replace(",", "."),,
  //   cholesterol: cholesterol.replace(",", "."),,
  //   fiber: fiber.replace(",", "."),,
  // });

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body,
  };
  try {
    //Post login data to the backend api
    const response = await fetch(
      `${process.env.RECIPES_BACKEND_URL}/ingredients/${id}`,
      requestOptions
    );
    //Response to json
    const data = await response.json();
    if (
      response.status === StatusCodes.OK
      // &&
      // data.code === successCodes.OTP_SENT
    ) {
      //Ok,ingredient updated
      return {
        success: true,
        ...data,
        // msg: data.msg,
        // code: data.code,
        // name: data.name,
        // email: data.email,
      };
    } else {
      //Something's not right
      return {
        success: false,
        ...data,
        // msg: data.msg,
        // code: data.code,
        // name: null,
        // email: null,
      };
    }
  } catch (err) {
    //Something's not right
    return {
      success: false,
      msg: "Internal error",
      code: errorCodes.INTERNAL_ERROR,
      name: null,
      email: null,
    };
  }
};
