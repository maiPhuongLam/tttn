import express from 'express';
import 'reflect-metadata';
import morgan from 'morgan';
import cors from 'cors';
import logger from './infrastructure/logger';
import configuration from './config/configuration';
import dotenv from 'dotenv';
import initRoutes from './application/api/routers';

dotenv.config();
function start() {
  const app = express();
  const port = Number(configuration.PORT);
  const baseURL = configuration.BASE_URL || `http://localhost:${port}`;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set('trust proxy', 1);

  // Show routes called in console during development
  if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('dev'));
  }

  initRoutes(app); // Add this line for debugging

  app.listen(port, () => {
    logger.info(`Express server started on ${baseURL}`);
  });
}

start();