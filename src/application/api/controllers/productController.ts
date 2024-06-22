import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { CreateProductDto, UpdateProductDto } from 'src/application/dtos';
import { IProductService } from 'src/domain/services';
import logger from 'src/infrastructure/logger';
import { INTERFACE_NAME, STATUS_CODES } from 'src/shared/constants';

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
      const data = await this.productService.getProducts();
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
      const createProductDto: CreateProductDto = req.body;
      const userId = req.userId;

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
      const updateProductDto: UpdateProductDto = req.body;

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
}
