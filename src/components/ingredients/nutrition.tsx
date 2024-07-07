import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

function getDisplayValue(value: Number | undefined | null, unit: string) {
  return typeof value !== "undefined" && value !== null
    ? (value as number) + unit
    : "N/A";
}

function Nutrition({ ingredient }: { ingredient: Ingredient }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutrition Facts (per 100g)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nutrient</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Calories</TableCell>
              <TableCell>
                {getDisplayValue(ingredient?.calories, "kcal")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fat</TableCell>
              <TableCell>{getDisplayValue(ingredient?.fat, "g")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Carbohydrates</TableCell>
              <TableCell>{getDisplayValue(ingredient?.carbs, "g")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sugars</TableCell>
              <TableCell>{getDisplayValue(ingredient?.sugar, "g")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Protein</TableCell>
              <TableCell>{getDisplayValue(ingredient?.protein, "g")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cholesterol</TableCell>
              <TableCell>
                {getDisplayValue(ingredient?.cholesterol, "mg")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sodium</TableCell>
              <TableCell>{getDisplayValue(ingredient?.sodium, "mg")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fiber</TableCell>
              <TableCell>{getDisplayValue(ingredient?.fiber, "g")}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Nutrition;
