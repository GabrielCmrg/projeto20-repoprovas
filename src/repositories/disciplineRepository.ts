import { client } from "../config/database";
import { Discipline } from "../types/disciplineTypes";

export async function getDisciplineById(
  disciplineId: number
): Promise<Discipline | null> {
  const discipline: Discipline | null = await client.discipline.findUnique({
    where: { id: disciplineId },
  });
  return discipline;
}
