import { ProductItem } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export interface IProductItemRepository extends IRepository<ProductItem> {}
