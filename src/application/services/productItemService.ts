import { inject, injectable } from 'inversify';
import { IProductItemRepository, ProductDetailResponse } from 'src/domain/repositories';
import { ProductItem } from 'src/infrastructure/database/schemas';
import logger from 'src/infrastructure/logger';
import { INTERFACE_NAME } from 'src/shared/constants';
import { NotFoundError } from 'src/shared/errors';
import cache from 'src/infrastructure/cache'; // Assuming RedisCache or similar
import { CreateProductItemDto, UpdateProductItemDto } from '../dtos';
import { IProductItemService } from 'src/domain/services';

@injectable()
export class ProductItemService implements IProductItemService {
  constructor(
    @inject(INTERFACE_NAME.ProductItemRepository)
    private productItemRepository: IProductItemRepository,
  ) {}

  async createProductItem(createProductItemDto: CreateProductItemDto): Promise<ProductItem> {
    try {
      const productItem = await this.productItemRepository.add({
        ...createProductItemDto,
        isDelete: false,
      });
      return productItem;
    } catch (error) {
      logger.error('Error in createProductItem:', error);
      throw error;
    }
  }

  async updateProductItem(
    id: number,
    updateProductItemDto: UpdateProductItemDto,
  ): Promise<ProductItem> {
    try {
      await this.getOneProductItem(id);
      const updatedProductItem = await this.productItemRepository.update(id, updateProductItemDto);
      return updatedProductItem;
    } catch (error) {
      logger.error(`Error in updateProductItem ${id}:`, error);
      throw error;
    }
  }

  async getProductItems(): Promise<ProductItem[]> {
    try {
      return await this.productItemRepository.findAll();
    } catch (error) {
      logger.error('Error in getProductItems:', error);
      throw error;
    }
  }

  async getOneProductItem(id: number): Promise<ProductItem> {
    try {
      const cacheKey = `productItem:${id}`;
      const productItem = await this.productItemRepository.findById(id);
      if (!productItem) {
        throw new NotFoundError(`ProductItem with id ${id} not found.`);
      }
      return productItem;
    } catch (error) {
      logger.error(`Error in getOneProductItem ${id}:`, error);
      throw error;
    }
  }

  async getProductItemDetail(id: number): Promise<ProductDetailResponse> {
    try {
      const productItem = await this.productItemRepository.detail(id);
      if (!productItem) {
        throw new NotFoundError(`ProductItem with id ${id} not found.`);
      }
      return productItem;
    } catch (error) {
      logger.error(`Error in getOneProductItem ${id}:`, error);
      throw error;
    }
  }

  async softDeleteProductItem(id: number): Promise<ProductItem> {
    try {
      await this.getOneProductItem(id);
      const updatedProductItem = await this.productItemRepository.update(id, { isDelete: true });
      await cache.del(`productItem:${id}`);
      return updatedProductItem;
    } catch (error) {
      logger.error(`Error in softDeleteProductItem ${id}:`, error);
      throw error;
    }
  }

  async deleteProductItem(id: number): Promise<ProductItem> {
    try {
      await this.getOneProductItem(id);
      const deletedProductItem = await this.productItemRepository.delete(id);
      await cache.del(`productItem:${id}`);
      return deletedProductItem;
    } catch (error) {
      logger.error(`Error in deleteProductItem ${id}:`, error);
      throw error;
    }
  }

  async getProductItemDetailByProductId(productId: number): Promise<ProductDetailResponse[]> {
    try {
      const productItem = await this.productItemRepository.detailForProductId(productId);
      if (!productItem) {
        throw new NotFoundError(`ProductItem with productId ${productId} not found.`);
      }
      return productItem;
    } catch (error) {
      logger.error(`Error in getProductItemDetailByProductId ${productId}:`, error);
      throw error;
    }
  }
}
