import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";
import LoginWithGitHub from "./loginWithGithub";
import { Divider } from "../divider";

export function Login() {
  const t = useTranslations("Login");

  return (
    <>
      <Tabs defaultValue="login" className="max-w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">{t("Login")}</TabsTrigger>
          <TabsTrigger value="signup">{t("Signup")}</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              {/* <CardTitle>{t("Login")}</CardTitle> */}
              <CardDescription>{t("LoginMessage")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <LoginForm />
            </CardContent>
            {/* <CardFooter>
              <Button type="submit" className="w-full">
                {t("Login")}
              </Button>
            </CardFooter> */}
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              {/* <CardTitle>{t("Signup")}</CardTitle> */}
              <CardDescription>
                <CardDescription>{t("SignupMessage")}</CardDescription>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SignupForm />
            </CardContent>
            {/* <CardFooter>
            <Button className="w-full">Save password</Button>
          </CardFooter> */}
          </Card>
        </TabsContent>
      </Tabs>
      <div className="max-w-[400px] w-full">
        <Divider text="Or" />
      </div>
      <div className="max-w-[400px] w-full">
        <LoginWithGitHub clientId={process.env.AUTH_GITHUB_ID!} />
      </div>
    </>
  );
}
