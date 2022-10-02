import supertest from "supertest";
import Joi from "joi";

import app from "../src/app";
import { client } from "../src/config/database";
import * as user from "./factories/userFactory";

describe("Testing sing-up", () => {
  beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
  });

  it("Should return status code 201 and the created user", async () => {
    const returnSchema = Joi.object({
      id: Joi.number().integer().greater(0).required(),
      email: Joi.string().email().required(),
    });
    const body = user.signupInfos();
    const result = await supertest(app).post("/signup").send(body);
    const validation = returnSchema.validate(result.body);
    const createdUser = await client.user.findFirst();
    expect(result.status).toBe(201);
    expect(validation.error).toBeFalsy();
    expect(createdUser).toBeTruthy();
  });

  it("Should return status code 422 when password is different from confirmation", async () => {
    const body = user.signupInfos();
    body.confirmPassword = "differentPassword";
    const result = await supertest(app).post("/signup").send(body);
    const createdUser = await client.user.findFirst();
    expect(result.status).toBe(422);
    expect(createdUser).toBeFalsy();
  });

  it("Should return status code 409 when email is in use", async () => {
    const body = user.signupInfos();
    await client.user.create({
      data: { email: body.email, password: body.password },
    });
    const result = await supertest(app).post("/signup").send(body);
    const createdUser = await client.user.findFirst();
    expect(result.status).toBe(409);
    expect(createdUser).toBeFalsy();
  });

  afterAll(async () => {
    await client.$disconnect();
  });
});
