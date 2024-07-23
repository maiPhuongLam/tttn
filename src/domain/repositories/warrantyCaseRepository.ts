import { WarrantyCase } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export interface IWarrantyCaseRepository extends IRepository<WarrantyCase> {}
