import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages,
} from "next-intl";
import "@/styles/globals.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import { Header } from "@/components/header";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { UserProvider } from "@/contexts/user-context";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function LocaleLayout({
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
    <html
      lang={locale}
      dir={locale === "ar" || locale == "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "bg-bezel min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          // enableSystem
          //Switching theme will change the css 'class' attibute of the <html> element
          attribute="class"
          defaultTheme="light"
          themes={[
            "light",
            "dark",
            // "instagram",
            // "facebook",
            // "discord",
            // "netflix",
            // "twilight",
            // "reddit",
          ]}
        >
          <NextIntlClientProvider
            locale={locale}
            messages={messages as AbstractIntlMessages}
          >
            <NextTopLoader
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
              color="var(--primary)"
              showSpinner={false}
            />
            <UserProvider>
              <main className="bg-background min-h-screen max-w-7xl mx-auto">
                <Header locale={locale} />
                {children}
              </main>
            </UserProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
