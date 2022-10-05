import supertest from "supertest";

import app from "../src/app";
import { client } from "../src/config/database";
import * as user from "./factories/userFactory";
import * as teacher from "./factories/teacherFactory";

const token = user.token();

describe("Testing get teachers with tests nested", () => {
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

  it("Should return status code 200 and a list of teachers", async () => {
    const returnSchema = teacher.teacherArraySchema();
    const result = await supertest(app)
      .get("/teachers")
      .set("Authorization", `Bearer ${token}`)
      .send();
    const validation = returnSchema.validate(result.body);
    expect(result.status).toBe(200);
    expect(validation.error).toBeFalsy();
  });

  it("Should return status code 401 when token is invalid", async () => {
    const invalidToken = user.invalidToken();
    const result = await supertest(app)
      .get("/teachers")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send();
    expect(result.status).toBe(401);
  });

  afterAll(async () => {
    await client.$disconnect();
  });
});
