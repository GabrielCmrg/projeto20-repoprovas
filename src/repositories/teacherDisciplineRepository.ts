import { client } from "../config/database";
import { TeachersDisciplines } from "../types/teacherDisciplineTypes";

export async function getTeacherDiscipline(
  disciplineId: number,
  teacherId: number
): Promise<TeachersDisciplines | null> {
  const teacherDiscipline: TeachersDisciplines | null =
    await client.teachersDisciplines.findUnique({
      where: { teacherId_disciplineId: { teacherId, disciplineId } },
    });
  return teacherDiscipline;
}
