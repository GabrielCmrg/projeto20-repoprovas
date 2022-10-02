import { Category } from "@prisma/client";

export { Category };
export type CategoryCreationData = Omit<Category, "id">;
