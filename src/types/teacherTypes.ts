import { Teacher } from "@prisma/client";

export { Teacher };
export type TeacherCreationData = Omit<Teacher, "id">;
