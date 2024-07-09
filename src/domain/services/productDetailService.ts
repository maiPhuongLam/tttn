import { ProductDetail } from 'src/infrastructure/database/schemas';

type CreateProductDetailDto = {
  screenSize: string;
  battery: string;
  camera: string;
  processor: string;
  os: string;
};
type UpdateProductDetailDto = Partial<CreateProductDetailDto>;

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
