import { injectable } from 'inversify';
import { Repository } from './repository';
import { warrantyPolicies, WarrantyPolicy } from '../schemas';
import { IWarrantyPolicyRepository } from 'src/domain/repositories';
import { eq } from 'drizzle-orm';

@injectable()
export class WarrantyPolicyRepository
  extends Repository<WarrantyPolicy>
  implements IWarrantyPolicyRepository
{
  constructor() {
    super(warrantyPolicies);
  }

  async findByProductId(productId: number): Promise<WarrantyPolicy[]> {
    try {
      return await this.db.select().from(warrantyPolicies).where(eq(warrantyPolicies.productId, productId))
    } catch (error) {
      throw error
    }
  }

  
}
