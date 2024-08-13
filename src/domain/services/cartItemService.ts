import { CartItem } from 'src/infrastructure/database/schemas';
import { FindByCartIdResponse, ProductDetailResponse } from '../repositories';

export type CreateCartItemDto = {
  cartId: number;
  price: string;
  productItemId: number;
  quantity: number;
};
export type Item = CartItem & { productItem: ProductDetailResponse };
export type GetCartItemsResponse = { cartId: number; items: Item[] };
export interface ICartItemService {
  getCartItems(userId: number): Promise<GetCartItemsResponse>;
  getOneCartItem(id: number): Promise<CartItem>;
  addCartItem(createCartData: CreateCartItemDto): Promise<CartItem>;
  updateCartItem(createCartData: CreateCartItemDto): Promise<CartItem>;
  deleteCartItem(id: number): Promise<CartItem>;
  getOneCartItemByProductItemIdAndCartId(itemId: number, cartId: number): Promise<CartItem>;
}
