import { Router } from "express";

import authRouter from "./authRouter";
import testRouter from "./testRouter";
import termRouter from "./termRouter";

const router: Router = Router();

router.use(authRouter);
router.use(testRouter);
router.use(termRouter);

export default router;
