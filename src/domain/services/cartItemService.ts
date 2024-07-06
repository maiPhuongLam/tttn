import { CartItem } from 'src/infrastructure/database/schemas';

export interface ICartItemService {
  getCartItems(cartId: number): Promise<CartItem[]>;
  getOneCartItem(id: number): Promise<CartItem>;
  addCartItem(createCartDto: CreateCartItemDto): Promise<CartItem>;
  deleteCartItem(id: number): Promise<CartItem>;
}
