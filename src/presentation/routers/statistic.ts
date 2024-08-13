import express from 'express';
import container from 'src/infrastructure/di';
import { INTERFACE_NAME } from 'src/shared/constants';
import { auth, validationResource } from '../middlewares';
import { AuthController, StatisticController } from '../controllers';
import { loginSchema, refreshTokenSchema, registerSchema } from 'src/application/dtos';

const statisticRouter = express.Router();
const controller = container.get<StatisticController>('StatisticController');

// statisticRouter.get('/all', controller.getStatistics.bind(controller));
statisticRouter.get('/', controller.getDailyStatistic.bind(controller));


export default statisticRouter;
