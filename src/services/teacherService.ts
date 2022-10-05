import dotenv from "dotenv";

import { teacherRepository } from "../repositories";
import { Teacher, TeacherData, buildTeacherData } from "../types/teacherTypes";

dotenv.config();

export async function getAll(): Promise<TeacherData[]> {
  const teachers: Teacher[] = await teacherRepository.getAll();
  const refactoredTeachers: TeacherData[] = teachers.map(buildTeacherData);
  return refactoredTeachers;
}
