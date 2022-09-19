import express, { Express } from 'express';
import 'express-async-errors';
import cors from 'cors';

import router from './routers';
import { errorMiddleware } from './middlewares';

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorMiddleware.errorHandler);

export default app;
