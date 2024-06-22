import { injectable } from 'inversify';
import { Repository } from './repository';
import { Product, products } from '../schemas';
import { IProductRepository } from 'src/domain/repositories';

@injectable()
export class ProductRepository extends Repository<Product> implements IProductRepository {
  constructor() {
    super(products);
  }
}
