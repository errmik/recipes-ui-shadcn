"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { getIngredient, updateIngredient } from "@/actions/ingredients";
import { FloatingLabelInput } from "../floating-label-input";

export const IngredientForm = ({
  ingredient,
  locale,
}: {
  ingredient: Ingredient | null;
  locale: string;
}) => {
  const t = useTranslations("Login");

  return (
    <form action={updateIngredient} className="space-y-6">
      <Input id="id" name="id" type="hidden" defaultValue={ingredient?._id} />
      <Input id="locale" name="locale" type="hidden" defaultValue={locale} />
      <div className="grid md:grid-cols-2 gap-8 max-w-7xl py-6">
        <div className="flex flex-col gap-4">
          <Image
            src={
              ingredient?.photo
                ? ingredient.photo
                : "https://placehold.co/300x300/png"
            }
            alt="Ingredient Image"
            width={600}
            height={600}
            className="object-cover w-full rounded"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              defaultValue={
                ingredient?.name && ingredient?.name[locale]
                  ? (ingredient?.name[locale] as string)
                  : ""
              }
            >
              {/* {ingredient?.name[locale]} */}
            </Input>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={
                ingredient?.description && ingredient?.description[locale]
                  ? (ingredient?.description[locale] as string)
                  : ""
              }
              className="min-h-[100px]"
            />
          </div>

          {/* calories: { type: Number }, //in kcal
  carbs: { type: Number }, //in grams
  protein: { type: Number }, //in grams
  fat: { type: Number }, //in grams
  cholesterol: { type: Number }, //in milligrams
  sugar: { type: Number }, //in grams
  sodium: { type: Number }, //in milligrams
  fiber: { type: Number }, //in grams */}

          <div className="bg-muted p-4">
            <h2>Nutrition Facts (for 100g)</h2>

            <div className="grid grid-cols-2 gap-4 p-4">
              {/* className="grid gap-2" */}

              <div>
                {/* <Label htmlFor="calories">Calories (kcal)</Label> */}
                <FloatingLabelInput
                  id="calories"
                  name="calories"
                  label="Calories (kcal)"
                  type="decimal"
                  defaultValue={ingredient?.calories as number}
                  className="bg-background"
                />
              </div>
              <div>
                {/* <Label htmlFor="fat">Fat (g)</Label> */}
                <FloatingLabelInput
                  id="fat"
                  name="fat"
                  label="Fat (g)"
                  type="decimal"
                  defaultValue={ingredient?.fat as number}
                  className="bg-background"
                />
              </div>
              <div>
                {/* <Label htmlFor="carbs">Carbs (g)</Label> */}
                <FloatingLabelInput
                  id="carbs"
                  name="carbs"
                  label="Carbs (g)"
                  type="decimal"
                  defaultValue={ingredient?.carbs as number}
                  className="bg-background"
                />
              </div>
              <div>
                {/* <Label htmlFor="sugar">Sugar (g)</Label> */}
                <FloatingLabelInput
                  id="sugar"
                  name="sugar"
                  label="Sugar (g)"
                  type="decimal"
                  defaultValue={ingredient?.sugar as number}
                  className="bg-background"
                />
              </div>

              <div>
                {/* <Label htmlFor="protein">Protein (g)</Label> */}
                <FloatingLabelInput
                  id="protein"
                  name="protein"
                  label="Protein (g)"
                  type="decimal"
                  defaultValue={ingredient?.protein as number}
                  className="bg-background"
                />
              </div>
              <div>
                {/* <Label htmlFor="cholesterol">Cholesterol (mg)</Label> */}
                <FloatingLabelInput
                  id="cholesterol"
                  name="cholesterol"
                  label="Cholesterol (mg)"
                  type="decimal"
                  defaultValue={ingredient?.cholesterol as number}
                  className="bg-background"
                />
              </div>
              <div>
                {/* <Label htmlFor="sodium">Sodium (mg)</Label> */}
                <FloatingLabelInput
                  id="sodium"
                  name="sodium"
                  label="Sodium (mg)"
                  type="decimal"
                  defaultValue={ingredient?.sodium as number}
                  className="bg-background"
                />
              </div>
              <div>
                {/* <Label htmlFor="fiber">Fiber (g)</Label> */}
                <FloatingLabelInput
                  id="fiber"
                  name="fiber"
                  label="Fiber (g)"
                  type="decimal"
                  defaultValue={ingredient?.fiber as number}
                  className="bg-background"
                />
              </div>
            </div>
          </div>
          <Button type="submit" className="ml-auto">
            Save Ingredient
          </Button>
        </div>
      </div>
    </form>
  );
};
