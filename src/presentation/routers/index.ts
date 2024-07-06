import { Express } from 'express';
import healthRouter from './health';
import authRouter from './auth';
import productRouter from './product';
import { errorHandler } from '../middlewares';
import brandRouter from './brand';
import categoryRouter from './category';

const appRouter = (app: Express) => {
  app.use('/health', healthRouter);
  app.use('/auth', authRouter);
  app.use('/brands', brandRouter);
  app.use('/categories', categoryRouter);
  app.use('/products', productRouter);
  app.use(errorHandler);
};

export default appRouter;
