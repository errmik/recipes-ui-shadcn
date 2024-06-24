import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages,
} from "next-intl";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import { Header } from "@/components/header";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { UserProvider } from "@/contexts/user-context";
import { TabGroup } from "@/components/tab-group";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function IngredientsLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = useMessages();

  return (
    <section className="w-full py-6 md:py-12 lg:py-16">
      <div className="container gap-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            {/* <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Ingredients
            </h2> */}
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Explore ingredients.
            </p>
          </div>
        </div>
        <TabGroup
          path="/ingredients"
          items={[
            {
              text: "Search",
              slug: "search",
            },
            {
              text: "A-Z",
              slug: "a-z",
            },
            // ...categories.map((x) => ({
            //   text: x.name,
            //   slug: x.slug,
            // })),
          ]}
        />
        <div>{children}</div>
      </div>
    </section>
  );
}
