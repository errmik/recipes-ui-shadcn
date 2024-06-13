"use client";

import React from "react";
import { useFormStatus, useFormState } from "react-dom";
import { Button } from "./ui/button";

interface Props {
  pendingMessage: string;
  text: string;
}

function SubmitButton(props: Props) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="w-full"
    >
      <span className="font-semibold text-white">
        {pending ? props.pendingMessage : props.text}
      </span>
    </Button>
  );
}

export { SubmitButton };
