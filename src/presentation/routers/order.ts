// orderRouter.ts

import express from 'express';
import container from 'src/infrastructure/di';
import { INTERFACE_NAME } from 'src/shared/constants';
import { auth, roles } from '../middlewares';
import { OrderController } from '../controllers';

const orderRouter = express.Router();
const controller = container.get<OrderController>(INTERFACE_NAME.OrderController);

orderRouter.post('/checkout', auth, roles(['customer']), controller.checkout.bind(controller));
orderRouter.post('/webhooks', controller.webhook.bind(controller));

export default orderRouter;
