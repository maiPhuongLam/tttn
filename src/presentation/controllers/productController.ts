import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { CreateProductDto, UpdateProductDto } from 'src/application/dtos';
import { IProductService } from 'src/domain/services';
import logger from 'src/infrastructure/logger';
import { INTERFACE_NAME, STATUS_CODES } from 'src/shared/constants';
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
      const filter = req.query;
      const data = await this.productService.getProducts(filter);
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

      const data = await this.productService.updateProduct(parseInt(id), updateProductDto);
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
      res.json(putUrl);
      res.status(201).json(putUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
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
