import { TeacherDiscipline as TeacherDisciplineModel } from "@prisma/client";

import { Discipline } from "./disciplineTypes";
import { Teacher } from "./teacherTypes";
import { Test } from "./testTypes";

export type TeacherDiscipline = TeacherDisciplineModel & {
  teacher?: Teacher;
  discipline?: Discipline;
  tests?: Test[];
};
export type TeacherDisciplineCreationData = Omit<TeacherDisciplineModel, "id">;
