import { CreateProductDetailDto, UpdateProductDetailDto } from 'src/application/dtos';
import { ProductDetail } from 'src/infrastructure/database/schemas';

export interface IProductDetailService {
  getProductDetails(): Promise<ProductDetail[]>;
  getOneProductDetail(id: number): Promise<ProductDetail | null>;
  createProductDetail(createProductDetailDto: CreateProductDetailDto): Promise<ProductDetail>;
  updateProductDetail(
    id: number,
    updateProductDetailDto: UpdateProductDetailDto,
  ): Promise<ProductDetail>;
  deleteProductDetail(id: number): Promise<ProductDetail>;
}
