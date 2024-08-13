// orderRouter.ts

import express from 'express';
import container from 'src/infrastructure/di';
import { INTERFACE_NAME } from 'src/shared/constants';
import { auth, roles } from '../middlewares';
import { OrderController } from '../controllers';

const orderRouter = express.Router();
const controller = container.get<OrderController>(INTERFACE_NAME.OrderController);

orderRouter.post('/checkout', auth, controller.checkout.bind(controller));
orderRouter.post('/webhooks', controller.webhook.bind(controller));
orderRouter.get('/history', auth, controller.getHistory.bind(controller));
orderRouter.get('/all', auth, roles(['admin']), controller.getAllOrders2.bind(controller));
orderRouter.get('/:id', auth, controller.getOrderDetails.bind(controller));
orderRouter.put('/:id', auth, roles(['admin']),controller.updateOrderStatus.bind(controller));
orderRouter.get('/', auth, roles(['customer']), controller.getCustomerOrders.bind(controller));

export default orderRouter;
