import { inject, injectable } from 'inversify';
import { IProductDetailRepository } from 'src/domain/repositories';
import { ProductDetail } from 'src/infrastructure/database/schemas';
import { INTERFACE_NAME } from 'src/shared/constants';
import { IProductDetailService } from 'src/domain/services';
import { CreateProductDetailDto, UpdateProductDetailDto } from '../dtos';
import { NotFoundError } from 'src/shared/errors';
import logger from 'src/infrastructure/logger';

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
      throw error;
    }
  }

  async getOneProductDetail(id: number): Promise<ProductDetail | null> {
    try {
      const productDetail = await this.productDetailRepository.findById(id);
      if (!productDetail) {
        throw new NotFoundError(`ProductDetail with id = ${id} is not found`);
      }
      return productDetail;
    } catch (error) {
      throw error;
    }
  }

  async createProductDetail(
    createProductDetailDto: CreateProductDetailDto,
  ): Promise<ProductDetail> {
    try {
      const productDetail = await this.productDetailRepository.add(createProductDetailDto);
      return productDetail;
    } catch (error) {
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
      return updatedProductDetail;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductDetail(id: number): Promise<ProductDetail> {
    try {
      await this.getOneProductDetail(id);
      const deletedProductDetail = await this.productDetailRepository.delete(id);
      return deletedProductDetail;
    } catch (error) {
      throw error;
    }
  }
}
