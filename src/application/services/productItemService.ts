import { inject, injectable } from 'inversify';
import { CreateProductItemDto, UpdateProductItemDto } from '../dtos';
import { IProductItemRepository } from 'src/domain/repositories';
import { IProductItemService } from 'src/domain/services';

import { ProductItem } from 'src/infrastructure/database/schemas';
import logger from 'src/infrastructure/logger';
import { INTERFACE_NAME } from 'src/shared/constants';
import { NotFoundError } from 'src/shared/errors';

@injectable()
export class ProductItemService implements IProductItemService {
  constructor(
    @inject(INTERFACE_NAME.ProductItemRepository)
    private productItemRepository: IProductItemRepository,
  ) {}

  async getProductItems(): Promise<ProductItem[]> {
    try {
      return await this.productItemRepository.findAll();
    } catch (error) {
      logger.error('');
      throw error;
    }
  }

  async getOneProductItem(id: number): Promise<ProductItem> {
    try {
      const product = await this.productItemRepository.findById(id);
      if (!product) {
        throw new NotFoundError(`Prodict Item ${id} is not found`);
      }

      return product;
    } catch (error) {
      logger.error('Error in get One Product Item', error);
      throw error;
    }
  }

  async createProductItem(
    createProductItemDto: CreateProductItemDto,
    userId: number,
  ): Promise<ProductItem> {
    try {
      return await this.productItemRepository.add(createProductItemDto);
    } catch (error) {
      logger.error('');
      throw error;
    }
  }

  async updateProductItem(
    id: number,
    updateProductItemDto: UpdateProductItemDto,
  ): Promise<ProductItem> {
    try {
      await this.getOneProductItem(id);
      return await this.productItemRepository.update(id, updateProductItemDto);
    } catch (error) {
      logger.error('');
      throw error;
    }
  }

  async deleteProductItem(id: number): Promise<ProductItem> {
    try {
      await this.getOneProductItem(id);
      return await this.productItemRepository.delete(id);
    } catch (error) {
      logger.error('');
      throw error;
    }
  }
}
