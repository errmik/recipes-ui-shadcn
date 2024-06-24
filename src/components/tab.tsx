"use client";

import { Link } from "@/navigation";
import type { Item } from "./tab-group";
import clsx from "clsx";

import { useSelectedLayoutSegment } from "next/navigation";

export const Tab = ({
  path,
  parallelRoutesKey,
  item,
}: {
  path: string;
  parallelRoutesKey?: string;
  item: Item;
}) => {
  const segment = useSelectedLayoutSegment(parallelRoutesKey);

  const href = item.slug ? path + "/" + item.slug : path;
  const isActive =
    // Example home pages e.g. `/layouts`
    (!item.slug && segment === null) ||
    segment === item.segment ||
    // Nested pages e.g. `/layouts/electronics`
    segment === item.slug;

  return (
    <Link
      href={href}
      className={clsx("rounded-lg px-3 py-1 text-sm font-medium", {
        "bg-secondary text-secondary-foreground hover:bg-muted-foreground hover:text-muted":
          !isActive,
        "bg-primary text-primary-foreground": isActive,
      })}
    >
      {item.text}
    </Link>
  );
};
