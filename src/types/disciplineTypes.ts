import { Discipline as DisciplineModel } from "@prisma/client";

import { CategoryData } from "./categoryTypes";
import { Term } from "./termTypes";
import { TeacherDiscipline } from "./teacherDisciplineTypes";

export type Discipline = DisciplineModel & {
  term?: Term;
  teachers?: TeacherDiscipline[];
};
export type DisciplineCreationData = Omit<Discipline, "id">;
export type DisciplineData = Discipline & {
  categories: CategoryData[];
};
