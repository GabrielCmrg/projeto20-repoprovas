import supertest from "supertest";
import Joi from "joi";
import bcrypt from "bcrypt";

import app from "../src/app";
import { client } from "../src/config/database";
import * as user from "./factories/userFactory";

const createAccount = user.signupInfos();

describe("Testing login", () => {
  beforeAll(async () => {
    const hashPassword = bcrypt.hashSync(createAccount.password, 10);
    await client.user.create({
      data: { email: createAccount.email, password: hashPassword },
    });
  });

  it("Should return status code 201 and token given right credentials", async () => {
    const returningSchema = Joi.object({ token: Joi.string().required() });
    const body = {
      email: createAccount.email,
      password: createAccount.password,
    };
    const result = await supertest(app).post("/login").send(body);
    const validation = returningSchema.validate(result.body);
    expect(result.status).toBe(201);
    expect(validation.error).toBeFalsy();
  });

  it("Should return status code 401 if wrong email is sent", async () => {
    const body = {
      email: "babaloo@gmail.com",
      password: createAccount.password,
    };
    const result = await supertest(app).post("/login").send(body);
    expect(result.status).toBe(401);
  });

  it("Should return status code 401 if wrong password is sent", async () => {
    const body = {
      email: createAccount.email,
      password: "wrongPassword",
    };
    const result = await supertest(app).post("/login").send(body);
    expect(result.status).toBe(401);
  });

  afterAll(async () => {
    await client.$disconnect();
  });
});
