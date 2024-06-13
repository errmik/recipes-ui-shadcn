"use client";

import React from "react";
import { handleLogin } from "@/actions/auth";
import { useFormState } from "react-dom";
import { SubmitButton } from "../submitButton";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

//TODO : use a type for
// {
//   success: true,
//   msg: "",
//   code: "",
//   name: null,
//   email: null,
// }

//TODO : do not redirect in the server action
//From the server action, always return data
//Here, display errors if any, or router.push() to otp route
//https://stackoverflow.com/questions/76636460/nextjs-app-router-redirect-in-useeffect-hook
//or permanentRedirect

export const LoginForm = () => {
  const t = useTranslations("Login");

  let router = useRouter();

  const [data, formAction] = useFormState(handleLogin, {
    success: false,
    msg: "",
    code: "",
    name: null,
    email: null,
  });

  const [errors, setErrors] = React.useState({
    success: true,
    msg: "",
    code: "",
    name: null,
    email: null,
  });

  React.useEffect(() => {
    if (data.success) {
      router.push(`/otp?name=${data.name}&email=${data.email}`);
    } else {
      setErrors(data);
    }
  }, [data]);

  return (
    <form action={formAction}>
      <div className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">{t("Email")}</Label>
          <Input id="email" name="email" required type="email" />
          {/* <span className="text-sm text-red-600"></span> */}
        </div>
        {/* <div className="space-y-1">
        <Button type="submit" className="w-full">
          {t("Login")}
        </Button>
      </div> */}

        <div className="">
          <SubmitButton text={t("Login")} pendingMessage="Pending..." />
        </div>
      </div>
    </form>
  );
};
