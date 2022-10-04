import { Discipline as DisciplineModel } from "@prisma/client";

import { CategoryData } from "./categoryTypes";
import { Term } from "./termTypes";
import { TeacherDiscipline } from "./teacherDisciplineTypes";
import { groupTestsByCategories } from "../services/testService";

export type Discipline = DisciplineModel & {
  term?: Term;
  teachers?: TeacherDiscipline[];
};
export type DisciplineCreationData = Omit<DisciplineModel, "id">;
export type DisciplineData = Omit<DisciplineModel, "termId"> & {
  categories: CategoryData[];
};

export function buildDisciplineData(discipline: Discipline): DisciplineData {
  return {
    id: discipline.id,
    name: discipline.name,
    categories: groupTestsByCategories(discipline.teachers!),
  };
}
