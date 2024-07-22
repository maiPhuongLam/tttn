import express from 'express';
import container from 'src/infrastructure/di';
import { INTERFACE_NAME } from 'src/shared/constants';
import { CartController } from '../controllers'; // Assuming you have a BrandController
import { auth, roles } from '../middlewares';

const cartRouter = express.Router();
const controller = container.get<CartController>(INTERFACE_NAME.CartController);

cartRouter.get('/my-cart', auth, roles(['customer']), controller.getCart.bind(controller));
cartRouter.post('/', auth, roles(['customer']), controller.addToCart.bind(controller));
cartRouter.delete(
  '/:cartItemId',
  auth,
  roles(['customer']),
  controller.removeFromCart.bind(controller),
);

export default cartRouter;
