import { Category as CategoryModel } from "@prisma/client";

import { Test, TestData } from "./testTypes";

export type Category = CategoryModel & {
  tests?: Test[];
};
export type CategoryCreationData = Omit<Category, "id">;
export type CategoryData = Category & {
  tests: TestData[];
};
