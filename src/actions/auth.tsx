"use server";

/////////////////////
//Server actions !
/////////////////////
import { StatusCodes } from "http-status-codes";
import { redirect } from "next/navigation";
import errorCodes from "@/constants/errorCodes.js";
import { cookies } from "next/headers";
import { LoginSchema, SignupSchema } from "@/lib/form-schema";
import { getTranslations } from "next-intl/server";
import successCodes from "@/constants/successCodes";

//Send a login query to the backend api.
export const handleLogin = async (previousState: any, formData: FormData) => {
  const t = await getTranslations("Login");

  //Transform form data to zod compatible format
  let zodFormData = Object.fromEntries(formData);

  //Pass translation function to the zod schema
  let formSchema = LoginSchema(t);

  //Zod validation
  const validation = formSchema.safeParse(zodFormData);

  if (!validation.success) {
    return {
      success: false,
      msg: "Email invalid",
      code: errorCodes.INVALID_EMAIL,
      // name: null,
      // email: null,
      errors: validation.error.issues,
    };
  }

  //Get posted data
  const email = formData.get("email");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  };

  try {
    //Post login data to the backend api
    const response = await fetch(
      `${process.env.RECIPES_BACKEND_URL}/auth/login`,
      requestOptions
    );

    //Response to json
    const data = await response.json();

    if (
      response.status === StatusCodes.OK &&
      data.code === successCodes.OTP_SENT
    ) {
      //Ok, Otp sent to email
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

export const handleSignup = async (
  previousState: any,
  formData: FormData
): Promise<SignupError> => {
  const t = await getTranslations("Login");

  //Transform form data to zod compatible format
  let zodFormData = Object.fromEntries(formData);

  //Pass translation function to the zod schema
  let formSchema = SignupSchema(t);

  //Zod validation
  const validation = formSchema.safeParse(zodFormData);

  //If zod did not validate the data
  if (!validation.success) {
    //errors on name ?
    let nameErrors = validation.error.issues.filter((issue) =>
      issue.path.includes("name")
    );

    //errors on email ?
    let emailErrors = validation.error.issues.filter((issue) =>
      issue.path.includes("email")
    );

    var errors: Record<string, string> = {};

    if (nameErrors && nameErrors.length > 0)
      errors["name"] = nameErrors.map((issue) => issue.message).join();

    if (emailErrors && emailErrors.length > 0)
      errors["email"] = emailErrors.map((issue) => issue.message).join();

    return {
      success: false,
      msg: "Invalid data",
      code: errorCodes.INVALID_DATA,
      errors,
    };
  }
  const email = formData.get("email");
  const name = formData.get("name");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  };

  try {
    //Post signup data to the backend api
    const response = await fetch(
      `${process.env.RECIPES_BACKEND_URL}/auth/signup`,
      requestOptions
    );

    const data = await response.json();

    if (response.status === StatusCodes.OK) {
      return {
        success: true,
        ...data,
      };
    } else {
      if (data.code == errorCodes.USER_ALREADY_EXISTS) {
        return {
          success: false,
          ...data,
          errors: { email: errorCodes.USER_ALREADY_EXISTS },
        };
      } else {
        return {
          success: false,
          ...data,
          errors: { global: data.code },
        };
      }
    }
  } catch (err) {
    return {
      success: false,
      msg: "Internal error",
      code: errorCodes.INTERNAL_ERROR,
      errors: { global: errorCodes.INTERNAL_ERROR },
    };
  }
};

export const handleVerifyOtp = async (
  previousState: any,
  formData: FormData
) => {
  const email = formData.get("email");
  const otp = formData.get("otp");

  if (!email) {
    return {
      success: false,
      msg: "Invalid email",
      code: errorCodes.INVALID_EMAIL,
      user: null,
    };
  }

  if (!otp) {
    return {
      success: false,
      msg: "Invalid email",
      code: errorCodes.INVALID_OTP,
      user: null,
    };
  }

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  };

  try {
    const response = await fetch(
      `${process.env.RECIPES_BACKEND_URL}/auth/verify`,
      requestOptions
    );

    console.log(response);

    const data = await response.json();
    console.log(data);

    if (response.status === StatusCodes.OK) {
      console.log("SUCCESSS");

      //Set cookies
      //expires: new Date(response.session.expiresAt),
      let accessToken = data.accessToken;
      cookies().set("recipes_access_token", data.accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 10 * 60 * 1000,
        path: "/",
      });

      cookies().set("recipes_refresh_token", data.refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      });

      cookies().set("recipes_user", JSON.stringify(data.user), {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      });

      return {
        success: true,
        msg: data.msg,
        code: data.code,
        user: data.user,
      };
    } else {
      return {
        success: false,
        msg: data.msg,
        code: data.code,
        user: null,
      };
    }
  } catch (err) {
    return {
      success: false,
      msg: "TODO",
      code: "TODO",
      user: null,
    };
  }
};

export const logOut = async () => {
  console.log("Clearing cookies");
  cookies().delete("recipes_user");
  cookies().delete("recipes_access_token");
  cookies().delete("recipes_refresh_token");

  //TODO : backend logout

  redirect("/");
};

export const getUser = async () => {
  var user = cookies().get("recipes_user");

  if (!user || !user.value) return null;

  return JSON.parse(user.value);
};
