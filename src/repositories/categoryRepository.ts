import { client } from "../config/database";
import { Category } from "../types/categoryTypes";

export async function getCategoryById(
  categoryId: number
): Promise<Category | null> {
  const category: Category | null = await client.category.findUnique({
    where: { id: categoryId },
  });
  return category;
}
