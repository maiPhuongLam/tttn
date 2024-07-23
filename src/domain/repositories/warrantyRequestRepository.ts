import { WarrantyRequest } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export interface IWarrantyRequestRepository extends IRepository<WarrantyRequest> {}
