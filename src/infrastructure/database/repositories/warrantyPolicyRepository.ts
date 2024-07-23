import { injectable } from 'inversify';
import { Repository } from './repository';
import { warrantyPolicies, WarrantyPolicy } from '../schemas';
import { IWarrantyPocilyRepository } from 'src/domain/repositories';

@injectable()
export class WarrantyPolicyRepository
  extends Repository<WarrantyPolicy>
  implements IWarrantyPocilyRepository
{
  constructor() {
    super(warrantyPolicies);
  }
}
