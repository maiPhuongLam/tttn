import { Brand } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export interface IBrandRepository extends IRepository<Brand> {}
