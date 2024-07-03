import { Cart } from 'src/infrastructure/database/schemas';

export interface ICartService {
  getCarts(): Promise<Cart[]>;
  getOneCart(id: number): Promise<Cart>;
  createCart(createCartDto: CreateCartDto, userId: number): Promise<Cart>;
  updateCart(id: number, updateCartDto: UpdateCartDto): Promise<Cart>;
  deleteCart(id: number): Promise<Cart>;
}