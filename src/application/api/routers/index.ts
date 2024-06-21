import { Express } from 'express';
import healthRouter from './health';
import authRouter from './auth';
import { errorHandler } from '../middlewares';

const appRouter = (app: Express) => {
  app.use('/health', healthRouter);
  app.use('/auth', authRouter);
  app.use(errorHandler);
};

export default appRouter;
