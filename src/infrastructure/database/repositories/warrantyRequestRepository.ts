import { injectable } from 'inversify';
import { Repository } from './repository';
import { WarrantyRequest, warrantyRequests } from '../schemas';
import { IWarrantyRequestRepository } from 'src/domain/repositories';

@injectable()
export class WarrantyRequestRepository
  extends Repository<WarrantyRequest>
  implements IWarrantyRequestRepository
{
  constructor() {
    super(warrantyRequests);
  }
}
