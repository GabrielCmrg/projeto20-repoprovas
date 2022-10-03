import dotenv from "dotenv";

import { Term, TermData, buildTermData } from "../types/termTypes";
import { termRepository } from "../repositories";

dotenv.config();

export async function getAll(): Promise<TermData[]> {
  const terms: Term[] = await termRepository.getAll();
  const refactoredTerms: TermData[] = terms.map(buildTermData);
  return refactoredTerms;
}
