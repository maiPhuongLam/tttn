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

export type SKUResponse = {
  id: number;
  SKU: string;
  price: number;
  name: string;
  color: string;
  ram: string;
  storage: string;
};

export interface IProductItemRepository extends IRepository<ProductItem> {
  findBySKU(SKU: string): Promise<SKUResponse | null>;
  detail(id: number): Promise<ProductDetailResponse>;
  detailForProductId(id: number): Promise<ProductDetailResponse[]>;
}
