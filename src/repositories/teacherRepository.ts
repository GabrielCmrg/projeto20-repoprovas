import { client } from "../config/database";
import { Teacher } from "../types/teacherTypes";

export async function getTeacherById(
  teacherId: number
): Promise<Teacher | null> {
  const teacher: Teacher | null = await client.teacher.findUnique({
    where: { id: teacherId },
  });
  return teacher;
}

export async function getAll(): Promise<Teacher[]> {
  return await client.teacher.findMany({
    include: {
      disciplines: {
        include: {
          discipline: true,
          tests: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });
}
