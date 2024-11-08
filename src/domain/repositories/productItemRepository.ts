import { ProductItem } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export type ProductDetailResponse = {
  itemId: number;
  productId: number;
  sku: string;
  quantityInStock: number;
  status: 'locked' | 'unlock' | 'sold';
  price: string;
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
  price: string;
  name: string;
  color: string;
  ram: string;
  storage: string;
};
export enum SortBy {
  LATEST = 'latest',
  LOW_TO_HIGH = 'low_to_high',
  HIGH_TO_LOW = 'high_to_low',
}
export interface IProductItemRepository extends IRepository<ProductItem> {
  findBySKU(SKU: string): Promise<SKUResponse | null>;
  detail(id: number): Promise<ProductDetailResponse>;
  detailForProductId(id: number, sort: SortBy): Promise<ProductDetailResponse[]>;
}
