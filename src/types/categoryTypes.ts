import { Category as CategoryModel } from "@prisma/client";

import { Test, TestData } from "./testTypes";

export type Category = CategoryModel & {
  tests?: Test[];
};
export type CategoryCreationData = Omit<CategoryModel, "id">;
export type CategoryData = CategoryModel & {
  tests: TestData[];
};
