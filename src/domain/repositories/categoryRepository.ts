import { Category } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export interface ICategoryRepository extends IRepository<Category> {}
