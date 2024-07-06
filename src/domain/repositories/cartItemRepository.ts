import { CartItem } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export interface ICartItemRepository extends IRepository<CartItem> {
  findByCartId(cartId: number): Promise<CartItem[]>;
}
