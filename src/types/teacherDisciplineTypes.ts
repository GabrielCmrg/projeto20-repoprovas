import { TeacherDiscipline } from "@prisma/client";

export { TeacherDiscipline };
export type TeacherDisciplineCreationData = Omit<TeacherDiscipline, "id">;
