"use client";

import React, { useState } from "react";
import { handleSignup } from "@/actions/auth";

import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { SignupSchema } from "@/lib/form-schema";
import { FloatingLabelInput } from "../floating-label-input";
import { useRouter } from "next/navigation";

//Using Shadcn, zod and managing state
//Can't use useFormState and useFromStatus with Shadcn yet
export const SignupForm = () => {
  const t = useTranslations("Login");

  //Pass the translation function to the Zod schema
  const formSchema = SignupSchema(t);

  //Create the form using the zod validator
  const form = useForm<z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", name: "" },
  });

  let router = useRouter();

  const [errors, setErrors] = React.useState<SignupError>({
    success: true,
  });

  async function onSubmit(data: z.output<typeof formSchema>) {
    //Form submission is pending
    setPending(true);
    //Reset the errors : no errors so far
    setErrors({
      success: true,
    });

    //Get the posted data
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);

    //Create account
    let res = await handleSignup(null, formData);

    if (res && !res.success) {
      //Something's not right
      setErrors(res);
      setPending(false);
    } else {
      //Ok, Otp sent
      router.push(`/otp?email=${res.email}`);
    }
  }

  const [pending, setPending] = useState(false);

  return (
    <Form {...form}>
      {/* General errors (not directly linked to an input field) */}
      {errors &&
        !errors.success &&
        errors.errors &&
        errors.errors["global"] && (
          <div className="text-alert">{errors.errors["global"]}</div>
        )}
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
                  <FloatingLabelInput
                    placeholder=""
                    {...field}
                    id="floating-name"
                    label={t("Name")}
                    onKeyDown={() =>
                      setErrors({
                        success: true,
                      })
                    }
                  />
                </FormControl>
                {/* <FormDescription>{t("YourEmail")}</FormDescription> */}
                <FormMessage>
                  {errors &&
                    !errors.success &&
                    errors.errors &&
                    errors.errors["name"] &&
                    t(errors.errors["name"])}
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
                  <FloatingLabelInput
                    placeholder=""
                    {...field}
                    id="floating-email"
                    label={t("Email")}
                    onKeyDown={() =>
                      setErrors({
                        success: true,
                      })
                    }
                  />
                </FormControl>
                {/* <FormDescription>{t("YourEmail")}</FormDescription> */}
                <FormMessage>
                  {errors &&
                    !errors.success &&
                    errors.errors &&
                    errors.errors["email"] &&
                    t(errors.errors["email"])}
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
            {pending ? t("Pending") : t("CreateAccount")}
          </Button>
          {/* <div className="">
            <SubmitButton text={t("Login")} pendingMessage="Pending..." />
          </div> */}
        </div>
      </form>
    </Form>
  );
};
