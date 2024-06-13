"use client";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { CircleUser } from "lucide-react";
import { useTranslations } from "next-intl";
// import { Link } from "@/navigation";
import NavigationLink from "../NavigationLink";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/contexts/user-context";
import { getUser, logOut } from "@/actions/auth";

export default function LoggedInUser({
  locale,
}: //   user,
{
  locale: string;
  //   user: any;
}) {
  const getMe = async () => {
    //const router = useRouter();
    console.log("fetching user");
    //Fetch the user
    var userFromSession = await getUser();

    console.log("userFromSession :" + userFromSession);

    if (userFromSession) {
      console.log("userFromSession is null, fetching");
      setUser(userFromSession);
    }

    console.log(user);
  };

  const { user, setUser } = useUser();

  const t = useTranslations("UserMenu");

  useEffect(() => {
    if (!user) getMe();
  });

  console.log(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={
              !user
                ? ""
                : !user?.avatar
                ? `https://robohash.org/${user.userId}`
                : user.avatar
            }
            alt="user"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem asChild>
          <Button
            onClick={async () => {
              setUser(null);
              await logOut();
            }}
          >
            {t("Logout")}
          </Button>
          {/* <Link
            key="logout"
            href={`/${locale}/logout`}
            className="flex items-center gap-2 text-lg font-semibold md:text-base whitespace-nowrap"
            prefetch={false}
            onClick={async () => {
              setUser(null);
              await logOut();
            }}
          >
            {t("Logout")}
          </Link> */}
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
