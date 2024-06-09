"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { ComponentProps } from "react";
import { Link, pathnames } from "../navigation";

//Encapuslates a next-intl Link to have the possibility to pass props from a parent Shadcn component

export default function NavigationLink<Pathname extends string>({
  href,
  ...rest
}: ComponentProps<typeof Link<Pathname>>) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  const isActive = pathname === href;

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      href={href}
      style={{ fontWeight: isActive ? "bold" : "normal" }}
      {...rest}
    />
  );
}
