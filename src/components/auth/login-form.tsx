"use client";

import React, { useState } from "react";
import { handleLogin } from "@/actions/auth";
import { useRouter } from "next/navigation";
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
import { LoginSchema } from "@/lib/form-schema";
import { FloatingLabelInput } from "../floating-label-input";

//Using Shadcn, zod and managing state
//Can't use useFormState and useFromStatus with Shadcn yet
export const LoginForm = () => {
  const t = useTranslations("Login");

  //Pass the translation function to the Zod schema
  const formSchema = LoginSchema(t);

  //Create the form using the zod validator
  const form = useForm<z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  let router = useRouter();

  const [errors, setErrors] = React.useState<LoginError>({
    success: true,
  });

  //Form submitted, data validated, now do the job
  async function onSubmit(data: z.output<typeof formSchema>) {
    //Form submission is pending
    setPending(true);
    //Reset the errors : no errors so far
    setErrors({
      success: true,
    });

    //Get the posted data
    const formData = new FormData();
    formData.append("email", data.email);

    //Authenticate
    let res = await handleLogin(null, formData);

    if (res && !res.success) {
      //Something's not right
      setErrors(res);
      setPending(false);
    } else {
      //Ok, Otp sent
      router.push(`/otp?email=${res.email}`);
    }

    //Keep the pending state till the end ?
    //setPending(false);
  }

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
                  {/* Explicitely set errors from Api. */}
                  {errors && !errors.success && t(errors.code)}
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
        </div>
      </form>
    </Form>
  );
};
