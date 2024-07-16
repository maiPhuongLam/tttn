import { ProductItem } from 'src/infrastructure/database/schemas';
import { ProductDetailResponse } from '../repositories';
type CreateProductItemDto = {
  SKU: string;
  quantityInStock: number;
  status: 'locked' | 'unlock' | 'sold';
  ram: string;
  storage: string;
  price: number;
  color: string;
  image: string;
  productId: number | null;
};

type UpdateProductItemDto = Partial<CreateProductItemDto>;

export interface IProductItemService {
  getProductItems(): Promise<ProductItem[]>;
  getOneProductItem(id: number): Promise<ProductItem>;
  createProductItem(createProductItemDto: CreateProductItemDto): Promise<ProductItem>;
  updateProductItem(id: number, updateProductItemDto: UpdateProductItemDto): Promise<ProductItem>;
  softDeleteProductItem(id: number): Promise<ProductItem>;
  deleteProductItem(id: number): Promise<ProductItem>;
  getProductItemDetail(id: number): Promise<ProductDetailResponse>;
  getProductItemDetailByProductId(productId: number): Promise<ProductDetailResponse[]>;
}
