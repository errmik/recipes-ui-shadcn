import { Login } from "@/components/auth/login";
import LoginWithGitHub from "@/components/auth/loginWithGithub";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const t = await getTranslations("Login");

  return (
    <section className="w-full py-6 md:py-12 lg:py-16">
      <div className="container gap-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            {/* <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Login
            </h2> */}
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {t("LoginOrSignup")}
            </p>
          </div>
          <Login />
        </div>
      </div>
    </section>
  );
}
