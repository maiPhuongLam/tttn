import { WarrantyPolicy } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export interface IWarrantyPocilyRepository extends IRepository<WarrantyPolicy> {}
