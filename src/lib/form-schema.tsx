import { z } from "zod";

//Next intl with zod
//https://stackoverflow.com/questions/77367244/a-solution-to-translating-zod-error-messages-using-next-intl

export const LoginSchema = z.object({
  email: z.string().email("This is not a valid email."),
});

export const OtpSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
