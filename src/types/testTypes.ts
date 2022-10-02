import { Test } from "@prisma/client";

export { Test };
export type TestCreationData = Omit<Test, "id">;
export type TestRequestData = Omit<TestCreationData, "teacherDisciplineId"> & {
  disciplineId: number;
  teacherId: number;
};
