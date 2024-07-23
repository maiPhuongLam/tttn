import { Express } from 'express';
import healthRouter from './health';
import authRouter from './auth';
import productRouter from './product';
import { errorHandler } from '../middlewares';
import brandRouter from './brand';
import categoryRouter from './category';
import productItemRouter from './productItem';
import cartRouter from './cart';
import orderRouter from './order';
import warrantyRouter from './warranty';

const appRouter = (app: Express) => {
  app.use('/health', healthRouter);
  app.use('/auth', authRouter);
  app.use('/brands', brandRouter);
  app.use('/categories', categoryRouter);
  app.use('/products', productRouter);
  app.use('/product-items', productItemRouter);
  app.use('/cart', cartRouter);
  app.use('/orders', orderRouter);
  app.use('/warranty', warrantyRouter);
  app.use(errorHandler);
};

export default appRouter;
