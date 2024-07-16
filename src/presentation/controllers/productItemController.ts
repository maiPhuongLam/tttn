import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { CreateProductItemDto, UpdateProductItemDto } from 'src/application/dtos';
import { IProductItemService } from 'src/domain/services';
import logger from 'src/infrastructure/logger';
import { INTERFACE_NAME, STATUS_CODES } from 'src/shared/constants';

@injectable()
export class ProductItemController {
  constructor(
    @inject(INTERFACE_NAME.ProductItemService) private productItemService: IProductItemService,
  ) {}

  async getProductItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.productItemService.getProductItemDetail(parseInt(id));
      const response = {
        success: true,
        message: 'Get product item is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      logger.error('Get Product Item failed', error);
      next(error);
    }
  }

  async getProductItems(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.productItemService.getProductItems();
      const response = {
        success: true,
        message: 'Get product items is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      logger.error('Get Product Items failed', error);
      next(error);
    }
  }

  async getProductItemsDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const data = await this.productItemService.getProductItemDetailByProductId(
        parseInt(productId),
      );
      const response = {
        success: true,
        message: 'Get product items details by productId is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      logger.error('Get Product Items details by productId failed', error);
      next(error);
    }
  }

  async createProductItem(req: Request, res: Response, next: NextFunction) {
    try {
      const createProductItemDto = <CreateProductItemDto>req.body;
      const data = await this.productItemService.createProductItem(createProductItemDto);
      const response = {
        success: true,
        message: 'Create product item is successful',
        data,
      };
      return res.status(STATUS_CODES.CREATED).json(response);
    } catch (error) {
      logger.error('Create Product Item failed', error);
      next(error);
    }
  }

  async updateProductItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updateProductItemDto = <UpdateProductItemDto>req.body;
      const data = await this.productItemService.updateProductItem(
        parseInt(id),
        updateProductItemDto,
      );
      const response = {
        success: true,
        message: 'Update product item is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      logger.error('Update Product Item failed', error);
      next(error);
    }
  }

  async deleteProductItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.productItemService.deleteProductItem(parseInt(id));
      const response = {
        success: true,
        message: 'Delete product item is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      logger.error('Delete Product Item failed', error);
      next(error);
    }
  }
}
