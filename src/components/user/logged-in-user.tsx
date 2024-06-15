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
import { useTranslations } from "next-intl";
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
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link key="settings" href={`/${locale}/settings/bio`}>
            {t("Settings")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            setUser(null);
            await logOut();
          }}
        >
          {t("Logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
