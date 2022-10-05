import Joi from "joi";

export function teacherArraySchema() {
  const disciplineSchema = Joi.object({
    id: Joi.number().integer().greater(0).required(),
    name: Joi.string().required(),
  });
  const testSchema = Joi.object({
    id: Joi.number().integer().greater(0).required(),
    name: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    discipline: disciplineSchema,
  });
  const categorySchema = Joi.object({
    id: Joi.number().integer().greater(0).required(),
    name: Joi.string().required(),
    tests: Joi.array().items(testSchema),
  });
  const teacherSchema = Joi.object({
    id: Joi.number().integer().greater(0).required(),
    name: Joi.string().required(),
    categories: Joi.array().items(categorySchema),
  });
  return Joi.array().items(teacherSchema);
}
