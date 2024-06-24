import { NextResponse } from "next/server";

//Endpoint called by the GitHub OAuth process, after the user is authenticated by GitHub.
//GitHub provides a 'code' in the query, that is then used in the Recipes backend, to get the acces tokens.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  //Code sent by GitHub
  const code = searchParams.get("code");

  //Code is passed to the Recipes backend
  const res = await fetch(
    `${process.env.RECIPES_BACKEND_URL}/auth/github?code=${code}`
  );

  const data = await res.json();

  //At some point, if there's an error, redirect to login with an error message ?

  //Prepare the redirect response
  const nextResponse = NextResponse.redirect(new URL("/recipes", request.url));

  //Place the cookies (access token, refresh token and user data)
  nextResponse.cookies.set("recipes_access_token", data.accessToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 10 * 60 * 1000,
    path: "/",
  });
  nextResponse.cookies.set("recipes_refresh_token", data.refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });
  nextResponse.cookies.set("recipes_user", JSON.stringify(data.user), {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });

  return nextResponse;
}
