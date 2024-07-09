import { Product } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export type RepoResponseGetProducts = { 
  products: { product: Product }[], 
  count: number,     
  currentPage: number,
  pageSize: number,
  totalPages: number 
}

export type ProductFilters = { brandId?: number, name?: string, page?: number, pageSize?: number }

export interface IProductRepository extends IRepository<Product> {
  filter(filter: ProductFilters): Promise<RepoResponseGetProducts>
}
