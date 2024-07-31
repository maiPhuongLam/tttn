import { injectable } from 'inversify';
import { Repository } from './repository';
import { FindByCartIdResponse, ICartItemRepository } from 'src/domain/repositories';
import { CartItem, cartItems, ProductItem, productItems } from '../schemas';
import logger from 'src/infrastructure/logger';
import { eq } from 'drizzle-orm';


@injectable()
export class CartItemRepository extends Repository<CartItem> implements ICartItemRepository {
  constructor() {
    super(cartItems);
  }

  async findByCartId(cartId: number): Promise<FindByCartIdResponse[]> {
    try {
      const query = await this.db.select()
        .from(cartItems)
        .where(eq(cartItems.cartId, cartId))
        .innerJoin(productItems, eq(cartItems.productItemId, productItems.id));
      
      const result = query.map(data => {
        return {
          cartItem: { ...data.cart_items, productItem: data.product_items }
        }
      })
      return result
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
