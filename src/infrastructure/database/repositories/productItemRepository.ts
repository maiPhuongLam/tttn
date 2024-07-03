import { injectable } from 'inversify';
import { Repository } from './repository';
import { ProductItem, productItems } from '../schemas';
import { IProductItemRepository, IProductRepository } from 'src/domain/repositories';

@injectable()
export class ProductItemRepository
  extends Repository<ProductItem>
  implements IProductItemRepository
{
  constructor() {
    super(productItems);
  }
}
