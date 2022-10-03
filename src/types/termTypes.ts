import { Term as TermModel } from "@prisma/client";

import { Discipline, DisciplineData } from "./disciplineTypes";

export type Term = TermModel & {
  disciplines?: Discipline[];
};
export type TermData = Term & {
  name: string;
  disciplines: DisciplineData[];
};
