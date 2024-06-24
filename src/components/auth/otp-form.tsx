"use client";

import React, { useState } from "react";
import { handleVerifyOtp } from "@/actions/auth";
import { useRouter } from "next/navigation";
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
import { OtpSchema } from "@/lib/form-schema";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useUser } from "@/contexts/user-context";

//Using Shadcn, zod and managing state
//Can't use useFormState and useFromStatus with Shadcn yet
export const OtpForm = ({ email }: { email: string }) => {
  //Check user ds un effect

  const { user, setUser } = useUser();

  const t = useTranslations("Login");

  //Pass the translation function to the Zod schema
  const formSchema = OtpSchema(t);

  const form = useForm<z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: "" },
  });

  let router = useRouter();

  const [errors, setErrors] = React.useState({
    success: true,
    msg: "",
    code: "",
    user: null,
  });

  async function onSubmit(data: z.output<typeof formSchema>) {
    setPending(true);
    setErrors({
      success: true,
      msg: "",
      code: "",
      user: null,
    });

    const formData = new FormData();
    formData.append("otp", data.otp);
    formData.append("email", email);

    console.log(formData);

    let res = await handleVerifyOtp(null, formData);

    setPending(false);

    // console.log(res);

    if (res && !res.success) {
      setErrors(res);
      return;
    }

    if (res?.user) setUser(res.user);
    // else router.push("/otp");

    //redirect to otp
    router.push("/");
  }

  const [pending, setPending] = useState(false);

  return (
    <Card className="max-w-[400px] w-full">
      <CardHeader>
        {/* <CardTitle>Otp</CardTitle> */}
        <CardDescription>{t("FillYourOtp")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 items-center justify-center">
        <Form {...form}>
          <form
            //client side validation
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Otp</FormLabel> */}
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                        containerClassName="justify-center"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>{t("YourOtp")}</FormDescription>
                    <FormMessage>
                      {errors && !errors.success && errors.msg}
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
      </CardContent>
      {/* <CardFooter>
              <Button type="submit" className="w-full">
                {t("Login")}
              </Button>
            </CardFooter> */}
    </Card>
  );
};
