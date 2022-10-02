import supertest from "supertest";
import Joi from "joi";

import app from "../src/app";
import { client } from "../src/config/database";
import * as test from "./factories/testFactory";
import * as user from "./factories/userFactory";

const token = user.token();

describe("Testing creation of test", () => {
  beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY`;
  });

  it("Should return status code 201 and the created test", async () => {
    const returnSchema = Joi.object({
      id: Joi.number().integer().greater(0).required(),
      name: Joi.string().required(),
      pdfUrl: Joi.string().uri().required(),
      categoryId: Joi.number().integer().greater(0).required(),
      teacherDisciplineId: Joi.number().integer().greater(0).required(),
    });
    const body = test.testInfos();
    const result = await supertest(app)
      .post("/tests")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    const validation = returnSchema.validate(result.body);
    const createdTest = await client.test.findFirst();
    expect(result.status).toBe(201);
    expect(validation.error).toBeFalsy();
    expect(createdTest).toBeTruthy();
  });

  afterAll(async () => {
    await client.$disconnect();
  });
});
