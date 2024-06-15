"use client";
import { title } from "@/components/primitives";
import { Link } from "@/navigation";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { Globe, UserIcon, SettingsIcon } from "lucide-react";

export default function SettingsSideBar() {
  return (
    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
      <TooltipProvider>
        {/* <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          prefetch={false}
        >
          <Package2Icon className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link> */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/settings/bio"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 hover:scale-110"
              prefetch={false}
            >
              <UserIcon className="h-5 w-5" />
              <span className="sr-only">Bio</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Bio</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/settings/lang"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              prefetch={false}
            >
              <Globe className="h-5 w-5" />
              <span className="sr-only">Language</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Language</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/settings/other"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              prefetch={false}
            >
              <SettingsIcon className="h-5 w-5" />
              <span className="sr-only">Other</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Other</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
  );
}
