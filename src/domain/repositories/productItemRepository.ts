import { ProductItem } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export type ProductDetailResponse = {
  itemId: number;
  productId: number;
  sku: string;
  quantityInStock: number;
  status: 'locked' | 'unlock' | 'sold';
  price: number;
  color: string;
  storage: string;
  ram: string;
  image: string;
  name: string | null; // Ensure 'name' is always a string and not nullable
  releaseDate: Date | null;
  screenSize: string;
  camera: string;
  processor: string;
  os: string;
  isDelete: boolean | null;
};

export interface IProductItemRepository extends IRepository<ProductItem> {
  detail(id: number): Promise<ProductDetailResponse>;
  detailForProductId(id: number): Promise<ProductDetailResponse[]>;
}
