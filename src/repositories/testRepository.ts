import { client } from "../config/database";
import { Test, TestCreationData } from "../types/testTypes";

export async function createTest(test: TestCreationData): Promise<Test> {
  const createdTest: Test = await client.test.create({ data: test });
  return createdTest;
}
