import merge from "lodash/merge";
import { configureRefreshFetch, fetchJSON } from "refresh-fetch";
import {
  getAccessToken,
  getRefreshToken,
  logOut,
  saveTokensAfterRefresh,
} from "./auth";
import errorCodes from "@/constants/errorCodes";
import { cookies } from "next/headers";

export const getAccessTokenCookie = () => {
  var token = cookies().get("recipes_access_token");

  if (!token || !token.value) return null;

  return token.value;
};

export const getRefreshTokenCookie = () => {
  var token = cookies().get("recipes_refresh_token");

  if (!token || !token.value) return null;

  return token.value;
};

const fetchWithToken = (url: string, options = {}) => {
  const token = getAccessTokenCookie();

  let optionsWithToken = options;
  if (token != null) {
    optionsWithToken = merge({}, options, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return fetchJSON(url, optionsWithToken);
};

// const fetchWithToken = (url: string, options = {}) => {
//   const token = getAccessToken();

//   let optionsWithToken = options;
//   if (token != null) {
//     optionsWithToken = merge({}, options, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   }

//   return fetch(url, optionsWithToken);
// };

const shouldRefreshToken = (error: any) => {
  return (
    //error.status === 401
    // &&
    // error.body.code === errorCodes.TOKEN_EXPIRED
    error.response.status === 401 &&
    error.body.code === errorCodes.TOKEN_EXPIRED
  );
};

const refreshToken = async () => {
  try {
    //const accessToken = await getAccessToken();
    const refreshToken = getRefreshTokenCookie();

    return fetchWithToken(
      `${process.env.RECIPES_BACKEND_URL}/auth/refreshToken`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    )
      .then((response) => {
        saveTokensAfterRefresh(response.body);
      })
      .catch((error) => {
        // Clear token and continue with the Promise catch chain
        // logOut();
        throw error;
      });
  } catch (error: any) {
    // Clear token and continue with the Promise catch chain
    //logOut();
    throw error;
  }
};

const fetchWithRefresh = configureRefreshFetch({
  fetch: fetchWithToken,
  shouldRefreshToken,
  refreshToken,
});

export { fetchWithRefresh };
