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

export async function createRelation(
  disciplineId: number,
  teacherId: number
): Promise<TeachersDisciplines> {
  const createdRelation: TeachersDisciplines =
    await client.teachersDisciplines.create({
      data: { disciplineId, teacherId },
    });
  return createdRelation;
}
