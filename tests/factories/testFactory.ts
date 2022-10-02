import { faker } from "@faker-js/faker";

export function testInfos() {
  return {
    name: faker.lorem.words(4),
    pdfUrl: faker.internet.url(),
    categoryId: 3,
    teacherId: 2,
    disciplineId: 5,
  };
}
