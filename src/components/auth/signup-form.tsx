"use client";

import React, { useState } from "react";
import { handleLogin } from "@/actions/auth";
import { useFormState, useFormStatus } from "react-dom";
import { SubmitButton } from "../submitButton";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { LoginSchema, SignupSchema } from "@/lib/form-schema";
import { FloatingLabelInput } from "../floating-label-input";

//TODO : use a type for
// {
//   success: true,
//   msg: "",
//   code: "",
//   name: null,
//   email: null,
// }

//Using Shadcn, zod and managing state
//Can't use useFormState and useFromStatus with Shadcn yet
export const SignupForm = () => {
  //TODO

  const t = useTranslations("Login");

  const formSchema = SignupSchema(t);

  const form = useForm<z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", name: "" },
  });

  let router = useRouter();

  const [errors, setErrors] = React.useState({
    success: true,
    msg: "",
    code: "",
    name: null,
    email: null,
  });

  async function onSubmit(data: z.output<typeof formSchema>) {
    setPending(true);
    setErrors({
      success: true,
      msg: "",
      code: "",
      name: null,
      email: null,
    });
    const formData = new FormData();
    formData.append("email", data.email);

    let res = await handleLogin(null, formData);

    setPending(false);

    console.log(res);

    if (res && !res.success) {
      console.log(res);
      setErrors(res);
    } else router.push(`/otp?email=${res.email}`);

    //redirect to otp
  }

  const formRef = React.useRef<HTMLFormElement>(null);

  // const { pending } = useFormStatus();

  const [pending, setPending] = useState(false);

  return (
    <Form {...form}>
      <form
        //client side validation
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>{t("Email")}</FormLabel> */}
                <FormControl>
                  {/* <Input
                    placeholder=""
                    {...field}
                    onKeyDown={() =>
                      setErrors({
                        success: true,
                        msg: "",
                        code: "",
                        name: null,
                        email: null,
                      })
                    }
                  /> */}
                  <FloatingLabelInput
                    placeholder=""
                    {...field}
                    id="floating-name"
                    label={t("Name")}
                    onKeyDown={() =>
                      setErrors({
                        success: true,
                        msg: "",
                        code: "",
                        name: null,
                        email: null,
                      })
                    }
                  />
                </FormControl>
                {/* <FormDescription>{t("YourEmail")}</FormDescription> */}
                <FormMessage>
                  {errors && !errors.success && t("ApiErrors." + errors.code)}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>{t("Email")}</FormLabel> */}
                <FormControl>
                  {/* <Input
                    placeholder=""
                    {...field}
                    onKeyDown={() =>
                      setErrors({
                        success: true,
                        msg: "",
                        code: "",
                        name: null,
                        email: null,
                      })
                    }
                  /> */}
                  <FloatingLabelInput
                    placeholder=""
                    {...field}
                    id="floating-email"
                    label={t("Email")}
                    onKeyDown={() =>
                      setErrors({
                        success: true,
                        msg: "",
                        code: "",
                        name: null,
                        email: null,
                      })
                    }
                  />
                </FormControl>
                {/* <FormDescription>{t("YourEmail")}</FormDescription> */}
                <FormMessage>
                  {errors && !errors.success && t("ApiErrors." + errors.code)}
                </FormMessage>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            aria-disabled={pending}
            disabled={pending}
            className="w-full"
          >
            {pending ? t("Pending") : t("Login")}
          </Button>
          {/* <div className="">
            <SubmitButton text={t("Login")} pendingMessage="Pending..." />
          </div> */}
        </div>
      </form>
    </Form>
  );
};
