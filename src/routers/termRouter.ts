import { Router } from "express";

import { termController } from "../controllers";
import { validationMiddlewares } from "../middlewares";

const termRouter: Router = Router();
termRouter.use(validationMiddlewares.validateHeader);

termRouter.get("/terms", termController.getAll);

export default termRouter;
