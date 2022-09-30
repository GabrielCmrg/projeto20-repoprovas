import { Test } from "@prisma/client";

export { Test };
export type TestCreationData = Omit<Test, "id">;
export type TestRequestData = Omit<TestCreationData, "teachersDisciplineId"> & {
  disciplineId: number;
  teacherId: number;
};
