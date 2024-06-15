import { title } from "@/components/primitives";
import SettingsSideBar from "@/components/user/settings-side-bar";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className={title()}>Settings</h1>
      {/* <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"> */}
      <section className="flex w-full min-h-screen">
        {/* <div className="inline-block max-w-lg text-center justify-center bg-blue"> */}
        {/* <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex"> */}
        <aside className="flex flex-col">
          <SettingsSideBar />
        </aside>
        {/* </div> */}
        <div className="bg-blue-500 w-full">{children}</div>
      </section>
    </div>
  );
}
