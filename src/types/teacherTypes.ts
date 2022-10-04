import { Teacher as TeacherModel } from "@prisma/client";

import { CategoryData } from "./categoryTypes";
import { TeacherDiscipline } from "./teacherDisciplineTypes";
import { TestDisciplineData } from "./testTypes";

export type Teacher = TeacherModel & {
  disciplines?: TeacherDiscipline[];
};
export type TeacherCreationData = Omit<TeacherModel, "id">;
export type TeacherData = TeacherModel & {
  categories: CategoryData<TestDisciplineData>[];
};
