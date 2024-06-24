"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { GithubIcon } from "../icons";
import { useTranslations } from "next-intl";

interface Props {
  clientId: string;
}

//Login with GitHub button.
//Will redirect to the GitHub OAuth url on click.
export default function LoginWithGitHub(props: Props) {
  let githubUrl = `https://github.com/login/oauth/authorize?client_id=${props.clientId}&response_type=code&scope=user:email`;

  let t = useTranslations("Login");
  let router = useRouter();

  function handleClick() {
    setPending(true);
    router.push(githubUrl);
  }

  const [pending, setPending] = useState(false);

  return (
    <Button
      aria-disabled={pending}
      disabled={pending}
      color="primary"
      className="w-full rounded-lg"
      onClick={handleClick}
    >
      <span className="p-4">
        {pending ? t("Pending") : t("LoginWithGithub")}
      </span>

      <GithubIcon />
    </Button>
  );
}
