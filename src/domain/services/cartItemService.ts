import { CartItem } from 'src/infrastructure/database/schemas';

export type CreateCartItemDto = {
  cartId: number;
  price: string;
  productItemId: number;
  quantity: number;
};

export interface ICartItemService {
  getCartItems(userId: number): Promise<{ cartId: number; items: CartItem[] }>;
  getOneCartItem(id: number): Promise<CartItem>;
  updateCartItem(createCartData: CreateCartItemDto): Promise<CartItem>;
  deleteCartItem(id: number): Promise<CartItem>;
}
