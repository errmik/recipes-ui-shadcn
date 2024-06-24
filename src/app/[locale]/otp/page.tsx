import { OtpForm } from "@/components/auth/otp-form";
import { getTranslations } from "next-intl/server";

export default async function OtpPage({
  searchParams,
}: {
  searchParams: { email: string; name: string };
}) {
  let t = await getTranslations("Login");
  return (
    <section className="w-full py-6 md:py-12 lg:py-16">
      <div className="container gap-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {t("Welcome")}
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {t("YouveBeenSentAnOtp", { email: searchParams.email })}
            </p>
          </div>
          <OtpForm email={searchParams.email} />
        </div>
      </div>
    </section>
  );
}
