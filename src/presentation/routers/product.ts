import express, { Request, Response, NextFunction } from 'express';
import container from 'src/infrastructure/di';
import { INTERFACE_NAME } from 'src/shared/constants';
import { ProductController } from '../controllers/productController';
import { auth, roles, validationResource } from '../middlewares';
import { createProductSchema, updateProductSchema } from 'src/application/dtos';
import { deleteObject, putObjectUrl, upload } from 'src/shared/utils';

const productRouter = express.Router();
const controller = container.get<ProductController>(INTERFACE_NAME.ProductController);

productRouter.get('/all', controller.getAllProduct.bind(controller));
productRouter.get('/:id', controller.getProductDetail.bind(controller));
productRouter.get('/', controller.getProducts.bind(controller));
productRouter.post(
  '/',
  auth,
  roles(['admin']),
  validationResource(createProductSchema),
  controller.createProduct.bind(controller),
);
productRouter.put(
  '/:id',
  auth,
  roles(['admin']),
  validationResource(updateProductSchema),
  controller.updateProduct.bind(controller),
);
productRouter.delete('/:id', auth, roles(['admin']), controller.deleteProduct.bind(controller));
productRouter.post(
  '/upload-image',
  upload.single('image'),
  controller.uploadImage.bind(controller),
);

export default productRouter;
