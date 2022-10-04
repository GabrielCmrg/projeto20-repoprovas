import { Teacher as TeacherModel } from "@prisma/client";

import { TeacherDiscipline } from "./teacherDisciplineTypes";

export type Teacher = TeacherModel & {
  disciplines?: TeacherDiscipline[];
};
export type TeacherCreationData = Omit<TeacherModel, "id">;
