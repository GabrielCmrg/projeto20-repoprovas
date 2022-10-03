import { Test as TestModel } from "@prisma/client";

import { Teacher } from "./teacherTypes";
import { Category } from "./categoryTypes";
import { TeacherDiscipline } from "./teacherDisciplineTypes";

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
