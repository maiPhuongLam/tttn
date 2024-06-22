import { injectable } from 'inversify';
import { Repository } from './repository';
import { Category, categories } from '../schemas';
import { ICategoryRepository } from 'src/domain/repositories';

@injectable()
export class CategoryRepository extends Repository<Category> implements ICategoryRepository {
  constructor() {
    super(categories);
  }
}
