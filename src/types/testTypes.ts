import { Test as TestModel } from "@prisma/client";

import { Teacher } from "./teacherTypes";
import { Category } from "./categoryTypes";
import { TeacherDiscipline } from "./teacherDisciplineTypes";
import { DisciplineName } from "./disciplineTypes";

export type Test = TestModel & {
  category?: Category;
  teacherDiscipline?: TeacherDiscipline;
};
export type TestCreationData = Omit<TestModel, "id">;
export type TestRequestData = Omit<TestCreationData, "teacherDisciplineId"> & {
  disciplineId: number;
  teacherId: number;
};
export type TestData = Omit<TestModel, "categoryId" | "teacherDisciplineId"> & {
  teacher: Teacher;
};
export type TestDisciplineData = Omit<
  TestModel,
  "categoryId" | "teacherDisciplineId"
> & {
  discipline: DisciplineName;
};

export function buildTestData(test: Test): TestData {
  return {
    id: test.id,
    name: test.name,
    pdfUrl: test.pdfUrl,
    teacher: test.teacherDiscipline!.teacher!,
  };
}

export function buildTestDisciplineData(test: Test): TestDisciplineData {
  return {
    id: test.id,
    name: test.name,
    pdfUrl: test.pdfUrl,
    discipline: test.teacherDiscipline!.discipline!,
  };
}
