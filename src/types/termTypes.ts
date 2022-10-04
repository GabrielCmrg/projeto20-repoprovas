import { Term as TermModel } from "@prisma/client";

import {
  Discipline,
  DisciplineData,
  buildDisciplineData,
} from "./disciplineTypes";

export type Term = TermModel & {
  disciplines?: Discipline[];
};
export type TermData = TermModel & {
  name: string;
  disciplines: DisciplineData[];
};

export function buildTermData(term: Term): TermData {
  return {
    id: term.id,
    number: term.number,
    name: `${term.number}º Periodo`,
    disciplines: term.disciplines!.map(buildDisciplineData),
  };
}
