import { client } from "../config/database";
import { Term } from "../types/termTypes";

export async function getAll(): Promise<Term[]> {
  const terms: Term[] = await client.term.findMany({
    include: {
      disciplines: {
        include: {
          teachers: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return terms;
}
