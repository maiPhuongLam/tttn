import { injectable } from 'inversify';
import { Repository } from './repository';
import { ICartItemRepository } from 'src/domain/repositories';
import { CartItem, cartItems, productItems } from '../schemas';
import logger from 'src/infrastructure/logger';
import { eq } from 'drizzle-orm';

@injectable()
export class CartItemRepository extends Repository<CartItem> implements ICartItemRepository {
  constructor() {
    super(cartItems);
  }

  async findByCartId(cartId: number): Promise<CartItem[]> {
    try {
      return await this.db.select().from(cartItems).where(eq(cartItems.cartId, cartId)).execute();
    } catch (error) {
      logger.error('Error in findCartId', error);
      throw error;
    }
  }

  async findByproductItemId(itemId: number): Promise<CartItem> {
    try {
      const [item] = await this.db
        .select()
        .from(cartItems)
        .where(eq(cartItems.productItemId, itemId))
        .execute();
      return item;
    } catch (error) {
      logger.error('Error in findCartId', error);
      throw error;
    }
  }
}
