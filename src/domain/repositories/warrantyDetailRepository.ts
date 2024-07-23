import { WarrantyDetail } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export interface IWarrantyDetailRepository extends IRepository<WarrantyDetail> {}
