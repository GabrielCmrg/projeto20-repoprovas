import { client } from "../config/database";
import { TeacherDiscipline } from "../types/teacherDisciplineTypes";

export async function getRelation(
  disciplineId: number,
  teacherId: number
): Promise<TeacherDiscipline | null> {
  const relation: TeacherDiscipline | null =
    await client.teacherDiscipline.findUnique({
      where: { teacherId_disciplineId: { teacherId, disciplineId } },
    });
  return relation;
}

export async function createRelation(
  disciplineId: number,
  teacherId: number
): Promise<TeacherDiscipline> {
  const createdRelation: TeacherDiscipline =
    await client.teacherDiscipline.create({
      data: { disciplineId, teacherId },
    });
  return createdRelation;
}
