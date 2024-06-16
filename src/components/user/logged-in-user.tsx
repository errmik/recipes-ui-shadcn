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
import { useRouter } from "next/router";

export default function LoggedInUser({
  locale,
  userFromContext,
}: {
  locale: string;
  userFromContext: any;
}) {
  //Still not sure if it's safe to only use the user from the context
  //Checking the user on each page with an effect may lead to more http queries (light ones, the server will only read cookies),
  //but the state of the navbar will be more up-to-date
  //Let's keep the user in the props until a clear decision

  const getMe = async () => {
    //const router = useRouter();

    //Fetch the user
    var userFromSession = await getUser();

    if (userFromSession) {
      console.log("userFromSession is not null : ", userFromSession);
      setUser(userFromSession);
    } else {
      console.log("userFromSession is null");
      //router.push("/");
    }
  };

  const { user, setUser } = useUser();

  const t = useTranslations("UserMenu");

  useEffect(() => {
    if (!user) {
      console.log("user is null, fetching");
      getMe();
    } else {
      console.log("user is not null");
    }
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
            className="hover:scale-110"
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
