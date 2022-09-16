import express, { Express } from 'express';
import cors from 'cors';

import router from './routers';

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(router);

export default app;
