import { Teacher as TeacherModel } from "@prisma/client";

import { CategoryData } from "./categoryTypes";
import { TeacherDiscipline } from "./teacherDisciplineTypes";
import { Test, TestDisciplineData, buildTestDisciplineData } from "./testTypes";
import { groupTestsByCategories } from "../services/testService";

export type Teacher = TeacherModel & {
  disciplines?: TeacherDiscipline[];
};
export type TeacherCreationData = Omit<TeacherModel, "id">;
export type TeacherData = TeacherModel & {
  categories: CategoryData<TestDisciplineData>[];
};

export function buildTeacherData(teacher: Teacher): TeacherData {
  return {
    id: teacher.id,
    name: teacher.name,
    categories: groupTestsByCategories(teacher.disciplines!).map(
      (category: CategoryData<Test>): CategoryData<TestDisciplineData> => {
        const converted: TestDisciplineData[] = category.tests!.map(
          buildTestDisciplineData
        );
        return {
          id: category.id,
          name: category.name,
          tests: converted,
        };
      }
    ),
  };
}
