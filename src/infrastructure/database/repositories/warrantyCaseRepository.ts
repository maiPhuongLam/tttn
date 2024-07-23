import { injectable } from 'inversify';
import { Repository } from './repository';
import { WarrantyCase, warrantyCases } from '../schemas';
import { IWarrantyCaseRepository } from 'src/domain/repositories';

@injectable()
export class WarrantyCaseRepository
  extends Repository<WarrantyCase>
  implements IWarrantyCaseRepository
{
  constructor() {
    super(warrantyCases);
  }
}
