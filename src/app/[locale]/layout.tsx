import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages,
} from "next-intl";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import NextTopLoader from "nextjs-toploader";
import NavBar from "@/components/Navbar";

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
      <body>
        <ThemeProvider
          enableSystem
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
            <NavBar locale={locale} />
            {/* <Header locale={locale} /> */}
            <main className="mx-auto max-w-screen-2xl">{children}</main>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
