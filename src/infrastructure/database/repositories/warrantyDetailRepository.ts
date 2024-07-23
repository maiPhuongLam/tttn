import { injectable } from 'inversify';
import { Repository } from './repository';
import { WarrantyDetail, warrantyDetails } from '../schemas';
import { IWarrantyDetailRepository } from 'src/domain/repositories';

@injectable()
export class WarrantyDetailRepository
  extends Repository<WarrantyDetail>
  implements IWarrantyDetailRepository
{
  constructor() {
    super(warrantyDetails);
  }
}
