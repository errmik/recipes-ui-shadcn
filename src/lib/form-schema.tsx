import { z } from "zod";

//Next intl with zod
//https://stackoverflow.com/questions/77367244/a-solution-to-translating-zod-error-messages-using-next-intl

// export const LoginSchema = z.object({
//   email: z.string().email("This is not a valid email."),
// });

export const LoginSchema = (t: (arg: string) => string) =>
  z.object({
    email: z.string().email(t("InvalidEmail")),
  });

export const SignupSchema = (t: (arg: string) => string) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: t("NameMinLength") })
      .max(40, { message: t("NameMaxLength") }),
    email: z.string().email(t("InvalidEmail")),
  });

export const OtpSchema = (t: (arg: string) => string) =>
  z.object({
    otp: z.string().min(6, {
      message: t("OtpMustBe6Chars"),
    }),
  });

// export const BaseSchema = (t: (arg: string) => string) =>
//   z.object({
//     name: z.string().min(1, { message: t("errors.Name is required") }),
//   });
