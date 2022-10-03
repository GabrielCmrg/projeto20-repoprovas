import { Request, Response } from "express";

import { TestRequestData, Test } from "../types/testTypes";
import { testService } from "../services";
import { LocalsType } from "../types/requestTypes";

export async function createNewTest(
  req: Request,
  res: Response<any, LocalsType<TestRequestData>>
): Promise<Response> {
  const testInfo: TestRequestData = res.locals.reqBody;
  const createdTest: Test = await testService.registerNewTest(testInfo);
  return res.status(201).json(createdTest);
}
