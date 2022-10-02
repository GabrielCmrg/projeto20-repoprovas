import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function signupInfos() {
  const password: string = faker.internet.password();
  return {
    email: faker.internet.email(),
    password: password,
    confirmPassword: password,
  };
}

export function token() {
  const secretKey: string = process.env.JWT_SECRET_KEY || "secret";
  const token: string = jwt.sign({ userId: 1 }, secretKey);
  return token;
}
