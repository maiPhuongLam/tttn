import express from 'express';
import container from 'src/infrastructure/di';
import { INTERFACE_NAME } from 'src/shared/constants';
import { ProductController } from '../controllers/productController';
import { auth, roles, validationResource } from '../middlewares';
import { createProductSchema, updateProductSchema } from 'src/domain/dtos';

const productRouter = express.Router();
const controller = container.get<ProductController>(INTERFACE_NAME.ProductController);

productRouter.get('/:id', controller.getProduct.bind(controller));
productRouter.get('/', controller.getProducts.bind(controller));
productRouter.post(
  '/',
  auth,
  roles(['admin']),
  validationResource(createProductSchema),
  controller.createProduct.bind(controller),
);
productRouter.patch(
  '/:id',
  auth,
  roles(['admin']),
  validationResource(updateProductSchema),
  controller.updateProduct.bind(controller),
);
productRouter.delete('/:id', auth, roles(['admin']), controller.deleteProduct.bind(controller));

export default productRouter;
