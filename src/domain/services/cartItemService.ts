import { CartItem } from 'src/infrastructure/database/schemas';

type CreateCartItemData = {
  cartId: number;
  price: number;
  productItemId: number;
  quantity: number;
};

export interface ICartItemService {
  getCartItems(cartId: number): Promise<CartItem[]>;
  getOneCartItem(id: number): Promise<CartItem>;
  addCartItem(createCartData: CreateCartItemData): Promise<CartItem>;
  deleteCartItem(id: number): Promise<CartItem>;
}