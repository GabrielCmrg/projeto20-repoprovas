import { Router } from 'express';

import authRouter from './authRouter';

const router: Router = Router();

router.use(authRouter);

export default router;
