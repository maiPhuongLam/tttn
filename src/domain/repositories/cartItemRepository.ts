import { CartItem, ProductItem } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';
export type FindByCartIdResponse = {
  cartItem: CartItem & { productItem: ProductItem };
}[];

export interface ICartItemRepository extends IRepository<CartItem> {
  findByCartId(cartId: number): Promise<CartItem[]>;
  findByproductItemId(itemId: number): Promise<CartItem>;
}
