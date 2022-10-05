import { Discipline as DisciplineModel } from "@prisma/client";

import { CategoryData } from "./categoryTypes";
import { Term } from "./termTypes";
import { TeacherDiscipline } from "./teacherDisciplineTypes";
import { Test, TestData, buildTestData } from "./testTypes";
import { groupTestsByCategories } from "../services/testService";

export type Discipline = DisciplineModel & {
  term?: Term;
  teachers?: TeacherDiscipline[];
};
export type DisciplineCreationData = Omit<DisciplineModel, "id">;
export type DisciplineName = Omit<DisciplineModel, "termId">;
export type DisciplineData = DisciplineName & {
  categories: CategoryData[];
};

export function buildDisciplineData(discipline: Discipline): DisciplineData {
  return {
    id: discipline.id,
    name: discipline.name,
    categories: groupTestsByCategories(discipline.teachers!).map(
      (category: CategoryData<Test>): CategoryData<TestData> => {
        const converted: TestData[] = category.tests!.map(buildTestData);
        return {
          id: category.id,
          name: category.name,
          tests: converted,
        };
      }
    ),
  };
}

export function buildDisciplineName(discipline: Discipline): DisciplineName {
  return {
    id: discipline.id,
    name: discipline.name,
  };
}
