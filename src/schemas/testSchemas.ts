import Joi from "joi";

import { TestRequestData } from "../types/testTypes";

export const testRequestSchema: Joi.ObjectSchema<TestRequestData> = Joi.object<
  TestRequestData,
  true
>({
  name: Joi.string().trim().required(),
  pdfUrl: Joi.string().trim().uri().required(),
  categoryId: Joi.number().integer().greater(0).required(),
  disciplineId: Joi.number().integer().greater(0).required(),
  teacherId: Joi.number().integer().greater(0).required(),
});
