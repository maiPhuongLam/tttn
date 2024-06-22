import { inject, injectable } from 'inversify';
import { IProductDetailRepository } from 'src/domain/repositories';
import { ProductDetail } from 'src/infrastructure/database/schemas';
import { INTERFACE_NAME } from 'src/shared/constants';
import { CreateProductDetailDto, UpdateProductDetailDto } from '../dtos';
import { IProductDetailService } from 'src/domain/services';

@injectable()
export class ProductDetailService implements IProductDetailService {
  constructor(
    @inject(INTERFACE_NAME.ProductDetailRepository)
    private productDetailRepository: IProductDetailRepository,
  ) {}

  async getProductDetails(): Promise<ProductDetail[]> {
    throw new Error('Method not implemented.');
  }
  async getOneProductDetail(id: number): Promise<ProductDetail | null> {
    throw new Error('Method not implemented.');
  }
  async createProductDetail(
    createProductDetailDto: CreateProductDetailDto,
  ): Promise<ProductDetail> {
    throw new Error('Method not implemented.');
  }
  async updateProductDetail(
    id: number,
    updateProductDetailDto: UpdateProductDetailDto,
  ): Promise<ProductDetail> {
    throw new Error('Method not implemented.');
  }
  async deleteProductDetail(id: number): Promise<ProductDetail> {
    throw new Error('Method not implemented.');
  }
}
