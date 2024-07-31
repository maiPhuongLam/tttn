import { WarrantyPolicy } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export interface IWarrantyPolicyRepository extends IRepository<WarrantyPolicy> {
  findByProductId(productId: number): Promise<WarrantyPolicy[]>;
}
