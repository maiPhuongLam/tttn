import { eq } from 'drizzle-orm';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { CreateProductDto, UpdateProductDto } from 'src/application/dtos';
import { IProductService } from 'src/domain/services';
import { DB } from 'src/infrastructure/database/connect';
import {
  brands,
  productDetails,
  productItems,
  products,
} from 'src/infrastructure/database/schemas';
import logger from 'src/infrastructure/logger';
import { INTERFACE_NAME, STATUS_CODES } from 'src/shared/constants';
import { BaseResponse } from 'src/shared/types/baseResponse';
import { putObjectUrl } from 'src/shared/utils';

@injectable()
export class ProductController {
  constructor(@inject(INTERFACE_NAME.ProductService) private productService: IProductService) {}

  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.productService.getOneProduct(parseInt(id));
      const response = {
        success: true,
        message: 'Get product is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      logger.error('Get Product failed', error);
      next(error);
    }
  }

  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      let { brand, name, page, pageSize, min_price, max_price } = req.query;
      const filters = {
        ...(brand && { brandId: +brand }),
        ...(name && { name }),
        ...(page && { page }),
        ...(pageSize && { pageSize }),
        ...(min_price && { minPrice: min_price }),
        ...(max_price && { maxPrice: max_price }),
      };
      const data = await this.productService.getProducts(filters);
      const response = {
        success: true,
        message: 'Get products is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      logger.error('Get Products failed', error);
      next(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const createProductDto = <CreateProductDto>req.body;
      const userId = req.userId;
      if (req.file) {
        createProductDto.image = `https://${'tttn2k2'}.s3.${'ap-southeast-1'}.amazonaws.com/productfiles/${req.file.originalname}`;
      }
      const data = await this.productService.createProduct(createProductDto, userId);
      const response = {
        success: true,
        message: 'Create product is successful',
        data,
      };
      return res.status(STATUS_CODES.CREATED).json(response);
    } catch (error) {
      logger.error('Create Product failed', error);
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updateProductDto = <UpdateProductDto>req.body;
      let product = await this.productService.getOneProduct(+id);
      if (updateProductDto.name || updateProductDto.name) {
        await DB.update(products).set(updateProductDto).where(eq(products.id, +id)).execute();
      }
      if (updateProductDto.features) {
        await DB.update(productDetails)
          .set(updateProductDto.features)
          .where(eq(productDetails.id, product.featureId!))
          .execute();
      }
      const [data] = await DB.select()
        .from(products)
        .where(eq(products.id, +id))
        .innerJoin(productDetails, eq(products.featureId, productDetails.id))
        .innerJoin(brands, eq(brands.id, products.brandId))
        .execute();
      const response = {
        success: true,
        message: 'Update product is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      logger.error('Update Product failed', error);
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const data = await this.productService.deleteProduct(parseInt(id));
      const response = {
        success: true,
        message: 'Delete product is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      logger.error('Delete Product failed', error);
      next(error);
    }
  }

  async uploadImage(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const file = req.file;
    const contentType = file.mimetype;
    const filename = file.originalname;

    try {
      const putUrl = await putObjectUrl(file, contentType);
      res.status(201).json(putUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
      next(error);
    }
  }

  async getAllProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DB.select()
        .from(products)
        .innerJoin(productDetails, eq(products.featureId, productDetails.id))
        .execute();
      return res
        .status(STATUS_CODES.OK)
        .json(BaseResponse.success('Get All Products Is Successful', data));
    } catch (error) {
      next(error);
    }
  }

  async getProductDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const [data] = await DB.select()
        .from(products)
        .where(eq(products.id, +id))
        .innerJoin(productDetails, eq(products.featureId, productDetails.id))
        .innerJoin(brands, eq(brands.id, products.brandId))
        .execute();
      return res
        .status(STATUS_CODES.OK)
        .json(BaseResponse.success('Get detail of Products Is Successful', data));
    } catch (error) {
      next(error);
    }
  }

  // async searchProductbyName(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     // logger.error("ERRO")
  //     // const name = req.query.name as string;
  //     // logger.error(name)
  //     // const data = await this.productService.getProductByName(name.toString());
  //     // const response = {
  //     //   success: true,
  //     //   message: 'Delete product is successful',
  //     //   data,
  //     // };
  //     // return res.status(STATUS_CODES.OK).json(response);

  //   } catch (error) {
  //     logger.error('Upload Image Product failed', error);
  //     next(error);
  //   }
  // }
}
