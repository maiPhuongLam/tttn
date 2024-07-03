import express, { Request, Response, NextFunction } from 'express';
import container from 'src/infrastructure/di';
import { INTERFACE_NAME } from 'src/shared/constants';
import { ProductController } from '../controllers/productController';
import { auth, roles, validationResource } from '../middlewares';
import { createProductSchema, updateProductSchema } from 'src/application/dtos';
import { deleteObject, putObjectUrl, upload } from 'src/shared/utils';

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
productRouter.post('/upload-image', upload.single('image'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const file = req.file;
  console.log("FIle", file);
  const contentType = file.mimetype;
  const filename = file.originalname;

  try {
    const putUrl = await putObjectUrl(file, contentType);
    console.log("putUrl", putUrl);

    const imageUrl = `https://${'tttn2k2'}.s3.${'ap-southeast-1'}.amazonaws.com/productfiles/${filename}`;

    // const [updatedProduct] = await DB.update(products).set({
    //   image: {
    //     public_id: `productfiles/${filename}`,
    //     url: imageUrl
    //   }
    // }).where(eq(products.id, product.id)).returning().execute();

    res.json(putUrl);
  } catch (error) {
    console.error("Image upload failed:", error);
    res.status(500).send('Image upload failed');
  }
});

export default productRouter;
