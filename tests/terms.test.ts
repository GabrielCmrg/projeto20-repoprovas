import supertest from "supertest";

import app from "../src/app";
import { client } from "../src/config/database";
import * as user from "./factories/userFactory";
import * as term from "./factories/termFactory";

const token = user.token();

describe("Testing creation of test", () => {
  beforeAll(async () => {
    const test = {
      name: "Planning test",
      pdfUrl: "https://www.orimi.com/pdf-test.pdf",
      categoryId: 3,
      teacherDisciplineId: 5,
    };
    await client.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY`;
    await client.test.create({ data: test });
  });

  it("Should return status code 200 and a list of terms", async () => {
    const returnSchema = term.termArraySchema();
    const result = await supertest(app)
      .get("/terms")
      .set("Authorization", `Bearer ${token}`)
      .send();
    const validation = returnSchema.validate(result.body);
    expect(result.status).toBe(200);
    expect(validation.error).toBeFalsy();
  });

  afterAll(async () => {
    await client.$disconnect();
  });
});