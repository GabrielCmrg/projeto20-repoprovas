import { Router } from "express";

import { testController } from "../controllers";
import { validationMiddlewares } from "../middlewares";
import { testSchemas } from "../schemas";

const testRouter: Router = Router();
testRouter.use(validationMiddlewares.validateHeader);

testRouter.post(
  "/tests",
  validationMiddlewares.validateBody(testSchemas.testRequestSchema),
  testController.createNewTest
);

export default testRouter;
