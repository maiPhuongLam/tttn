import express from 'express';
import container from 'src/infrastructure/di';
import { INTERFACE_NAME } from 'src/shared/constants';
import { ProductItemController } from '../controllers/productItemController';
import { auth, roles, validationResource } from '../middlewares';
import { createProductItemSchema, updateProductItemSchema } from 'src/application/dtos';

const productItemRouter = express.Router();
const controller = container.get<ProductItemController>(INTERFACE_NAME.ProductItemController);

productItemRouter.get('/:id', controller.getProductItem.bind(controller));
productItemRouter.get('/details/:productId', controller.getProductItemsDetails.bind(controller));
productItemRouter.get('/', controller.getProductItems.bind(controller));
productItemRouter.post(
  '/',
  auth,
  roles(['admin']),
  validationResource(createProductItemSchema),
  controller.createProductItem.bind(controller),
);
productItemRouter.patch(
  '/:id',
  auth,
  roles(['admin']),
  validationResource(updateProductItemSchema),
  controller.updateProductItem.bind(controller),
);
productItemRouter.delete(
  '/:id',
  auth,
  roles(['admin']),
  controller.deleteProductItem.bind(controller),
);

export default productItemRouter;
