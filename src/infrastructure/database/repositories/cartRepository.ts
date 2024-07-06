import { injectable } from 'inversify';
import { Repository } from './repository';
import { ICartRepository } from 'src/domain/repositories';
import { Cart, carts } from '../schemas';
import { eq } from 'drizzle-orm';
import logger from 'src/infrastructure/logger';

@injectable()
export class CartRepository extends Repository<Cart> implements ICartRepository {
  constructor() {
    super(carts);
  }

  async findByCustomerId(customerId: number): Promise<Cart> {
    try {
      const [cart] = await this.db
        .select()
        .from(carts)
        .where(eq(carts.customerId, customerId))
        .execute();
      return cart;
    } catch (error) {
      logger.error('Error in findByCustomerId', error);
      throw error;
    }
  }
}
