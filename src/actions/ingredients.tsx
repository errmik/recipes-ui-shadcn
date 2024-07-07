"use server";

import errorCodes from "@/constants/errorCodes";
/////////////////////
//Server actions !
/////////////////////

import langConstants from "../constants/lang";
import successCodes from "@/constants/successCodes";
import { StatusCodes } from "http-status-codes";
import { getAccessToken } from "./auth";
import { fetchWithRefresh } from "./fetch";

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
//Send an ingredient update query to the backend
//This backend endpoint has to be authenticated
//The acess token is in the cookies, so is the refresh token if needed
export const updateIngredient = async (
  previousState: any,
  formData: FormData
) => {
  let entries = Object.fromEntries(formData);

  var body = JSON.stringify({
    photo: entries.photo.toString(),
    calories: entries.calories.toString().replace(",", "."),
    fat: entries.fat.toString().replace(",", "."),
    carbs: entries.carbs.toString().replace(",", "."),
    sugar: entries.sugar.toString().replace(",", "."),
    protein: entries.protein.toString().replace(",", "."),
    sodium: entries.sodium.toString().replace(",", "."),
    cholesterol: entries.cholesterol.toString().replace(",", "."),
    fiber: entries.fiber.toString().replace(",", "."),
    //Example : name.fr
    name: {
      [entries.locale.toString()]: entries.name.toString(),
    },
    //Example : description.fr
    description: {
      [entries.locale.toString()]: entries.description.toString(),
    },
  });

  //TODO : if backend responds Unauthorized, try refreshing the acess token and redo the query
  //https://medium.com/@fran_wrote/fetch-with-token-and-refresh-in-next-js-60fd13c6f1b1

  const requestOptions = {
    method: "PUT",
    // headers: {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${token}`,
    // },
    body: body,
  };
  try {
    const response = await fetchWithRefresh(
      `${process.env.RECIPES_BACKEND_URL}/ingredients/${entries.id}`,
      requestOptions
    );

    // const response = await fetch(
    //   `${process.env.RECIPES_BACKEND_URL}/ingredients/${id}`,
    //   requestOptions
    // );
    //Response to json
    const data = response.response;
    //const data = await response.json();
    //const data = await response.json();
    if (
      response.response.status === StatusCodes.OK
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

export const deleteIngredient = async (id: string) => {
  console.log("deleting " + id);

  await new Promise((resolve) => setTimeout(resolve, 3000));
};
