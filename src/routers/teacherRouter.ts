import { Router } from "express";

import { teacherController } from "../controllers";
import { validationMiddlewares } from "../middlewares";

const teacherRouter: Router = Router();
teacherRouter.use(validationMiddlewares.validateHeader);

teacherRouter.get("/teachers", teacherController.getAll);

export default teacherRouter;
