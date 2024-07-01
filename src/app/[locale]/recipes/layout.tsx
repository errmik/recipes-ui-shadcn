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

export default function RecipesLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // // Providing all messages to the client
  // // side is the easiest way to get started
  // const messages = useMessages();

  return <div>{children}</div>;
}
