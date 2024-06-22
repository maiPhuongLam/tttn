import { injectable } from 'inversify';
import { Repository } from './repository';
import { ProductItem, products } from '../schemas';
import { IProductItemRepository, IProductRepository } from 'src/domain/repositories';

@injectable()
export class ProductItemRepository
  extends Repository<ProductItem>
  implements IProductItemRepository
{
  constructor() {
    super(products);
  }
}
