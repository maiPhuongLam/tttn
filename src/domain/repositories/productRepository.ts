import { Product } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export interface IProductRepository extends IRepository<Product> {}
