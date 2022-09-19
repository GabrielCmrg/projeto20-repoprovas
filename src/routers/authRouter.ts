import { Router } from 'express';

import { userController } from '../controllers';
import { validationMiddlewares } from '../middlewares';
import { authSchemas } from '../schemas';

const authRouter: Router = Router();

authRouter.post(
  '/signup',
  validationMiddlewares.validateBody(authSchemas.signupSchema),
  userController.signup
);
authRouter.post(
  '/login',
  validationMiddlewares.validateBody(authSchemas.loginSchema),
  userController.login
);

export default authRouter;
