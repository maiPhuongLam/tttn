import { ProductDetail } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export interface IProductDetailRepository extends IRepository<ProductDetail> {}
