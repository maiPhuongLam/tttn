import { injectable } from 'inversify';
import { Repository } from './repository';
import { Brand, brands } from '../schemas';
import { IBrandRepository } from 'src/domain/repositories';

@injectable()
export class BrandRepository extends Repository<Brand> implements IBrandRepository {
  constructor() {
    super(brands);
  }
}
