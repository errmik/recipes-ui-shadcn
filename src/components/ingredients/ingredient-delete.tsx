"use client";

import React from "react";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { deleteIngredient } from "@/actions/ingredients";

import { toast } from "sonner";
import { useRouter } from "@/navigation";
import { LoaderCircle } from "lucide-react";

function IngredientDelete({ id }: { id: string }) {
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    try {
      var res = await deleteIngredient(id);

      toast.success("");

      setOpen(false);

      router.push("/ingredients/search");
    } catch (err) {
      //setOpen(true);
      toast.error("");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {/* Change because trigger is already a button*/}
        <Button variant="destructive" className="w-16">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction> */}
          <Button
            variant="destructive"
            disabled={pending}
            onClick={async (event) => {
              setPending(true);
              //onSubmit();
              var res = await deleteIngredient(id);

              setOpen(false);
              toast.success("");

              router.push("/ingredients/search");
            }}
          >
            {pending ? "Pending..." : "Continue"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default IngredientDelete;
