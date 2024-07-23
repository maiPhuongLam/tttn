import { inject, injectable } from 'inversify';
import { IProductDetailRepository } from 'src/domain/repositories';
import { ProductDetail } from 'src/infrastructure/database/schemas';
import { INTERFACE_NAME } from 'src/shared/constants';
import { NotFoundError } from 'src/shared/errors';
import logger from 'src/infrastructure/logger';
import cache from 'src/infrastructure/cache'; // Assuming RedisCache or similar
import {
  IProductDetailService,
  CreateProductDetailDto,
  UpdateProductDetailDto,
} from 'src/domain/services';

@injectable()
export class ProductDetailService implements IProductDetailService {
  constructor(
    @inject(INTERFACE_NAME.ProductDetailRepository)
    private productDetailRepository: IProductDetailRepository,
  ) {}

  async getProductDetails(): Promise<ProductDetail[]> {
    try {
      return await this.productDetailRepository.findAll();
    } catch (error) {
      logger.error('Error in getProductDetails:', error);
      throw error;
    }
  }

  async getOneProductDetail(id: number): Promise<ProductDetail | null> {
    try {
      const cacheKey = `productDetail:${id}`;
      // const cachedData = await cache.get({ key: cacheKey });
      // if (cachedData) {
      //   return cachedData;
      // }

      const productDetail = await this.productDetailRepository.findById(id);
      if (!productDetail) {
        throw new NotFoundError(`ProductDetail with id ${id} not found.`);
      }

      // await cache.set({ key: cacheKey }, productDetail);
      return productDetail;
    } catch (error) {
      logger.error(`Error in getOneProductDetail ${id}:`, error);
      throw error;
    }
  }

  async createProductDetail(
    createProductDetailDto: CreateProductDetailDto,
  ): Promise<ProductDetail> {
    try {
      const productDetail = await this.productDetailRepository.add({
        ...createProductDetailDto,
        isDelete: false,
      });
      return productDetail;
    } catch (error) {
      logger.error('Error in createProductDetail:', error);
      throw error;
    }
  }

  async updateProductDetail(
    id: number,
    updateProductDetailDto: UpdateProductDetailDto,
  ): Promise<ProductDetail> {
    try {
      await this.getOneProductDetail(id);
      const updatedProductDetail = await this.productDetailRepository.update(
        id,
        updateProductDetailDto,
      );
      // await cache.set({ key: `productDetail:${id}` }, updatedProductDetail);
      return updatedProductDetail;
    } catch (error) {
      logger.error(`Error in updateProductDetail ${id}:`, error);
      throw error;
    }
  }

  async softDeleteProductDetail(id: number): Promise<ProductDetail> {
    try {
      await this.getOneProductDetail(id);
      const updatedProductDetail = await this.productDetailRepository.update(id, {
        isDelete: true,
      });
      await cache.del(`productDetail:${id}`);
      return updatedProductDetail;
    } catch (error) {
      logger.error(`Error in softDeleteProductDetail ${id}:`, error);
      throw error;
    }
  }

  async deleteProductDetail(id: number): Promise<ProductDetail> {
    try {
      await this.getOneProductDetail(id);
      const deletedProductDetail = await this.productDetailRepository.delete(id);
      await cache.del(`productDetail:${id}`);
      return deletedProductDetail;
    } catch (error) {
      logger.error(`Error in deleteProductDetail ${id}:`, error);
      throw error;
    }
  }
}
