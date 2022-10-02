import { Discipline } from "@prisma/client";

export { Discipline };
export type DisciplineCreationData = Omit<Discipline, "id">;
