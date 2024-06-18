import { Express } from 'express';
import healthRouter from './health';

const initRoutes = (app: Express) => {
  app.use('/health', healthRouter);
};

export default initRoutes;
