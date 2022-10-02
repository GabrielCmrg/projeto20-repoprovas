import { client } from "../config/database";
import { TeachersDisciplines } from "../types/teacherDisciplineTypes";

export async function getRelation(
  disciplineId: number,
  teacherId: number
): Promise<TeachersDisciplines | null> {
  const relation: TeachersDisciplines | null =
    await client.teachersDisciplines.findUnique({
      where: { teacherId_disciplineId: { teacherId, disciplineId } },
    });
  return relation;
}
