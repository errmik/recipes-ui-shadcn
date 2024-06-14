import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Add Hero Images Here */}
      <Image
        src="/hero-desktop.png"
        width={1038}
        height={576}
        className="hidden md:flex"
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <Image
        src="/hero-mobile.png"
        width={560}
        height={620}
        className="flex md:hidden"
        alt="Screenshot of the dashboard project showing mobile version"
      />
    </main>
  );
}
