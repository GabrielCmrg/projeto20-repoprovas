import Joi from "joi";

export function termArraySchema() {
  const teacherSchema = Joi.object({
    id: Joi.number().integer().greater(0).required(),
    name: Joi.string().required(),
  });
  const testSchema = Joi.object({
    id: Joi.number().integer().greater(0).required(),
    name: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    teacher: teacherSchema,
  });
  const categorySchema = Joi.object({
    id: Joi.number().integer().greater(0).required(),
    name: Joi.string().required(),
    tests: Joi.array().items(testSchema),
  });
  const disciplineSchema = Joi.object({
    id: Joi.number().integer().greater(0).required(),
    name: Joi.string().required(),
    categories: Joi.array().items(categorySchema),
  });
  const termSchema = Joi.object({
    id: Joi.number().integer().greater(0).required(),
    number: Joi.number().integer().greater(0).required(),
    name: Joi.string()
      .pattern(/^[0-9]+º Periodo$/)
      .required(),
    disciplines: Joi.array().items(disciplineSchema),
  });
  return Joi.array().items(termSchema);
}
