import { Router } from "express";

import authRouter from "./authRouter";
import testRouter from "./testRouter";
import termRouter from "./termRouter";
import teacherRouter from "./teacherRouter";

const router: Router = Router();

router.use(authRouter);
router.use(testRouter);
router.use(termRouter);
router.use(teacherRouter);

export default router;
