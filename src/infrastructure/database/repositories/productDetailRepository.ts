import { injectable } from 'inversify';
import { Repository } from './repository';
import { ProductDetail, productDetails } from '../schemas';
import { IProductDetailRepository } from 'src/domain/repositories';

@injectable()
export class ProductDetailRepository
  extends Repository<ProductDetail>
  implements IProductDetailRepository
{
  constructor() {
    super(productDetails);
  }
}
